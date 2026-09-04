"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  Building2,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Edit,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("students")
  const [searchTerm, setSearchTerm] = useState("")

  const students = [
    {
      id: 1,
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      university: "IIT Delhi",
      degree: "B.Tech Computer Science",
      gpa: "8.9 CGPA",
      location: "Delhi",
      category: "General",
      aspirational: false,
      status: "Active",
      registeredDate: "2024-01-15",
      applications: 3,
      matches: 2,
    },
    {
      id: 2,
      name: "Rahul Patel",
      email: "rahul.patel@email.com",
      university: "NIT Surat",
      degree: "B.Tech Information Technology",
      gpa: "8.5 CGPA",
      location: "Gujarat",
      category: "OBC",
      aspirational: true,
      status: "Active",
      registeredDate: "2024-01-12",
      applications: 5,
      matches: 3,
    },
    {
      id: 3,
      name: "Ananya Singh",
      email: "ananya.singh@email.com",
      university: "BITS Pilani",
      degree: "B.E Computer Science",
      gpa: "8.7 CGPA",
      location: "Rajasthan",
      category: "General",
      aspirational: false,
      status: "Inactive",
      registeredDate: "2024-01-10",
      applications: 2,
      matches: 1,
    },
  ]

  const companies = [
    {
      id: 1,
      name: "Tech Innovations Pvt Ltd",
      email: "hr@techinnovations.com",
      sector: "Information Technology",
      size: "Large",
      location: "Bangalore",
      contact: "Rajesh Kumar",
      phone: "+91 98765 43210",
      status: "Approved",
      registeredDate: "2024-01-08",
      internships: 5,
      applications: 120,
    },
    {
      id: 2,
      name: "Green Energy Solutions",
      email: "careers@greenenergy.com",
      sector: "Energy",
      size: "Medium",
      location: "Mumbai",
      contact: "Priya Mehta",
      phone: "+91 87654 32109",
      status: "Pending",
      registeredDate: "2024-01-12",
      internships: 3,
      applications: 85,
    },
    {
      id: 3,
      name: "FinTech Solutions",
      email: "hr@fintech.com",
      sector: "Finance",
      size: "Startup",
      location: "Pune",
      contact: "Amit Sharma",
      phone: "+91 76543 21098",
      status: "Approved",
      registeredDate: "2024-01-05",
      internships: 2,
      applications: 65,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
      case "Approved":
        return "bg-green-500"
      case "Inactive":
      case "Rejected":
        return "bg-red-500"
      case "Pending":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
      case "Approved":
        return <CheckCircle className="w-4 h-4" />
      case "Inactive":
      case "Rejected":
        return <XCircle className="w-4 h-4" />
      case "Pending":
        return <Clock className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen pt-20 gradient-bg-admin">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">User Management</h1>
            <p className="text-white/80 text-lg">Manage students, companies, and system users</p>
          </div>

          {/* Management Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/10 border border-white/20 mb-8">
              <TabsTrigger
                value="students"
                className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
              >
                <Users className="w-4 h-4 mr-2" />
                Students ({students.length})
              </TabsTrigger>
              <TabsTrigger
                value="companies"
                className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
              >
                <Building2 className="w-4 h-4 mr-2" />
                Companies ({companies.length})
              </TabsTrigger>
            </TabsList>

            {/* Search and Filter Bar */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                <Input
                  placeholder={`Search ${activeTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/30 text-white placeholder:text-white/50"
                />
              </div>
              <Select>
                <SelectTrigger className="w-48 bg-white/10 border-white/30 text-white">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>

            {/* Students Tab */}
            <TabsContent value="students" className="space-y-4">
              {students.map((student) => (
                <Card
                  key={student.id}
                  className="glass-card border-white/20 hover:bg-white/10 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="text-xl font-semibold text-white mr-3">{student.name}</h3>
                          <Badge className={`${getStatusColor(student.status)} text-white`}>
                            {getStatusIcon(student.status)}
                            <span className="ml-1">{student.status}</span>
                          </Badge>
                          {student.aspirational && (
                            <Badge variant="secondary" className="ml-2 bg-blue-500/20 text-blue-300 border-blue-500/30">
                              Aspirational District
                            </Badge>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="text-white/70">Contact</div>
                            <div className="text-white flex items-center">
                              <Mail className="w-3 h-3 mr-1" />
                              {student.email}
                            </div>
                          </div>
                          <div>
                            <div className="text-white/70">Education</div>
                            <div className="text-white">{student.degree}</div>
                            <div className="text-white/80">{student.university}</div>
                          </div>
                          <div>
                            <div className="text-white/70">Performance</div>
                            <div className="text-white">GPA: {student.gpa}</div>
                            <div className="text-white/80">Category: {student.category}</div>
                          </div>
                        </div>

                        <div className="flex items-center mt-3 space-x-4 text-sm text-white/70">
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {student.location}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            Registered: {student.registeredDate}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="text-right mr-4">
                          <div className="text-white font-medium">{student.applications} Applications</div>
                          <div className="text-white/70 text-sm">{student.matches} Matches</div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Companies Tab */}
            <TabsContent value="companies" className="space-y-4">
              {companies.map((company) => (
                <Card
                  key={company.id}
                  className="glass-card border-white/20 hover:bg-white/10 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="text-xl font-semibold text-white mr-3">{company.name}</h3>
                          <Badge className={`${getStatusColor(company.status)} text-white`}>
                            {getStatusIcon(company.status)}
                            <span className="ml-1">{company.status}</span>
                          </Badge>
                          <Badge variant="secondary" className="ml-2 bg-white/20 text-white border-white/30">
                            {company.size}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="text-white/70">Contact Information</div>
                            <div className="text-white flex items-center">
                              <Mail className="w-3 h-3 mr-1" />
                              {company.email}
                            </div>
                            <div className="text-white flex items-center mt-1">
                              <Phone className="w-3 h-3 mr-1" />
                              {company.phone}
                            </div>
                          </div>
                          <div>
                            <div className="text-white/70">Company Details</div>
                            <div className="text-white">Sector: {company.sector}</div>
                            <div className="text-white/80">Contact: {company.contact}</div>
                          </div>
                          <div>
                            <div className="text-white/70">Activity</div>
                            <div className="text-white">{company.internships} Internships</div>
                            <div className="text-white/80">{company.applications} Applications</div>
                          </div>
                        </div>

                        <div className="flex items-center mt-3 space-x-4 text-sm text-white/70">
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {company.location}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            Registered: {company.registeredDate}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {company.status === "Pending" && (
                          <>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-red-600/20 border-red-600/30 text-red-300 hover:bg-red-600/30"
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
