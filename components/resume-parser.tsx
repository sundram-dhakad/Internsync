"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, CheckCircle, AlertCircle, Loader2, X } from "lucide-react"

interface ParsedResumeData {
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
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
  }
  skills: string[]
  experience?: string[]
}

interface ResumeParserProps {
  onDataParsed: (data: ParsedResumeData) => void
}

export function ResumeParser({ onDataParsed }: ResumeParserProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [isParsing, setIsParsing] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [parseProgress, setParseProgress] = useState(0)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [parseComplete, setParseComplete] = useState(false)
  const [parseError, setParseError] = useState<string | null>(null)
  const [parsedData, setParsedData] = useState<ParsedResumeData | null>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]
    if (!allowedTypes.includes(file.type)) {
      setParseError("Please upload a PDF or Word document")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setParseError("File size must be less than 5MB")
      return
    }

    setUploadedFile(file)
    setIsUploading(true)
    setParseError(null)
    setUploadProgress(0)

    // Simulate file upload
    const uploadInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadInterval)
          setIsUploading(false)
          parseResume(file)
          return 100
        }
        return prev + Math.random() * 20
      })
    }, 200)
  }

  const parseResume = async (file: File) => {
    setIsParsing(true)
    setParseProgress(0)

    // Simulate AI parsing process
    const parseInterval = setInterval(() => {
      setParseProgress((prev) => {
        if (prev >= 100) {
          clearInterval(parseInterval)
          setIsParsing(false)

          // Simulate parsed data (in real implementation, this would come from AI service)
          const mockParsedData: ParsedResumeData = {
            personalInfo: {
              firstName: "Priya",
              lastName: "Sharma",
              email: "priya.sharma@email.com",
              phone: "+91 98765 43210",
              address: "123 Tech Street, Sector 15",
              city: "Gurgaon",
              state: "Haryana",
              pincode: "122001",
            },
            education: {
              university: "Indian Institute of Technology Delhi",
              degree: "B.Tech Computer Science and Engineering",
              gpa: "8.9 CGPA",
              graduationYear: "2025",
            },
            skills: [
              "Python",
              "JavaScript",
              "React",
              "Node.js",
              "Machine Learning",
              "Data Structures",
              "Algorithms",
              "Git",
            ],
            experience: [
              "Software Development Intern at TechCorp (Summer 2023)",
              "Web Development Project - E-commerce Platform",
            ],
          }

          setParsedData(mockParsedData)
          setParseComplete(true)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 300)
  }

  const handleAcceptData = () => {
    if (parsedData) {
      onDataParsed(parsedData)
    }
  }

  const handleReject = () => {
    setUploadedFile(null)
    setParseComplete(false)
    setParsedData(null)
    setParseError(null)
    setUploadProgress(0)
    setParseProgress(0)
  }

  return (
    <Card className="glass-card border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          Resume Auto-fill
        </CardTitle>
        <CardDescription className="text-white/80">
          Upload your resume and let AI extract your information automatically
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!uploadedFile && !parseComplete && (
          <div className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center hover:border-white/50 transition-colors">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
              id="resume-upload"
            />
            <label htmlFor="resume-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 text-white/70 mx-auto mb-4" />
              <div className="text-white font-medium mb-2">Click to upload your resume</div>
              <div className="text-white/70 text-sm">PDF, DOC, DOCX up to 5MB</div>
            </label>
          </div>
        )}

        {parseError && (
          <div className="flex items-center p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
            <span className="text-red-300">{parseError}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setParseError(null)}
              className="ml-auto text-red-300 hover:text-red-200"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}

        {uploadedFile && !parseComplete && (
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-white/5 rounded-lg">
              <FileText className="w-5 h-5 text-white mr-3" />
              <div className="flex-1">
                <div className="text-white font-medium">{uploadedFile.name}</div>
                <div className="text-white/70 text-sm">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</div>
              </div>
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-white text-sm">
                  <span>Uploading...</span>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            {isParsing && (
              <div className="space-y-2">
                <div className="flex justify-between text-white text-sm">
                  <span className="flex items-center">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    AI is extracting information...
                  </span>
                  <span>{Math.round(parseProgress)}%</span>
                </div>
                <Progress value={parseProgress} className="h-2" />
              </div>
            )}
          </div>
        )}

        {parseComplete && parsedData && (
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
              <span className="text-green-300 font-medium">Resume parsed successfully!</span>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-white font-medium mb-2">Personal Information</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-white/70">
                    Name:{" "}
                    <span className="text-white">
                      {parsedData.personalInfo.firstName} {parsedData.personalInfo.lastName}
                    </span>
                  </div>
                  <div className="text-white/70">
                    Email: <span className="text-white">{parsedData.personalInfo.email}</span>
                  </div>
                  <div className="text-white/70">
                    Phone: <span className="text-white">{parsedData.personalInfo.phone}</span>
                  </div>
                  <div className="text-white/70">
                    Location:{" "}
                    <span className="text-white">
                      {parsedData.personalInfo.city}, {parsedData.personalInfo.state}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-white font-medium mb-2">Education</h4>
                <div className="text-sm">
                  <div className="text-white/70">
                    University: <span className="text-white">{parsedData.education.university}</span>
                  </div>
                  <div className="text-white/70">
                    Degree: <span className="text-white">{parsedData.education.degree}</span>
                  </div>
                  <div className="text-white/70">
                    GPA: <span className="text-white">{parsedData.education.gpa}</span>
                  </div>
                  <div className="text-white/70">
                    Graduation: <span className="text-white">{parsedData.education.graduationYear}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-white font-medium mb-2">Skills Detected</h4>
                <div className="flex flex-wrap gap-2">
                  {parsedData.skills.map((skill, index) => (
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
                onClick={handleReject}
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                <X className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
