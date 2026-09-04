"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Building2, Briefcase, Calendar, Clock, MapPin, Pencil, Plus, Trash2, Users } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface Company { id: string; name: string; sector: string | null; company_size: string | null }
interface Internship {
  id: number; title: string; department: string | null; location: string | null; work_mode: string | null
  duration_months: number | null; stipend: number | null; description: string | null; learning_outcomes: string | null
  capacity: number; required_skills: string[]; minimum_degree: string | null; field_of_study: string | null
  minimum_gpa: string | null; graduation_year_range: string | null; status: string; created_at: string
}

const locations = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Lucknow"]
const fieldClassName = "bg-white/10 border-white/30 text-white placeholder:text-white/50"
const selectClassName = "bg-white/10 border-white/30 text-white"

export default function IndustryDashboard() {
  const [company, setCompany] = useState<Company | null>(null)
  const [hasCompanyProfile, setHasCompanyProfile] = useState(false)
  const [internships, setInternships] = useState<Internship[]>([])
  const [applicationCounts, setApplicationCounts] = useState<Record<number, number>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingPost, setEditingPost] = useState<Internship | null>(null)
  const [status, setStatus] = useState<string | null>(null)
  const [location, setLocation] = useState("")
  const [workMode, setWorkMode] = useState("")
  const [minimumDegree, setMinimumDegree] = useState("")
  const [graduationYear, setGraduationYear] = useState("")

  const loadDashboard = async () => {
    if (!supabase) { setStatus("Supabase is not configured."); setIsLoading(false); return }
    const { data: sessionData } = await supabase.auth.getSession()
    const user = sessionData.session?.user
    if (!user) { setStatus("Please sign in as an industry user to view this dashboard."); setIsLoading(false); return }
    const { data: companyData, error: companyError } = await supabase.from("companies").select("id, name, sector, company_size").eq("id", user.id).maybeSingle()
    let { data: postData, error: postError } = await supabase.from("internships").select("id, title, department, location, work_mode, duration_months, stipend, description, learning_outcomes, capacity, required_skills, minimum_degree, field_of_study, minimum_gpa, graduation_year_range, status, created_at").eq("company_id", user.id).order("created_at", { ascending: false })
    if (postError?.message.includes("does not exist")) {
      const fallback = await supabase.from("internships").select("id, title, department, location, work_mode, duration_months, stipend, description, capacity, required_skills, status, created_at").eq("company_id", user.id).order("created_at", { ascending: false })
      postData = (fallback.data ?? []).map((post) => ({ ...post, learning_outcomes: null, minimum_degree: null, field_of_study: null, minimum_gpa: null, graduation_year_range: null }))
      postError = fallback.error
      if (!fallback.error) setStatus("Run the updated schema.sql to enable qualification fields.")
    }
    if (companyError || postError) { setStatus(companyError?.message ?? postError?.message ?? "Unable to load dashboard data."); setIsLoading(false); return }
    const posts = (postData ?? []) as Internship[]
    const counts: Record<number, number> = {}
    await Promise.all(posts.map(async (post) => { const { count } = await supabase.from("applications").select("id", { count: "exact", head: true }).eq("internship_id", post.id); counts[post.id] = count ?? 0 }))
    setCompany((companyData as Company | null) ?? { id: user.id, name: user.user_metadata?.full_name ?? user.email ?? "Industry Dashboard", sector: null, company_size: null })
    setHasCompanyProfile(Boolean(companyData)); setInternships(posts); setApplicationCounts(counts); setIsLoading(false)
  }

  useEffect(() => { void loadDashboard() }, [])

  const resetForm = () => { setEditingPost(null); setLocation(""); setWorkMode(""); setMinimumDegree(""); setGraduationYear(""); setShowForm((visible) => !visible) }
  const inputValue = (form: FormData, name: string) => String(form.get(name) ?? "").trim()

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setStatus(null)
    const form = event.currentTarget; const formData = new FormData(form)
    if (!supabase) return
    const { data } = await supabase.auth.getSession(); const user = data.session?.user
    const title = inputValue(formData, "title")
    if (!user) { setStatus("Please sign in before saving an internship."); return }
    if (!title || !location) { setStatus("Role title and location are required."); return }
    setIsSaving(true)
    const payload = { company_id: user.id, title, department: inputValue(formData, "department") || null, location, work_mode: workMode || null, duration_months: inputValue(formData, "duration_months") ? Number(inputValue(formData, "duration_months")) : null, stipend: inputValue(formData, "stipend") ? Number(inputValue(formData, "stipend")) : null, description: inputValue(formData, "description") || null, learning_outcomes: inputValue(formData, "learning_outcomes") || null, capacity: Number(inputValue(formData, "capacity")) || 1, required_skills: inputValue(formData, "required_skills").split(",").map((skill) => skill.trim()).filter(Boolean), minimum_degree: minimumDegree || null, field_of_study: inputValue(formData, "field_of_study") || null, minimum_gpa: inputValue(formData, "minimum_gpa") || null, graduation_year_range: graduationYear || null }
      const result = editingPost ? await supabase.from("internships").update(payload).eq("id", editingPost.id).eq("company_id", user.id) : await supabase.from("internships").insert(payload)
    setIsSaving(false)
    if (result.error) { setStatus(result.error.message); return }
    form.reset(); resetForm(); setStatus(editingPost ? "Internship updated successfully." : "Internship posted successfully."); await loadDashboard()
  }

  const handleEdit = (post: Internship) => { setEditingPost(post); setLocation(post.location ?? ""); setWorkMode(post.work_mode ?? ""); setMinimumDegree(post.minimum_degree ?? ""); setGraduationYear(post.graduation_year_range ?? ""); setShowForm(true); setStatus(null) }
  const handleDelete = async (post: Internship) => {
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`) || !supabase) return
    const { data } = await supabase.auth.getSession(); const user = data.session?.user
    if (!user) { setStatus("Please sign in before deleting an internship."); return }
    const { error } = await supabase.from("internships").delete().eq("id", post.id).eq("company_id", user.id)
    if (error) { setStatus(error.message); return }
    setStatus("Internship deleted successfully."); await loadDashboard()
  }

  if (isLoading) return <div className="min-h-screen pt-20 gradient-bg-secondary flex items-center justify-center text-white">Loading dashboard...</div>
  return (
    <div className="min-h-screen pt-20 gradient-bg-secondary"><div className="container mx-auto px-4 py-8"><div className="max-w-7xl mx-auto">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-white/70 flex items-center gap-2"><Building2 className="w-4 h-4" /> {company?.sector ?? "Industry partner"}</p><h1 className="text-4xl font-bold text-white mb-2">{company?.name ?? "Industry Dashboard"}</h1><p className="text-white/80 text-lg">Manage your internship listings and applications.</p></div>{hasCompanyProfile && <Button onClick={() => { resetForm(); setStatus(null) }} className="bg-white text-primary hover:bg-white/90"><Plus className="w-4 h-4 mr-2" /> New Internship</Button>}</header>
      {status && <p className="mb-6 rounded-lg border border-white/20 bg-white/10 p-3 text-white" role="alert">{status}</p>}
      {!hasCompanyProfile && <Card className="glass-card border-white/20 mb-8"><CardContent className="p-6"><CardTitle className="text-white mb-2">Complete your company profile</CardTitle><CardDescription className="text-white/80 mb-4">Register your company before creating internship postings.</CardDescription><Link href="/industry"><Button className="bg-white text-primary hover:bg-white/90">Complete Registration</Button></Link></CardContent></Card>}
        {hasCompanyProfile && showForm && <Card className="glass-card border-white/20 mb-8"><CardHeader><CardTitle className="text-white">{editingPost ? "Edit Internship" : "Post an Internship"}</CardTitle><CardDescription className="text-white/80">Role title and location are required.</CardDescription></CardHeader><CardContent><form key={editingPost?.id ?? "new"} onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="space-y-2"><Label htmlFor="title" className="text-white">Role Title *</Label><Input id="title" name="title" required defaultValue={editingPost?.title ?? ""} className={fieldClassName} /></div><div className="space-y-2"><Label htmlFor="department" className="text-white">Department</Label><Input id="department" name="department" defaultValue={editingPost?.department ?? ""} className={fieldClassName} /></div><div className="space-y-2"><Label className="text-white">Location *</Label><Select value={location} onValueChange={setLocation} required><SelectTrigger className={selectClassName}><SelectValue placeholder="Select location" /></SelectTrigger><SelectContent>{locations.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select></div><div className="space-y-2"><Label className="text-white">Work Mode</Label><Select value={workMode} onValueChange={setWorkMode}><SelectTrigger className={selectClassName}><SelectValue placeholder="Select work mode" /></SelectTrigger><SelectContent><SelectItem value="On-site">On-site</SelectItem><SelectItem value="Remote">Remote</SelectItem><SelectItem value="Hybrid">Hybrid</SelectItem></SelectContent></Select></div><div className="space-y-2"><Label htmlFor="duration_months" className="text-white">Duration (months)</Label><Input id="duration_months" name="duration_months" type="number" min="1" defaultValue={editingPost?.duration_months ?? ""} className={fieldClassName} /></div><div className="space-y-2"><Label htmlFor="stipend" className="text-white">Monthly Stipend</Label><Input id="stipend" name="stipend" type="number" min="0" defaultValue={editingPost?.stipend ?? ""} className={fieldClassName} /></div><div className="space-y-2"><Label htmlFor="capacity" className="text-white">Positions</Label><Input id="capacity" name="capacity" type="number" min="1" defaultValue={editingPost?.capacity ?? 1} className={fieldClassName} /></div><div className="space-y-2"><Label htmlFor="required_skills" className="text-white">Required Skills</Label><Input id="required_skills" name="required_skills" defaultValue={editingPost?.required_skills?.join(", ") ?? ""} placeholder="React, TypeScript, SQL" className={fieldClassName} /></div><div className="space-y-2"><Label className="text-white">Minimum Degree</Label><Select value={minimumDegree} onValueChange={setMinimumDegree}><SelectTrigger className={selectClassName}><SelectValue placeholder="Select degree" /></SelectTrigger><SelectContent><SelectItem value="Diploma">Diploma</SelectItem><SelectItem value="Bachelor's Degree">Bachelor's Degree</SelectItem><SelectItem value="Master's Degree">Master's Degree</SelectItem><SelectItem value="PhD">PhD</SelectItem></SelectContent></Select></div><div className="space-y-2"><Label htmlFor="field_of_study" className="text-white">Field of Study</Label><Input id="field_of_study" name="field_of_study" defaultValue={editingPost?.field_of_study ?? ""} className={fieldClassName} /></div><div className="space-y-2"><Label htmlFor="minimum_gpa" className="text-white">Minimum GPA</Label><Input id="minimum_gpa" name="minimum_gpa" defaultValue={editingPost?.minimum_gpa ?? ""} className={fieldClassName} /></div><div className="space-y-2"><Label className="text-white">Graduation Year</Label><Select value={graduationYear} onValueChange={setGraduationYear}><SelectTrigger className={selectClassName}><SelectValue placeholder="Select year" /></SelectTrigger><SelectContent><SelectItem value="2024-2025">2024-2025</SelectItem><SelectItem value="2025-2026">2025-2026</SelectItem><SelectItem value="2026-2027">2026-2027</SelectItem><SelectItem value="Any Year">Any Year</SelectItem></SelectContent></Select></div><div className="space-y-2 md:col-span-2"><Label htmlFor="description" className="text-white">Description</Label><Textarea id="description" name="description" defaultValue={editingPost?.description ?? ""} className={fieldClassName} /></div><div className="space-y-2 md:col-span-2"><Label htmlFor="learning_outcomes" className="text-white">Learning Outcomes</Label><Textarea id="learning_outcomes" name="learning_outcomes" defaultValue={editingPost?.learning_outcomes ?? ""} className={fieldClassName} /></div><div className="md:col-span-2 flex justify-end gap-2"><Button type="submit" disabled={isSaving}>{isSaving ? "Saving..." : editingPost ? "Update Internship" : "Post Internship"}</Button>{editingPost && <Button type="button" variant="outline" onClick={resetForm} className={fieldClassName}>Cancel</Button>}</div></form></CardContent></Card>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"><Card className="glass-card border-white/20"><CardContent className="p-6 text-center"><Briefcase className="w-8 h-8 text-white mx-auto mb-2" /><div className="text-3xl font-bold text-white">{internships.filter((post) => post.status === "Active").length}</div><div className="text-white/80">Active Postings</div></CardContent></Card><Card className="glass-card border-white/20"><CardContent className="p-6 text-center"><Users className="w-8 h-8 text-white mx-auto mb-2" /><div className="text-3xl font-bold text-white">{Object.values(applicationCounts).reduce((total, count) => total + count, 0)}</div><div className="text-white/80">Applications</div></CardContent></Card><Card className="glass-card border-white/20"><CardContent className="p-6 text-center"><Building2 className="w-8 h-8 text-white mx-auto mb-2" /><div className="text-3xl font-bold text-white">{internships.length}</div><div className="text-white/80">Total Postings</div></CardContent></Card></div>
      <div className="space-y-4">{internships.length === 0 ? <Card className="glass-card border-white/20"><CardContent className="p-8 text-center text-white/80">No internships posted yet.</CardContent></Card> : internships.map((post) => <Card key={post.id} className="glass-card border-white/20"><CardContent className="p-6"><div className="flex flex-col gap-4 sm:flex-row sm:justify-between"><div><h2 className="text-xl font-semibold text-white">{post.title}</h2><p className="text-white/75">{post.department ?? "General"}</p><div className="flex flex-wrap gap-4 mt-3 text-sm text-white/70"><span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{post.location ?? "Not specified"}</span><span className="flex items-center gap-1"><Clock className="w-4 h-4" />{post.duration_months ? `${post.duration_months} months` : "Flexible duration"}</span><span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{new Date(post.created_at).toLocaleDateString()}</span></div></div><div className="text-left sm:text-right"><span className="text-green-300">{post.status}</span><div className="text-white font-medium mt-2">{applicationCounts[post.id] ?? 0} applications</div><div className="flex gap-2 mt-3 sm:justify-end"><Button type="button" size="sm" variant="outline" onClick={() => handleEdit(post)} className={fieldClassName}><Pencil className="w-4 h-4 mr-1" /> Edit</Button><Button type="button" size="sm" variant="outline" onClick={() => void handleDelete(post)} className="border-red-400/50 text-red-200 hover:bg-red-500/20"><Trash2 className="w-4 h-4 mr-1" /> Delete</Button></div></div></div>{post.description && <p className="text-white/75 mt-4">{post.description}</p>}<div className="mt-5 border-t border-white/15 pt-4"><h3 className="text-sm font-semibold text-white mb-2">Requirements</h3><div className="flex flex-wrap gap-2">{post.required_skills?.length ? post.required_skills.map((skill) => <span key={skill} className="rounded-full bg-white/15 px-3 py-1 text-xs text-white">{skill}</span>) : <span className="text-sm text-white/60">No specific skills listed</span>}</div><p className="mt-3 text-sm text-white/75">{[post.minimum_degree, post.field_of_study, post.minimum_gpa && `Minimum GPA: ${post.minimum_gpa}`, post.graduation_year_range].filter(Boolean).join(" • ") || "No academic qualification specified"}</p></div></CardContent></Card>)}</div>
    </div></div></div>
  )
}
