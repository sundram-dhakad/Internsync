"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Building2,
  Users,
  Briefcase,
  Eye,
  MessageSquare,
  Download,
  Plus,
  Search,
  Filter,
  Star,
  MapPin,
  Calendar,
  Clock,
} from "lucide-react"

export default function IndustryDashboard() {
  const [searchTerm, setSearchTerm] = useState("")

  const internshipPosts = [
    {
      id: 1,
      title: "Software Development Intern",
      department: "Engineering",
      location: "Bangalore",
      duration: "6 months",
      stipend: "₹25,000",
      applicants: 45,
      shortlisted: 8,
      status: "Active",
      postedDate: "2024-01-10",
      applications: 45,
    },
    {
      id: 2,
      title: "Data Science Intern",
      department: "Analytics",
      location: "Mumbai",
      duration: "4 months",
      stipend: "₹22,000",
      applicants: 32,
      shortlisted: 5,
      status: "Active",
      postedDate: "2024-01-08",
      applications: 32,
    },
    {
      id: 3,
      title: "Marketing Intern",
      department: "Marketing",
      location: "Delhi",
      duration: "3 months",
      stipend: "₹18,000",
      applicants: 28,
      shortlisted: 12,
      status: "Closed",
      postedDate: "2024-01-05",
      applications: 28,
    },
  ]

  const candidates = [
    {
      id: 1,
      name: "Priya Sharma",
      university: "IIT Delhi",
      degree: "B.Tech Computer Science",
      gpa: "8.9 CGPA",
      skills: ["Python", "Machine Learning", "React"],
      location: "Delhi",
      matchScore: 95,
      appliedFor: "Software Development Intern",
      status: "New Application",
    },
    {
      id: 2,
      name: "Rahul Patel",
      university: "NIT Surat",
      degree: "B.Tech Information Technology",
      gpa: "8.5 CGPA",
      skills: ["Java", "Spring Boot", "MySQL"],
      location: "Gujarat",
      matchScore: 92,
      appliedFor: "Software Development Intern",
      status: "Shortlisted",
    },
    {
      id: 3,
      name: "Ananya Singh",
      university: "BITS Pilani",
      degree: "B.E Computer Science",
      gpa: "8.7 CGPA",
      skills: ["Data Analysis", "Python", "Tableau"],
      location: "Rajasthan",
      matchScore: 89,
      appliedFor: "Data Science Intern",
      status: "Under Review",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500"
      case "Closed":
        return "bg-red-500"
      case "Draft":
        return "bg-yellow-500"
      case "New Application":
        return "bg-blue-500"
      case "Shortlisted":
        return "bg-green-500"
      case "Under Review":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen pt-20 gradient-bg-secondary">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Industry Dashboard</h1>
            <p className="text-white/80 text-lg">Manage your internship postings and review candidates</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="glass-card border-white/20">
              <CardContent className="p-6 text-center">
                <Briefcase className="w-8 h-8 text-white mx-auto mb-2" />
                <div className="text-3xl font-bold text-white mb-2">3</div>
                <div className="text-white/80">Active Postings</div>
              </CardContent>
            </Card>
            <Card className="glass-card border-white/20">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-white mx-auto mb-2" />
                <div className="text-3xl font-bold text-white mb-2">105</div>
                <div className="text-white/80">Total Applications</div>
              </CardContent>
            </Card>
            <Card className="glass-card border-white/20">
              <CardContent className="p-6 text-center">
                <Star className="w-8 h-8 text-white mx-auto mb-2" />
                <div className="text-3xl font-bold text-white mb-2">25</div>
                <div className="text-white/80">Shortlisted</div>
              </CardContent>
            </Card>
            <Card className="glass-card border-white/20">
              <CardContent className="p-6 text-center">
                <Building2 className="w-8 h-8 text-white mx-auto mb-2" />
                <div className="text-3xl font-bold text-white mb-2">92%</div>
                <div className="text-white/80">Avg Match Score</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <Tabs defaultValue="postings" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-white/10 border border-white/20">
                  <TabsTrigger
                    value="postings"
                    className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
                  >
                    My Postings
                  </TabsTrigger>
                  <TabsTrigger
                    value="candidates"
                    className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
                  >
                    Candidates
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="postings" className="space-y-4 mt-6">
                  {/* Search and Filter */}
                  <div className="flex gap-4 mb-6">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                      <Input
                        placeholder="Search postings..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white/10 border-white/30 text-white placeholder:text-white/50"
                      />
                    </div>
                    <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button className="bg-white text-primary hover:bg-white/90">
                      <Plus className="w-4 h-4 mr-2" />
                      New Posting
                    </Button>
                  </div>

                  {internshipPosts.map((post) => (
                    <Card
                      key={post.id}
                      className="glass-card border-white/20 hover:bg-white/10 transition-all duration-300"
                    >
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-1">{post.title}</h3>
                            <p className="text-white/80">
                              {post.department} • {post.location}
                            </p>
                            <div className="flex items-center text-white/70 text-sm mt-2 space-x-4">
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {post.duration}
                              </span>
                              <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                Posted {post.postedDate}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={`${getStatusColor(post.status)} text-white mb-2`}>{post.status}</Badge>
                            <div className="text-white font-medium">{post.stipend}/month</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="text-center p-3 bg-white/5 rounded-lg">
                            <div className="text-2xl font-bold text-white">{post.applicants}</div>
                            <div className="text-white/70 text-sm">Applications</div>
                          </div>
                          <div className="text-center p-3 bg-white/5 rounded-lg">
                            <div className="text-2xl font-bold text-white">{post.shortlisted}</div>
                            <div className="text-white/70 text-sm">Shortlisted</div>
                          </div>
                          <div className="text-center p-3 bg-white/5 rounded-lg">
                            <div className="text-2xl font-bold text-white">6</div>
                            <div className="text-white/70 text-sm">Positions</div>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View Applications
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                          >
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Message Candidates
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Export
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="candidates" className="space-y-4 mt-6">
                  {candidates.map((candidate) => (
                    <Card
                      key={candidate.id}
                      className="glass-card border-white/20 hover:bg-white/10 transition-all duration-300"
                    >
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-1">{candidate.name}</h3>
                            <p className="text-white/80">{candidate.degree}</p>
                            <p className="text-white/70">{candidate.university}</p>
                            <div className="flex items-center text-white/70 text-sm mt-2">
                              <MapPin className="w-4 h-4 mr-1" />
                              {candidate.location} • GPA: {candidate.gpa}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center mb-2">
                              <Star className="w-4 h-4 text-yellow-400 mr-1" />
                              <span className="text-white font-bold">{candidate.matchScore}% Match</span>
                            </div>
                            <Badge className={`${getStatusColor(candidate.status)} text-white`}>
                              {candidate.status}
                            </Badge>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="text-white/70 text-sm mb-2">Applied for: {candidate.appliedFor}</div>
                          <div className="flex flex-wrap gap-2">
                            {candidate.skills.map((skill) => (
                              <Badge key={skill} variant="secondary" className="bg-white/20 text-white border-white/30">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View Profile
                          </Button>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                            Shortlist
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                          >
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Message
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="glass-card border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-white text-primary hover:bg-white/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Post New Internship
                  </Button>
                  <Button variant="outline" className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20">
                    <Download className="w-4 h-4 mr-2" />
                    Download Reports
                  </Button>
                  <Button variant="outline" className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20">
                    <Users className="w-4 h-4 mr-2" />
                    Bulk Actions
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="glass-card border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="text-white font-medium text-sm">New Application</div>
                    <div className="text-white/70 text-xs">Priya Sharma applied for Software Development Intern</div>
                    <div className="text-white/50 text-xs mt-1">2 hours ago</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="text-white font-medium text-sm">Candidate Shortlisted</div>
                    <div className="text-white/70 text-xs">Rahul Patel shortlisted for interview</div>
                    <div className="text-white/50 text-xs mt-1">1 day ago</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="text-white font-medium text-sm">Posting Expired</div>
                    <div className="text-white/70 text-xs">Marketing Intern posting closed</div>
                    <div className="text-white/50 text-xs mt-1">2 days ago</div>
                  </div>
                </CardContent>
              </Card>

              {/* Analytics Preview */}
              <Card className="glass-card border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">This Month</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-white/80">Applications Received</span>
                    <span className="text-white font-bold">105</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Candidates Shortlisted</span>
                    <span className="text-white font-bold">25</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Interviews Scheduled</span>
                    <span className="text-white font-bold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Offers Extended</span>
                    <span className="text-white font-bold">8</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
