"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  FileText,
  Briefcase,
  Bell,
  CheckCircle,
  Clock,
  MapPin,
  Building2,
  Star,
  Download,
  Eye,
  X,
} from "lucide-react"

export default function StudentDashboard() {
  const [profileCompletion] = useState(85)

  const applications = [
    {
      id: 1,
      company: "Tech Innovations Pvt Ltd",
      role: "Software Development Intern",
      location: "Bangalore",
      status: "Under Review",
      appliedDate: "2024-01-15",
      matchScore: 92,
    },
    {
      id: 2,
      company: "Green Energy Solutions",
      role: "Research Intern",
      location: "Mumbai",
      status: "Shortlisted",
      appliedDate: "2024-01-12",
      matchScore: 88,
    },
    {
      id: 3,
      company: "Digital Marketing Hub",
      role: "Marketing Intern",
      location: "Delhi",
      status: "Rejected",
      appliedDate: "2024-01-10",
      matchScore: 76,
    },
  ]

  const recommendations = [
    {
      id: 1,
      company: "AI Robotics Corp",
      role: "Machine Learning Intern",
      location: "Hyderabad",
      matchScore: 95,
      stipend: "₹25,000/month",
      duration: "6 months",
    },
    {
      id: 2,
      company: "FinTech Solutions",
      role: "Data Analyst Intern",
      location: "Pune",
      matchScore: 91,
      stipend: "₹22,000/month",
      duration: "4 months",
    },
    {
      id: 3,
      company: "Healthcare Innovations",
      role: "Product Development Intern",
      location: "Chennai",
      matchScore: 87,
      stipend: "₹20,000/month",
      duration: "5 months",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Under Review":
        return "bg-yellow-500"
      case "Shortlisted":
        return "bg-green-500"
      case "Rejected":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Under Review":
        return <Clock className="w-4 h-4" />
      case "Shortlisted":
        return <CheckCircle className="w-4 h-4" />
      case "Rejected":
        return <X className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen pt-20 gradient-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Welcome back, Rahul!</h1>
            <p className="text-white/80 text-lg">Track your applications and discover new opportunities</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="glass-card border-white/20">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">3</div>
                <div className="text-white/80">Active Applications</div>
              </CardContent>
            </Card>
            <Card className="glass-card border-white/20">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">12</div>
                <div className="text-white/80">Profile Views</div>
              </CardContent>
            </Card>
            <Card className="glass-card border-white/20">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">89%</div>
                <div className="text-white/80">Match Score</div>
              </CardContent>
            </Card>
            <Card className="glass-card border-white/20">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">5</div>
                <div className="text-white/80">New Recommendations</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <Tabs defaultValue="applications" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-white/10 border border-white/20">
                  <TabsTrigger
                    value="applications"
                    className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
                  >
                    My Applications
                  </TabsTrigger>
                  <TabsTrigger
                    value="recommendations"
                    className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
                  >
                    Recommendations
                  </TabsTrigger>
                  <TabsTrigger
                    value="profile"
                    className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
                  >
                    Profile
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="applications" className="space-y-4 mt-6">
                  {applications.map((application) => (
                    <Card
                      key={application.id}
                      className="glass-card border-white/20 hover:bg-white/10 transition-all duration-300"
                    >
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-1">{application.role}</h3>
                            <p className="text-white/80 flex items-center">
                              <Building2 className="w-4 h-4 mr-1" />
                              {application.company}
                            </p>
                            <p className="text-white/70 flex items-center mt-1">
                              <MapPin className="w-4 h-4 mr-1" />
                              {application.location}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge className={`${getStatusColor(application.status)} text-white mb-2`}>
                              {getStatusIcon(application.status)}
                              <span className="ml-1">{application.status}</span>
                            </Badge>
                            <div className="text-white/70 text-sm">Applied: {application.appliedDate}</div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span className="text-white font-medium">{application.matchScore}% Match</span>
                          </div>
                          <div className="space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="recommendations" className="space-y-4 mt-6">
                  {recommendations.map((rec) => (
                    <Card
                      key={rec.id}
                      className="glass-card border-white/20 hover:bg-white/10 transition-all duration-300"
                    >
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-1">{rec.role}</h3>
                            <p className="text-white/80 flex items-center">
                              <Building2 className="w-4 h-4 mr-1" />
                              {rec.company}
                            </p>
                            <p className="text-white/70 flex items-center mt-1">
                              <MapPin className="w-4 h-4 mr-1" />
                              {rec.location}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center mb-2">
                              <Star className="w-4 h-4 text-yellow-400 mr-1" />
                              <span className="text-white font-bold">{rec.matchScore}% Match</span>
                            </div>
                            <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                              Recommended
                            </Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <span className="text-white/70 text-sm">Stipend:</span>
                            <div className="text-white font-medium">{rec.stipend}</div>
                          </div>
                          <div>
                            <span className="text-white/70 text-sm">Duration:</span>
                            <div className="text-white font-medium">{rec.duration}</div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button className="flex-1 bg-white text-primary hover:bg-white/90">Apply Now</Button>
                          <Button
                            variant="outline"
                            className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="profile" className="mt-6">
                  <Card className="glass-card border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white">Profile Completion</CardTitle>
                      <CardDescription className="text-white/80">
                        Complete your profile to get better matches
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <div className="flex justify-between text-white mb-2">
                          <span>Profile Completion</span>
                          <span>{profileCompletion}%</span>
                        </div>
                        <Progress value={profileCompletion} className="h-2" />
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                            <span className="text-white">Personal Information</span>
                          </div>
                          <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                            Complete
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                            <span className="text-white">Academic Details</span>
                          </div>
                          <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                            Complete
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div className="flex items-center">
                            <Clock className="w-5 h-5 text-yellow-400 mr-3" />
                            <span className="text-white">Skills & Portfolio</span>
                          </div>
                          <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300">
                            Incomplete
                          </Badge>
                        </div>
                      </div>

                      <Button className="w-full bg-white text-primary hover:bg-white/90">
                        <User className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Notifications */}
              <Card className="glass-card border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    Recent Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="text-white font-medium text-sm">Application Update</div>
                    <div className="text-white/70 text-xs">You've been shortlisted for Green Energy Solutions</div>
                    <div className="text-white/50 text-xs mt-1">2 hours ago</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="text-white font-medium text-sm">New Recommendation</div>
                    <div className="text-white/70 text-xs">AI Robotics Corp has a 95% match for you</div>
                    <div className="text-white/50 text-xs mt-1">1 day ago</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="text-white font-medium text-sm">Profile View</div>
                    <div className="text-white/70 text-xs">Tech Innovations viewed your profile</div>
                    <div className="text-white/50 text-xs mt-1">2 days ago</div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="glass-card border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20">
                    <FileText className="w-4 h-4 mr-2" />
                    Update Resume
                  </Button>
                  <Button variant="outline" className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20">
                    <Download className="w-4 h-4 mr-2" />
                    Download Certificate
                  </Button>
                  <Button variant="outline" className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Browse Internships
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
