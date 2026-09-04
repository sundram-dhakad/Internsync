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
import { User, GraduationCap, MapPin, Briefcase, Plus, X } from "lucide-react"
import { ResumeParser } from "@/components/resume-parser"
import { ABCIntegration } from "@/components/abc-id-integration"

export default function StudentPortal() {
  const [activeTab, setActiveTab] = useState("register")
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")
  const [courses, setCourses] = useState([{ university: "", degree: "", gpa: "", graduationYear: "" }])
  const [preferences, setPreferences] = useState({
    locations: [] as string[],
    sectors: [] as string[],
  })

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    socialCategory: "",
    aspirationalDistrict: false,
    previousParticipation: false,
    additionalInfo: "",
  })

  const handleResumeDataParsed = (parsedData: any) => {
    setFormData((prev) => ({
      ...prev,
      firstName: parsedData.personalInfo.firstName,
      lastName: parsedData.personalInfo.lastName,
      email: parsedData.personalInfo.email,
      phone: parsedData.personalInfo.phone,
      address: parsedData.personalInfo.address,
      city: parsedData.personalInfo.city,
      state: parsedData.personalInfo.state,
      pincode: parsedData.personalInfo.pincode,
    }))

    // Auto-fill first course
    setCourses([
      {
        university: parsedData.education.university,
        degree: parsedData.education.degree,
        gpa: parsedData.education.gpa,
        graduationYear: parsedData.education.graduationYear,
      },
    ])

    // Auto-fill skills
    setSkills(parsedData.skills)

    // Show success message and move to next tab
    setTimeout(() => {
      setActiveTab("academic")
    }, 1000)
  }

  const handleABCDataImported = (abcData: any) => {
    setFormData((prev) => ({
      ...prev,
      firstName: abcData.personalInfo.firstName,
      lastName: abcData.personalInfo.lastName,
      email: abcData.personalInfo.email,
      phone: abcData.personalInfo.phone,
      dateOfBirth: abcData.personalInfo.dateOfBirth,
      address: abcData.personalInfo.address,
      city: abcData.personalInfo.city,
      state: abcData.personalInfo.state,
      pincode: abcData.personalInfo.pincode,
    }))

    // Auto-fill courses from ABC data
    setCourses([
      {
        university: abcData.education.university,
        degree: abcData.education.degree,
        gpa: abcData.education.gpa,
        graduationYear: abcData.education.graduationYear,
      },
    ])

    // Auto-fill skills from ABC data
    setSkills(abcData.skills)

    // Show success message and move to next tab
    setTimeout(() => {
      setActiveTab("academic")
    }, 1000)
  }

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const addCourse = () => {
    setCourses([...courses, { university: "", degree: "", gpa: "", graduationYear: "" }])
  }

  const removeCourse = (index: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter((_, i) => i !== index))
    }
  }

  const updateCourse = (index: number, field: string, value: string) => {
    const updatedCourses = courses.map((course, i) => (i === index ? { ...course, [field]: value } : course))
    setCourses(updatedCourses)
  }

  const handleLocationChange = (location: string, checked: boolean) => {
    if (checked) {
      setPreferences((prev) => ({
        ...prev,
        locations: [...prev.locations, location],
      }))
    } else {
      setPreferences((prev) => ({
        ...prev,
        locations: prev.locations.filter((l) => l !== location),
      }))
    }
  }

  const handleSectorChange = (sector: string, checked: boolean) => {
    if (checked) {
      setPreferences((prev) => ({
        ...prev,
        sectors: [...prev.sectors, sector],
      }))
    } else {
      setPreferences((prev) => ({
        ...prev,
        sectors: prev.sectors.filter((s) => s !== sector),
      }))
    }
  }

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

  return (
    <div className="min-h-screen pt-20 gradient-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Student Portal</h1>
            <p className="text-white/90 text-lg">Register and get matched with your perfect internship opportunity</p>
          </div>

          {/* Main Content */}
          <Card className="glass-card border-white/20 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">Join the Platform</CardTitle>
              <CardDescription className="text-white/80">
                Complete your registration to start your internship journey
              </CardDescription>
            </CardHeader>

            <CardContent className="p-8">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-white/10 border border-white/20">
                  <TabsTrigger
                    value="register"
                    className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Personal Info
                  </TabsTrigger>
                  <TabsTrigger
                    value="academic"
                    className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
                  >
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Academic Details
                  </TabsTrigger>
                  <TabsTrigger
                    value="preferences"
                    className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
                  >
                    <Briefcase className="w-4 h-4 mr-2" />
                    Preferences
                  </TabsTrigger>
                </TabsList>

                {/* Personal Information Tab */}
                <TabsContent value="register" className="space-y-6 mt-8">
                  <ResumeParser onDataParsed={handleResumeDataParsed} />

                  <ABCIntegration onDataImported={handleABCDataImported} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-white">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                        placeholder="Enter your first name"
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-white">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                        placeholder="Enter your last name"
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="your.email@example.com"
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        placeholder="+91 98765 43210"
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth" className="text-white">
                        Date of Birth
                      </Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData((prev) => ({ ...prev, dateOfBirth: e.target.value }))}
                        className="bg-white/10 border-white/30 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender" className="text-white">
                        Gender
                      </Label>
                      <Select
                        value={formData.gender}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}
                      >
                        <SelectTrigger className="bg-white/10 border-white/30 text-white">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-4">
                    <Label className="text-white text-lg">Address</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="address" className="text-white">
                          Street Address
                        </Label>
                        <Textarea
                          id="address"
                          value={formData.address}
                          onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                          placeholder="Enter your complete address"
                          className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                        />
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="city" className="text-white">
                            City
                          </Label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                            placeholder="City"
                            className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state" className="text-white">
                            State
                          </Label>
                          <Input
                            id="state"
                            value={formData.state}
                            onChange={(e) => setFormData((prev) => ({ ...prev, state: e.target.value }))}
                            placeholder="State"
                            className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pincode" className="text-white">
                            PIN Code
                          </Label>
                          <Input
                            id="pincode"
                            value={formData.pincode}
                            onChange={(e) => setFormData((prev) => ({ ...prev, pincode: e.target.value }))}
                            placeholder="PIN Code"
                            className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Affirmative Action Data */}
                  <Card className="glass-card border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white">Affirmative Action Information</CardTitle>
                      <CardDescription className="text-white/80">
                        This information helps in fair allocation as per government guidelines
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="socialCategory" className="text-white">
                            Social Category
                          </Label>
                          <Select
                            value={formData.socialCategory}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, socialCategory: value }))}
                          >
                            <SelectTrigger className="bg-white/10 border-white/30 text-white">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">General</SelectItem>
                              <SelectItem value="obc">OBC</SelectItem>
                              <SelectItem value="sc">SC</SelectItem>
                              <SelectItem value="st">ST</SelectItem>
                              <SelectItem value="ews">EWS</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center space-x-2 pt-8">
                          <Checkbox
                            id="aspirationalDistrict"
                            checked={formData.aspirationalDistrict}
                            onCheckedChange={(checked) =>
                              setFormData((prev) => ({ ...prev, aspirationalDistrict: checked as boolean }))
                            }
                            className="border-white/30"
                          />
                          <Label htmlFor="aspirationalDistrict" className="text-white">
                            Belongs to Aspirational/Rural District
                          </Label>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Academic Details Tab */}
                <TabsContent value="academic" className="space-y-6 mt-8">
                  <div className="space-y-6">
                    {courses.map((course, index) => (
                      <Card key={index} className="glass-card border-white/20">
                        <CardHeader className="flex flex-row items-center justify-between">
                          <CardTitle className="text-white">
                            {index === 0 ? "Primary Course" : `Additional Course ${index}`}
                          </CardTitle>
                          {index > 0 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeCourse(index)}
                              className="text-white hover:bg-white/20"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`university-${index}`} className="text-white">
                              University/Institution
                            </Label>
                            <Input
                              id={`university-${index}`}
                              value={course.university}
                              onChange={(e) => updateCourse(index, "university", e.target.value)}
                              placeholder="Enter your university name"
                              className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`degree-${index}`} className="text-white">
                              Degree/Course
                            </Label>
                            <Input
                              id={`degree-${index}`}
                              value={course.degree}
                              onChange={(e) => updateCourse(index, "degree", e.target.value)}
                              placeholder="e.g., B.Tech Computer Science"
                              className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`gpa-${index}`} className="text-white">
                              GPA/Percentage
                            </Label>
                            <Input
                              id={`gpa-${index}`}
                              value={course.gpa}
                              onChange={(e) => updateCourse(index, "gpa", e.target.value)}
                              placeholder="e.g., 8.5 CGPA or 85%"
                              className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`graduationYear-${index}`} className="text-white">
                              Expected Graduation Year
                            </Label>
                            <Select
                              value={course.graduationYear}
                              onValueChange={(value) => updateCourse(index, "graduationYear", value)}
                            >
                              <SelectTrigger className="bg-white/10 border-white/30 text-white">
                                <SelectValue placeholder="Select year" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="2024">2024</SelectItem>
                                <SelectItem value="2025">2025</SelectItem>
                                <SelectItem value="2026">2026</SelectItem>
                                <SelectItem value="2027">2027</SelectItem>
                                <SelectItem value="2028">2028</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    <Button
                      onClick={addCourse}
                      variant="outline"
                      className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Course
                    </Button>
                  </div>

                  {/* Skills Section */}
                  <Card className="glass-card border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white">Skills & Competencies</CardTitle>
                      <CardDescription className="text-white/80">
                        Add your technical and soft skills for better matching
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          placeholder="Enter a skill (e.g., Python, Marketing)"
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
                        {skills.map((skill) => (
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

                  {/* Previous Participation */}
                  <Card className="glass-card border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white">Previous Participation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="previousParticipation"
                          checked={formData.previousParticipation}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({ ...prev, previousParticipation: checked as boolean }))
                          }
                          className="border-white/30"
                        />
                        <Label htmlFor="previousParticipation" className="text-white">
                          I have previously participated in government internship schemes
                        </Label>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Preferences Tab */}
                <TabsContent value="preferences" className="space-y-6 mt-8">
                  {/* Location Preferences */}
                  <Card className="glass-card border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <MapPin className="w-5 h-5 mr-2" />
                        Location Preferences
                      </CardTitle>
                      <CardDescription className="text-white/80">
                        Select your preferred cities for internship (select multiple)
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {locations.map((location) => (
                          <div key={location} className="flex items-center space-x-2">
                            <Checkbox
                              id={`location-${location}`}
                              checked={preferences.locations.includes(location)}
                              onCheckedChange={(checked) => handleLocationChange(location, checked as boolean)}
                              className="border-white/30"
                            />
                            <Label htmlFor={`location-${location}`} className="text-white text-sm">
                              {location}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Sector Preferences */}
                  <Card className="glass-card border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Briefcase className="w-5 h-5 mr-2" />
                        Sector Preferences
                      </CardTitle>
                      <CardDescription className="text-white/80">
                        Choose industries you're interested in working with
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {sectors.map((sector) => (
                          <div key={sector} className="flex items-center space-x-2">
                            <Checkbox
                              id={`sector-${sector}`}
                              checked={preferences.sectors.includes(sector)}
                              onCheckedChange={(checked) => handleSectorChange(sector, checked as boolean)}
                              className="border-white/30"
                            />
                            <Label htmlFor={`sector-${sector}`} className="text-white text-sm">
                              {sector}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Additional Preferences */}
                  <Card className="glass-card border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white">Additional Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="additionalInfo" className="text-white">
                          Tell us more about your career goals and interests
                        </Label>
                        <Textarea
                          id="additionalInfo"
                          value={formData.additionalInfo}
                          onChange={(e) => setFormData((prev) => ({ ...prev, additionalInfo: e.target.value }))}
                          placeholder="Describe your career aspirations, specific interests, or any additional information that might help in matching..."
                          className="bg-white/10 border-white/30 text-white placeholder:text-white/50 min-h-[100px]"
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
                    const tabs = ["register", "academic", "preferences"]
                    const currentIndex = tabs.indexOf(activeTab)
                    if (currentIndex > 0) setActiveTab(tabs[currentIndex - 1])
                  }}
                  disabled={activeTab === "register"}
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 disabled:opacity-50"
                >
                  Previous
                </Button>

                {activeTab === "preferences" ? (
                  <Button className="bg-white text-primary hover:bg-white/90 px-8">Complete Registration</Button>
                ) : (
                  <Button
                    onClick={() => {
                      const tabs = ["register", "academic", "preferences"]
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
