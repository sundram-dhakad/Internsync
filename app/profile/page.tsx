"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Building2, LogOut, Pencil, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"

type ProfileData = {
  role: "student" | "industry"
  email: string
  name: string
  description: string
  fields: Array<[string, string]>
}

export default function ProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!supabase) {
      setError("Supabase is not configured.")
      return
    }
    const client = supabase
    const loadProfile = async () => {
      const { data: sessionData } = await client.auth.getSession()
      const user = sessionData.session?.user
      if (!user) {
        router.replace("/")
        return
      }

      const { data: account } = await client.from("profiles").select("role, full_name").eq("id", user.id).maybeSingle()
      if (account?.role === "industry") {
        const { data: company } = await client.from("companies").select("*").eq("id", user.id).maybeSingle()
        setProfile({
          role: "industry",
          email: user.email ?? "",
          name: company?.name ?? account.full_name ?? "Company",
          description: company?.description ?? "Not provided",
          fields: [
            ["Industry sector", company?.sector ?? "Not provided"],
            ["Company size", company?.company_size ?? "Not provided"],
            ["Contact person", company?.contact_name ?? "Not provided"],
            ["Contact phone", company?.contact_phone ?? "Not provided"],
            ["Website", company?.website ?? "Not provided"],
            ["Office address", company?.office_address ?? "Not provided"],
          ],
        })
        return
      }

      const [{ data: student }, { data: education }] = await Promise.all([
        client.from("student_profiles").select("*").eq("id", user.id).maybeSingle(),
        client.from("education").select("university, degree, gpa, graduation_year").eq("student_id", user.id).order("id"),
      ])
      const qualification = education?.length
        ? education.map((item) => [
          item.degree,
          item.university,
          item.gpa ? `GPA: ${item.gpa}` : "",
          item.graduation_year ? `Graduated: ${item.graduation_year}` : "",
        ].filter(Boolean).join(" · ")).join("\n")
        : "Not provided"
      setProfile({
        role: "student",
        email: user.email ?? "",
        name: student ? `${student.first_name} ${student.last_name}` : account?.full_name ?? "Student",
        description: student?.additional_info ?? "Not provided",
        fields: [
          ["Phone", student?.phone ?? "Not provided"],
          ["Date of birth", student?.date_of_birth ?? "Not provided"],
          ["Gender", student?.gender ?? "Not provided"],
          ["Address", student?.address ?? "Not provided"],
          ["City", student?.city ?? "Not provided"],
          ["State", student?.state ?? "Not provided"],
          ["PIN code", student?.pincode ?? "Not provided"],
          ["Skills", student?.skills?.join(", ") || "Not provided"],
          ["Qualification", qualification],
          ["Preferred locations", student?.preferred_locations?.join(", ") || "Not provided"],
        ],
      })
    }
    void loadProfile()
  }, [router])

  const logout = async () => {
    await supabase?.auth.signOut()
    router.replace("/")
  }

  if (error) return <main className="min-h-screen pt-20 gradient-bg flex items-center justify-center p-6 text-white">{error}</main>
  if (!profile) return <main className="min-h-screen pt-20 gradient-bg flex items-center justify-center p-6 text-white">Loading profile...</main>

  const isStudent = profile.role === "student"
  return (
    <main className="min-h-screen pt-20 gradient-bg px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <Card className="glass-card border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl text-white">
              {isStudent ? <User className="h-6 w-6" /> : <Building2 className="h-6 w-6" />}
              {profile.name}
            </CardTitle>
            <CardDescription className="text-white/75">{isStudent ? "Student profile" : "Industry profile"} · {profile.email}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg border border-white/15 bg-white/5 p-4">
              <p className="text-sm text-white/60">Description</p>
              <p className="mt-1 whitespace-pre-line wrap-break-word text-white">{profile.description}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {profile.fields.map(([label, value]) => (
                <div key={label} className="rounded-lg border border-white/15 bg-white/5 p-4">
                  <p className="text-sm text-white/60">{label}</p>
                  <p className="mt-1 whitespace-pre-line wrap-break-word text-white">{value}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 border-t border-white/15 pt-5">
              <Button onClick={() => router.push(isStudent ? "/student?mode=edit" : "/industry?mode=edit")} className="bg-white text-primary hover:bg-white/90">
                <Pencil className="h-4 w-4" />
                Edit Profile
              </Button>
              <Button onClick={() => void logout()} variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
