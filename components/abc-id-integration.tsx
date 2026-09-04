"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CreditCard, CheckCircle, AlertCircle, Loader2, X, Shield, GraduationCap, Award } from "lucide-react"

interface ABCCredentials {
  abcId: string
  password: string
}

interface ABCAcademicData {
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    dateOfBirth: string
    address: string
    city: string
    state: string
    pincode: string
  }
  education: {
    university: string
    degree: string
    gpa: string
    graduationYear: string
    semester: string
    credits: number
    specialization: string
  }
  achievements: {
    certifications: string[]
    awards: string[]
    projects: string[]
  }
  skills: string[]
}

interface ABCIntegrationProps {
  onDataImported: (data: ABCAcademicData) => void
}

export function ABCIntegration({ onDataImported }: ABCIntegrationProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [connectionProgress, setConnectionProgress] = useState(0)
  const [importProgress, setImportProgress] = useState(0)
  const [credentials, setCredentials] = useState<ABCCredentials>({ abcId: "", password: "" })
  const [connectionComplete, setConnectionComplete] = useState(false)
  const [importComplete, setImportComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [importedData, setImportedData] = useState<ABCAcademicData | null>(null)
  const [showCredentials, setShowCredentials] = useState(false)

  const handleConnect = async () => {
    if (!credentials.abcId || !credentials.password) {
      setError("Please enter both ABC ID and password")
      return
    }

    // Validate ABC ID format (12 digits)
    if (!/^\d{12}$/.test(credentials.abcId)) {
      setError("ABC ID must be 12 digits")
      return
    }

    setIsConnecting(true)
    setError(null)
    setConnectionProgress(0)

    // Simulate ABC ID authentication
    const connectionInterval = setInterval(() => {
      setConnectionProgress((prev) => {
        if (prev >= 100) {
          clearInterval(connectionInterval)
          setIsConnecting(false)
          setConnectionComplete(true)
          return 100
        }
        return prev + Math.random() * 25
      })
    }, 300)
  }

  const handleImportData = async () => {
    setIsImporting(true)
    setImportProgress(0)

    // Simulate data import from ABC system
    const importInterval = setInterval(() => {
      setImportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(importInterval)
          setIsImporting(false)

          // Mock ABC data (in real implementation, this would come from ABC API)
          const mockABCData: ABCAcademicData = {
            personalInfo: {
              firstName: "Rahul",
              lastName: "Patel",
              email: "rahul.patel@student.edu.in",
              phone: "+91 87654 32109",
              dateOfBirth: "2002-03-15",
              address: "456 University Road, Sector 12",
              city: "Surat",
              state: "Gujarat",
              pincode: "395007",
            },
            education: {
              university: "National Institute of Technology Surat",
              degree: "B.Tech Information Technology",
              gpa: "8.5 CGPA",
              graduationYear: "2025",
              semester: "6th Semester",
              credits: 142,
              specialization: "Software Engineering",
            },
            achievements: {
              certifications: ["AWS Cloud Practitioner", "Google Analytics Certified", "Microsoft Azure Fundamentals"],
              awards: [
                "Dean's List 2023",
                "Best Project Award - Smart City Solutions",
                "Hackathon Winner - TechFest 2023",
              ],
              projects: [
                "E-commerce Platform with React & Node.js",
                "IoT-based Smart Home System",
                "Machine Learning Stock Predictor",
              ],
            },
            skills: [
              "Java",
              "Python",
              "React",
              "Node.js",
              "MongoDB",
              "AWS",
              "Machine Learning",
              "Data Structures",
              "Algorithms",
              "Git",
            ],
          }

          setImportedData(mockABCData)
          setImportComplete(true)
          return 100
        }
        return prev + Math.random() * 20
      })
    }, 400)
  }

  const handleAcceptData = () => {
    if (importedData) {
      onDataImported(importedData)
    }
  }

  const handleReset = () => {
    setCredentials({ abcId: "", password: "" })
    setConnectionComplete(false)
    setImportComplete(false)
    setImportedData(null)
    setError(null)
    setConnectionProgress(0)
    setImportProgress(0)
    setShowCredentials(false)
  }

  return (
    <Card className="glass-card border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <CreditCard className="w-5 h-5 mr-2" />
          Academic Bank of Credits Integration
        </CardTitle>
        <CardDescription className="text-white/80">
          Connect your ABC ID to import verified academic records from Government of India
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Information Alert */}
        <Alert className="bg-blue-500/10 border-blue-500/30">
          <Shield className="w-4 h-4 text-blue-400" />
          <AlertDescription className="text-blue-300">
            ABC ID is a secure government system that maintains your academic records. Your credentials are encrypted
            and not stored on our servers.
          </AlertDescription>
        </Alert>

        {error && (
          <Alert className="bg-red-500/10 border-red-500/30">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <AlertDescription className="text-red-300">{error}</AlertDescription>
          </Alert>
        )}

        {!connectionComplete && !showCredentials && (
          <div className="text-center py-8">
            <CreditCard className="w-16 h-16 text-white/70 mx-auto mb-4" />
            <h3 className="text-white font-medium mb-2">Connect to ABC System</h3>
            <p className="text-white/70 text-sm mb-6">
              Import your verified academic records, certifications, and achievements
            </p>
            <Button onClick={() => setShowCredentials(true)} className="bg-white text-primary hover:bg-white/90">
              <Shield className="w-4 h-4 mr-2" />
              Connect ABC ID
            </Button>
          </div>
        )}

        {showCredentials && !connectionComplete && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="abcId" className="text-white">
                ABC ID (12 digits)
              </Label>
              <Input
                id="abcId"
                type="text"
                value={credentials.abcId}
                onChange={(e) => setCredentials((prev) => ({ ...prev, abcId: e.target.value }))}
                placeholder="Enter your 12-digit ABC ID"
                maxLength={12}
                className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="abcPassword" className="text-white">
                Password
              </Label>
              <Input
                id="abcPassword"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
                placeholder="Enter your ABC ID password"
                className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
              />
            </div>

            {isConnecting && (
              <div className="space-y-2">
                <div className="flex justify-between text-white text-sm">
                  <span className="flex items-center">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Connecting to ABC System...
                  </span>
                  <span>{Math.round(connectionProgress)}%</span>
                </div>
                <Progress value={connectionProgress} className="h-2" />
              </div>
            )}

            <div className="flex gap-3">
              <Button
                onClick={handleConnect}
                disabled={isConnecting || !credentials.abcId || !credentials.password}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Connect Securely
                  </>
                )}
              </Button>
              <Button
                onClick={() => setShowCredentials(false)}
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {connectionComplete && !importComplete && (
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
              <span className="text-green-300 font-medium">Successfully connected to ABC System</span>
            </div>

            <div className="text-center py-4">
              <GraduationCap className="w-12 h-12 text-white/70 mx-auto mb-3" />
              <h3 className="text-white font-medium mb-2">Ready to Import Academic Data</h3>
              <p className="text-white/70 text-sm mb-4">
                Import your complete academic profile including courses, grades, and certifications
              </p>

              {isImporting && (
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-white text-sm">
                    <span className="flex items-center">
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Importing academic records...
                    </span>
                    <span>{Math.round(importProgress)}%</span>
                  </div>
                  <Progress value={importProgress} className="h-2" />
                </div>
              )}

              <Button
                onClick={handleImportData}
                disabled={isImporting}
                className="bg-white text-primary hover:bg-white/90"
              >
                {isImporting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Importing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Import Academic Data
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {importComplete && importedData && (
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
              <span className="text-green-300 font-medium">Academic data imported successfully!</span>
            </div>

            <div className="space-y-4">
              {/* Personal Information */}
              <div>
                <h4 className="text-white font-medium mb-2 flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  Personal Information
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm bg-white/5 p-3 rounded-lg">
                  <div className="text-white/70">
                    Name:{" "}
                    <span className="text-white">
                      {importedData.personalInfo.firstName} {importedData.personalInfo.lastName}
                    </span>
                  </div>
                  <div className="text-white/70">
                    Email: <span className="text-white">{importedData.personalInfo.email}</span>
                  </div>
                  <div className="text-white/70">
                    Phone: <span className="text-white">{importedData.personalInfo.phone}</span>
                  </div>
                  <div className="text-white/70">
                    DOB: <span className="text-white">{importedData.personalInfo.dateOfBirth}</span>
                  </div>
                </div>
              </div>

              {/* Education Details */}
              <div>
                <h4 className="text-white font-medium mb-2 flex items-center">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Academic Information
                </h4>
                <div className="bg-white/5 p-3 rounded-lg space-y-2 text-sm">
                  <div className="text-white/70">
                    University: <span className="text-white">{importedData.education.university}</span>
                  </div>
                  <div className="text-white/70">
                    Degree: <span className="text-white">{importedData.education.degree}</span>
                  </div>
                  <div className="text-white/70">
                    Specialization: <span className="text-white">{importedData.education.specialization}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <div className="text-white/70">
                      CGPA: <span className="text-white">{importedData.education.gpa}</span>
                    </div>
                    <div className="text-white/70">
                      Credits: <span className="text-white">{importedData.education.credits}</span>
                    </div>
                    <div className="text-white/70">
                      Semester: <span className="text-white">{importedData.education.semester}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h4 className="text-white font-medium mb-2 flex items-center">
                  <Award className="w-4 h-4 mr-2" />
                  Achievements & Certifications
                </h4>
                <div className="bg-white/5 p-3 rounded-lg space-y-3 text-sm">
                  <div>
                    <div className="text-white/70 mb-1">Certifications:</div>
                    <div className="flex flex-wrap gap-1">
                      {importedData.achievements.certifications.map((cert, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs"
                        >
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-white/70 mb-1">Awards:</div>
                    <div className="flex flex-wrap gap-1">
                      {importedData.achievements.awards.map((award, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 text-xs"
                        >
                          {award}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-white font-medium mb-2">Skills from Academic Records</h4>
                <div className="flex flex-wrap gap-2">
                  {importedData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-white/20 text-white border-white/30">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleAcceptData} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                <CheckCircle className="w-4 h-4 mr-2" />
                Use This Information
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                <X className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          </div>
        )}

        {/* ABC ID Information */}
        {!connectionComplete && (
          <div className="mt-6 p-4 bg-white/5 rounded-lg">
            <h4 className="text-white font-medium mb-2">About ABC ID</h4>
            <ul className="text-white/70 text-sm space-y-1">
              <li>• Academic Bank of Credits is a Government of India initiative</li>
              <li>• Maintains verified academic records from recognized institutions</li>
              <li>• Enables seamless credit transfer between institutions</li>
              <li>• Your data is fetched securely and not stored on our servers</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
