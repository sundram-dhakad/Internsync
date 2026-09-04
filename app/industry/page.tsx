"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, Users, Briefcase, Plus, X, Upload, FileText } from "lucide-react"

export default function IndustryPortal() {
  const [activeTab, setActiveTab] = useState("register")
  const [requiredSkills, setRequiredSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")
  const [internshipCapacity, setInternshipCapacity] = useState(1)

  const addSkill = () => {
    if (newSkill.trim() && !requiredSkills.includes(newSkill.trim())) {
      setRequiredSkills([...requiredSkills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setRequiredSkills(requiredSkills.filter((skill) => skill !== skillToRemove))
  }

  const sectors = [
    "Information Technology",
    "Manufacturing",
    "Healthcare",
    "Finance",
    "Education",
    "Retail",
    "Automotive",
    "Telecommunications",
    "Energy",
    "Agriculture",
    "Media & Entertainment",
    "Government",
  ]

  const locations = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
    "Kanpur",
    "Nagpur",
  ]

  return (
    <div className="min-h-screen pt-20 gradient-bg-secondary">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Industry Partner Portal</h1>
            <p className="text-white/90 text-lg">
              Register your company and post internship opportunities to find the best talent
            </p>
          </div>

          {/* Main Content */}
          <Card className="glass-card border-white/20 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">Partner with Us</CardTitle>
              <CardDescription className="text-white/80">
                Join our platform to access top talent from across India
              </CardDescription>
            </CardHeader>

            <CardContent className="p-8">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-white/10 border border-white/20">
                  <TabsTrigger
                    value="register"
                    className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
                  >
                    <Building2 className="w-4 h-4 mr-2" />
                    Company Info
                  </TabsTrigger>
                  <TabsTrigger
                    value="internship"
                    className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
                  >
                    <Briefcase className="w-4 h-4 mr-2" />
                    Post Internship
                  </TabsTrigger>
                  <TabsTrigger
                    value="requirements"
                    className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Requirements
                  </TabsTrigger>
                </TabsList>

                {/* Company Information Tab */}
                <TabsContent value="register" className="space-y-6 mt-8">
                  {/* Company Registration */}
                  <Card className="glass-card border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Building2 className="w-5 h-5 mr-2" />
                        Company Registration
                      </CardTitle>
                      <CardDescription className="text-white/80">
                        Provide your company details to get started
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="companyName" className="text-white">
                            Company Name
                          </Label>
                          <Input
                            id="companyName"
                            placeholder="Enter your company name"
                            className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="registrationNumber" className="text-white">
                            Registration Number
                          </Label>
                          <Input
                            id="registrationNumber"
                            placeholder="Company registration number"
                            className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sector" className="text-white">
                            Industry Sector
                          </Label>
                          <Select>
                            <SelectTrigger className="bg-white/10 border-white/30 text-white">
                              <SelectValue placeholder="Select your industry" />
                            </SelectTrigger>
                            <SelectContent>
                              {sectors.map((sector) => (
                                <SelectItem key={sector} value={sector.toLowerCase().replace(/\s+/g, "-")}>
                                  {sector}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="companySize" className="text-white">
                            Company Size
                          </Label>
                          <Select>
                            <SelectTrigger className="bg-white/10 border-white/30 text-white">
                              <SelectValue placeholder="Select company size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="startup">Startup (1-50 employees)</SelectItem>
                              <SelectItem value="small">Small (51-200 employees)</SelectItem>
                              <SelectItem value="medium">Medium (201-1000 employees)</SelectItem>
                              <SelectItem value="large">Large (1000+ employees)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="companyDescription" className="text-white">
                          Company Description
                        </Label>
                        <Textarea
                          id="companyDescription"
                          placeholder="Describe your company, its mission, and what makes it a great place for interns..."
                          className="bg-white/10 border-white/30 text-white placeholder:text-white/50 min-h-[100px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="website" className="text-white">
                          Company Website
                        </Label>
                        <Input
                          id="website"
                          placeholder="https://www.yourcompany.com"
                          className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Contact Information */}
                  <Card className="glass-card border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white">Contact Information</CardTitle>
                      <CardDescription className="text-white/80">
                        Primary contact details for internship coordination
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="contactName" className="text-white">
                            Contact Person Name
                          </Label>
                          <Input
                            id="contactName"
                            placeholder="HR Manager / Recruiter Name"
                            className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="designation" className="text-white">
                            Designation
                          </Label>
                          <Input
                            id="designation"
                            placeholder="e.g., HR Manager, Talent Acquisition"
                            className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contactEmail" className="text-white">
                            Email Address
                          </Label>
                          <Input
                            id="contactEmail"
                            type="email"
                            placeholder="hr@yourcompany.com"
                            className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contactPhone" className="text-white">
                            Phone Number
                          </Label>
                          <Input
                            id="contactPhone"
                            placeholder="+91 98765 43210"
                            className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="officeAddress" className="text-white">
                          Office Address
                        </Label>
                        <Textarea
                          id="officeAddress"
                          placeholder="Complete office address including city, state, and PIN code"
                          className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Company Documents */}
                  <Card className="glass-card border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <FileText className="w-5 h-5 mr-2" />
                        Company Documents
                      </CardTitle>
                      <CardDescription className="text-white/80">
                        Upload required documents for verification
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button
                          variant="outline"
                          className="h-24 bg-white/10 border-white/30 text-white hover:bg-white/20 flex-col"
                        >
                          <Upload className="w-8 h-8 mb-2" />
                          Company Registration Certificate
                          <span className="text-xs text-white/70">PDF, JPG, PNG (Max 5MB)</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="h-24 bg-white/10 border-white/30 text-white hover:bg-white/20 flex-col"
                        >
                          <Upload className="w-8 h-8 mb-2" />
                          GST Certificate
                          <span className="text-xs text-white/70">PDF, JPG, PNG (Max 5MB)</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Internship Posting Tab */}
                <TabsContent value="internship" className="space-y-6 mt-8">
                  <Card className="glass-card border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white">Internship Details</CardTitle>
                      <CardDescription className="text-white/80">
                        Provide comprehensive details about the internship opportunity
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="roleTitle" className="text-white">
                            Role Title
                          </Label>
                          <Input
                            id="roleTitle"
                            placeholder="e.g., Software Development Intern"
                            className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="department" className="text-white">
                            Department
                          </Label>
                          <Input
                            id="department"
                            placeholder="e.g., Engineering, Marketing, HR"
                            className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="internshipLocation" className="text-white">
                            Location
                          </Label>
                          <Select>
                            <SelectTrigger className="bg-white/10 border-white/30 text-white">
                              <SelectValue placeholder="Select location" />
                            </SelectTrigger>
                            <SelectContent>
                              {locations.map((location) => (
                                <SelectItem key={location} value={location.toLowerCase()}>
                                  {location}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="workMode" className="text-white">
                            Work Mode
                          </Label>
                          <Select>
                            <SelectTrigger className="bg-white/10 border-white/30 text-white">
                              <SelectValue placeholder="Select work mode" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="onsite">On-site</SelectItem>
                              <SelectItem value="remote">Remote</SelectItem>
                              <SelectItem value="hybrid">Hybrid</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="duration" className="text-white">
                            Duration (months)
                          </Label>
                          <Select>
                            <SelectTrigger className="bg-white/10 border-white/30 text-white">
                              <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="3">3 months</SelectItem>
                              <SelectItem value="4">4 months</SelectItem>
                              <SelectItem value="5">5 months</SelectItem>
                              <SelectItem value="6">6 months</SelectItem>
                              <SelectItem value="12">12 months</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="stipend" className="text-white">
                            Monthly Stipend (₹)
                          </Label>
                          <Input
                            id="stipend"
                            placeholder="e.g., 25000"
                            type="number"
                            className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="roleDescription" className="text-white">
                          Role Description
                        </Label>
                        <Textarea
                          id="roleDescription"
                          placeholder="Describe the internship role, responsibilities, and what the intern will learn..."
                          className="bg-white/10 border-white/30 text-white placeholder:text-white/50 min-h-[120px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="learningOutcomes" className="text-white">
                          Learning Outcomes
                        </Label>
                        <Textarea
                          id="learningOutcomes"
                          placeholder="What skills and knowledge will the intern gain from this opportunity?"
                          className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Internship Capacity */}
                  <Card className="glass-card border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white">Internship Capacity</CardTitle>
                      <CardDescription className="text-white/80">
                        How many interns can you accommodate for this role?
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-4">
                        <Label htmlFor="capacity" className="text-white">
                          Number of Positions:
                        </Label>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setInternshipCapacity(Math.max(1, internshipCapacity - 1))}
                            className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                          >
                            -
                          </Button>
                          <Input
                            id="capacity"
                            value={internshipCapacity}
                            onChange={(e) => setInternshipCapacity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                            className="w-20 text-center bg-white/10 border-white/30 text-white"
                            type="number"
                            min="1"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setInternshipCapacity(internshipCapacity + 1)}
                            className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Requirements Tab */}
                <TabsContent value="requirements" className="space-y-6 mt-8">
                  {/* Required Skills */}
                  <Card className="glass-card border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white">Required Skills</CardTitle>
                      <CardDescription className="text-white/80">
                        Specify the technical and soft skills required for this internship
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          placeholder="Enter a required skill (e.g., Python, Communication)"
                          className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                          onKeyPress={(e) => e.key === "Enter" && addSkill()}
                        />
                        <Button
                          onClick={addSkill}
                          variant="outline"
                          className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {requiredSkills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                          >
                            {skill}
                            <button onClick={() => removeSkill(skill)} className="ml-2 hover:text-red-300">
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Academic Requirements */}
                  <Card className="glass-card border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white">Academic Requirements</CardTitle>
                      <CardDescription className="text-white/80">
                        Specify minimum academic qualifications and preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="minDegree" className="text-white">
                            Minimum Degree Level
                          </Label>
                          <Select>
                            <SelectTrigger className="bg-white/10 border-white/30 text-white">
                              <SelectValue placeholder="Select minimum degree" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="diploma">Diploma</SelectItem>
                              <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                              <SelectItem value="master">Master's Degree</SelectItem>
                              <SelectItem value="phd">PhD</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="fieldOfStudy" className="text-white">
                            Preferred Field of Study
                          </Label>
                          <Input
                            id="fieldOfStudy"
                            placeholder="e.g., Computer Science, Engineering, Business"
                            className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="minGPA" className="text-white">
                            Minimum GPA/Percentage
                          </Label>
                          <Input
                            id="minGPA"
                            placeholder="e.g., 7.0 CGPA or 70%"
                            className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="graduationYear" className="text-white">
                            Graduation Year Range
                          </Label>
                          <Select>
                            <SelectTrigger className="bg-white/10 border-white/30 text-white">
                              <SelectValue placeholder="Select year range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="2024-2025">2024-2025</SelectItem>
                              <SelectItem value="2025-2026">2025-2026</SelectItem>
                              <SelectItem value="2026-2027">2026-2027</SelectItem>
                              <SelectItem value="any">Any Year</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Additional Preferences */}
                  <Card className="glass-card border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white">Additional Preferences</CardTitle>
                      <CardDescription className="text-white/80">
                        Any additional requirements or preferences for candidates
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="freshGraduates" className="border-white/30" />
                          <Label htmlFor="freshGraduates" className="text-white">
                            Prefer fresh graduates/final year students
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="priorExperience" className="border-white/30" />
                          <Label htmlFor="priorExperience" className="text-white">
                            Prior internship experience preferred
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="diversityFocus" className="border-white/30" />
                          <Label htmlFor="diversityFocus" className="text-white">
                            Encourage applications from underrepresented groups
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="ruralCandidates" className="border-white/30" />
                          <Label htmlFor="ruralCandidates" className="text-white">
                            Welcome candidates from rural/aspirational districts
                          </Label>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="additionalRequirements" className="text-white">
                          Additional Requirements or Notes
                        </Label>
                        <Textarea
                          id="additionalRequirements"
                          placeholder="Any other specific requirements, selection criteria, or information for candidates..."
                          className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => {
                    const tabs = ["register", "internship", "requirements"]
                    const currentIndex = tabs.indexOf(activeTab)
                    if (currentIndex > 0) setActiveTab(tabs[currentIndex - 1])
                  }}
                  disabled={activeTab === "register"}
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 disabled:opacity-50"
                >
                  Previous
                </Button>

                {activeTab === "requirements" ? (
                  <Button className="bg-white text-primary hover:bg-white/90 px-8">Post Internship</Button>
                ) : (
                  <Button
                    onClick={() => {
                      const tabs = ["register", "internship", "requirements"]
                      const currentIndex = tabs.indexOf(activeTab)
                      if (currentIndex < tabs.length - 1) setActiveTab(tabs[currentIndex + 1])
                    }}
                    className="bg-white text-primary hover:bg-white/90"
                  >
                    Next
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
