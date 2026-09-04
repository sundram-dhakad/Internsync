"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Shield,
  Users,
  Building2,
  Briefcase,
  Zap,
  Settings,
  BarChart3,
  Download,
  Play,
  CheckCircle,
  Clock,
  Target,
  TrendingUp,
  AlertTriangle,
  MapPin,
  GraduationCap,
} from "lucide-react"

export default function AdminPortal() {
  const [isMatching, setIsMatching] = useState(false)
  const [matchingProgress, setMatchingProgress] = useState(0)
  const [matchingComplete, setMatchingComplete] = useState(false)
  const [skillsWeight, setSkillsWeight] = useState([70])
  const [locationWeight, setLocationWeight] = useState([60])
  const [firstTimeBoost, setFirstTimeBoost] = useState([25])
  const [diversityBoost, setDiversityBoost] = useState([30])

  const runMatching = () => {
    setIsMatching(true)
    setMatchingComplete(false)
    setMatchingProgress(0)

    // Simulate AI matching process
    const interval = setInterval(() => {
      setMatchingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsMatching(false)
          setMatchingComplete(true)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 500)
  }

  const systemStats = {
    totalStudents: 50000,
    totalCompanies: 2500,
    totalInternships: 12000,
    aspirationalStudents: 15000,
    activeApplications: 45000,
    successfulMatches: 42500,
    matchScore: 88,
  }

  const recentMatches = [
    { student: "Priya Sharma", company: "Tech Innovations", role: "Software Intern", score: 95 },
    { student: "Rahul Patel", company: "Green Energy", role: "Research Intern", score: 92 },
    { student: "Ananya Singh", company: "FinTech Solutions", role: "Data Analyst", score: 89 },
    { student: "Arjun Kumar", company: "Healthcare Plus", role: "Product Intern", score: 87 },
  ]

  const locationStats = [
    { location: "Mumbai", students: 8500, companies: 450, matches: 7200 },
    { location: "Bangalore", students: 9200, companies: 520, matches: 8100 },
    { location: "Delhi", students: 7800, companies: 380, matches: 6900 },
    { location: "Chennai", students: 6500, companies: 320, matches: 5800 },
    { location: "Hyderabad", students: 5900, companies: 290, matches: 5200 },
  ]

  return (
    <div className="min-h-screen pt-20 gradient-bg-admin">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Shield className="w-8 h-8 text-white mr-3" />
              <h1 className="text-4xl font-bold text-white">Admin Control Center</h1>
            </div>
            <p className="text-white/80 text-lg">Manage the entire platform and run AI-powered matching algorithms</p>
          </div>

          {/* System Overview Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
            <Card className="glass-card border-white/20">
              <CardContent className="p-4 text-center">
                <Users className="w-6 h-6 text-white mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{systemStats.totalStudents.toLocaleString()}</div>
                <div className="text-white/80 text-sm">Students</div>
              </CardContent>
            </Card>
            <Card className="glass-card border-white/20">
              <CardContent className="p-4 text-center">
                <Building2 className="w-6 h-6 text-white mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{systemStats.totalCompanies.toLocaleString()}</div>
                <div className="text-white/80 text-sm">Companies</div>
              </CardContent>
            </Card>
            <Card className="glass-card border-white/20">
              <CardContent className="p-4 text-center">
                <Briefcase className="w-6 h-6 text-white mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{systemStats.totalInternships.toLocaleString()}</div>
                <div className="text-white/80 text-sm">Internships</div>
              </CardContent>
            </Card>
            <Card className="glass-card border-white/20">
              <CardContent className="p-4 text-center">
                <GraduationCap className="w-6 h-6 text-white mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{systemStats.aspirationalStudents.toLocaleString()}</div>
                <div className="text-white/80 text-sm">Aspirational</div>
              </CardContent>
            </Card>
            <Card className="glass-card border-white/20">
              <CardContent className="p-4 text-center">
                <Clock className="w-6 h-6 text-white mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{systemStats.activeApplications.toLocaleString()}</div>
                <div className="text-white/80 text-sm">Applications</div>
              </CardContent>
            </Card>
            <Card className="glass-card border-white/20">
              <CardContent className="p-4 text-center">
                <CheckCircle className="w-6 h-6 text-white mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{systemStats.successfulMatches.toLocaleString()}</div>
                <div className="text-white/80 text-sm">Matches</div>
              </CardContent>
            </Card>
            <Card className="glass-card border-white/20">
              <CardContent className="p-4 text-center">
                <Target className="w-6 h-6 text-white mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{systemStats.matchScore}%</div>
                <div className="text-white/80 text-sm">Match Score</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* AI Matching Engine Control Panel */}
              <Card className="glass-card border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center text-2xl">
                    <Zap className="w-6 h-6 mr-3" />
                    AI Smart Allocation Engine
                  </CardTitle>
                  <CardDescription className="text-white/80">
                    Configure and run the intelligent matching algorithm
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Pre-Match Summary */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-white/5 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">5,000</div>
                      <div className="text-white/80 text-sm">Students Ready</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">4,800</div>
                      <div className="text-white/80 text-sm">Available Slots</div>
                    </div>
                  </div>

                  {/* Algorithm Configuration */}
                  <div className="space-y-6">
                    <h3 className="text-white font-semibold text-lg">Algorithm Configuration</h3>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-white mb-2 block">Skills Match Weight: {skillsWeight[0]}%</Label>
                        <Slider
                          value={skillsWeight}
                          onValueChange={setSkillsWeight}
                          max={100}
                          step={5}
                          className="w-full"
                        />
                      </div>

                      <div>
                        <Label className="text-white mb-2 block">
                          Location Preference Weight: {locationWeight[0]}%
                        </Label>
                        <Slider
                          value={locationWeight}
                          onValueChange={setLocationWeight}
                          max={100}
                          step={5}
                          className="w-full"
                        />
                      </div>

                      <div>
                        <Label className="text-white mb-2 block">
                          First-Time Participant Boost: {firstTimeBoost[0]}%
                        </Label>
                        <Slider
                          value={firstTimeBoost}
                          onValueChange={setFirstTimeBoost}
                          max={50}
                          step={5}
                          className="w-full"
                        />
                      </div>

                      <div>
                        <Label className="text-white mb-2 block">Affirmative Action Boost: {diversityBoost[0]}%</Label>
                        <Slider
                          value={diversityBoost}
                          onValueChange={setDiversityBoost}
                          max={50}
                          step={5}
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="prioritizeRural" />
                      <Label htmlFor="prioritizeRural" className="text-white">
                        Prioritize Rural/Aspirational District Candidates
                      </Label>
                    </div>
                  </div>

                  {/* The Big Red Button */}
                  <div className="text-center py-6">
                    {!matchingComplete ? (
                      <Button
                        onClick={runMatching}
                        disabled={isMatching}
                        className="bg-red-600 hover:bg-red-700 text-white text-xl px-12 py-6 rounded-xl shadow-2xl animate-glow"
                        size="lg"
                      >
                        {isMatching ? (
                          <>
                            <Clock className="w-6 h-6 mr-3 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Play className="w-6 h-6 mr-3" />🚀 Run AI Smart Allocation
                          </>
                        )}
                      </Button>
                    ) : (
                      <div className="space-y-4">
                        <div className="text-green-400 text-2xl font-bold flex items-center justify-center">
                          <CheckCircle className="w-8 h-8 mr-3" />✅ Matching Complete!
                        </div>
                        <div className="text-white text-lg">Successfully placed 4,500 out of 5,000 students.</div>
                        <div className="text-white/80">Overall Match Score: 88%</div>
                        <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                          <Download className="w-4 h-4 mr-2" />
                          View Detailed Allocation Report
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Progress Bar */}
                  {isMatching && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-white text-sm">
                        <span>Processing Applications...</span>
                        <span>{Math.round(matchingProgress)}%</span>
                      </div>
                      <Progress value={matchingProgress} className="h-3" />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* System Analytics */}
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-white/10 border border-white/20">
                  <TabsTrigger
                    value="overview"
                    className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="matches"
                    className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
                  >
                    Recent Matches
                  </TabsTrigger>
                  <TabsTrigger
                    value="locations"
                    className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
                  >
                    By Location
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4 mt-6">
                  <Card className="glass-card border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white">Platform Performance</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white/5 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white/80">Success Rate</span>
                            <TrendingUp className="w-4 h-4 text-green-400" />
                          </div>
                          <div className="text-2xl font-bold text-white">94.2%</div>
                          <div className="text-green-400 text-sm">+2.1% from last month</div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white/80">Avg. Processing Time</span>
                            <Clock className="w-4 h-4 text-blue-400" />
                          </div>
                          <div className="text-2xl font-bold text-white">2.3 min</div>
                          <div className="text-blue-400 text-sm">-0.5 min improvement</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-white mb-1">
                            <span>Student Satisfaction</span>
                            <span>92%</span>
                          </div>
                          <Progress value={92} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-white mb-1">
                            <span>Company Satisfaction</span>
                            <span>89%</span>
                          </div>
                          <Progress value={89} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-white mb-1">
                            <span>System Uptime</span>
                            <span>99.8%</span>
                          </div>
                          <Progress value={99.8} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="matches" className="space-y-4 mt-6">
                  <Card className="glass-card border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white">Latest AI Matches</CardTitle>
                      <CardDescription className="text-white/80">
                        Most recent successful matches from the AI engine
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {recentMatches.map((match, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                            <div>
                              <div className="text-white font-medium">{match.student}</div>
                              <div className="text-white/70 text-sm">
                                {match.company} • {match.role}
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                                {match.score}% Match
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="locations" className="space-y-4 mt-6">
                  <Card className="glass-card border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white">Location-wise Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {locationStats.map((location, index) => (
                          <div key={index} className="p-4 bg-white/5 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 text-white mr-2" />
                                <span className="text-white font-medium">{location.location}</span>
                              </div>
                              <Badge variant="secondary" className="bg-white/20 text-white">
                                {Math.round((location.matches / location.students) * 100)}% Success
                              </Badge>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <div className="text-white/70">Students</div>
                                <div className="text-white font-medium">{location.students.toLocaleString()}</div>
                              </div>
                              <div>
                                <div className="text-white/70">Companies</div>
                                <div className="text-white font-medium">{location.companies}</div>
                              </div>
                              <div>
                                <div className="text-white/70">Matches</div>
                                <div className="text-white font-medium">{location.matches.toLocaleString()}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* System Status */}
              <Card className="glass-card border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    System Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">Database</span>
                    <Badge className="bg-green-500 text-white">Online</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">AI Engine</span>
                    <Badge className="bg-green-500 text-white">Ready</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">API Services</span>
                    <Badge className="bg-green-500 text-white">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">Notifications</span>
                    <Badge className="bg-yellow-500 text-white">Warning</Badge>
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
                    <Users className="w-4 h-4 mr-2" />
                    Manage Users
                  </Button>
                  <Button variant="outline" className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20">
                    <Building2 className="w-4 h-4 mr-2" />
                    Approve Companies
                  </Button>
                  <Button variant="outline" className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Generate Reports
                  </Button>
                  <Button variant="outline" className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                </CardContent>
              </Card>

              {/* Alerts */}
              <Card className="glass-card border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    System Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <div className="text-yellow-300 font-medium text-sm">High Load Detected</div>
                    <div className="text-yellow-200/80 text-xs">Server experiencing high traffic</div>
                  </div>
                  <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <div className="text-blue-300 font-medium text-sm">Maintenance Scheduled</div>
                    <div className="text-blue-200/80 text-xs">System update planned for tonight</div>
                  </div>
                  <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <div className="text-green-300 font-medium text-sm">Backup Complete</div>
                    <div className="text-green-200/80 text-xs">Daily backup finished successfully</div>
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
