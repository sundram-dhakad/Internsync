"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Building2,
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  MapPin,
  Search,
  Star,
  User,
  X,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Internship {
  id: number;
  title: string;
  department: string | null;
  location: string | null;
  work_mode: string | null;
  duration_months: number | null;
  stipend: number | null;
  description: string | null;
  capacity: number;
  required_skills: string[];
  minimum_degree: string | null;
  field_of_study: string | null;
  minimum_gpa: string | null;
  graduation_year_range: string | null;
  created_at: string;
  companies: { id: string; name: string } | null;
}

interface Application {
  id: number;
  status: string;
  created_at: string;
  internships: Internship | null;
}

export default function StudentDashboard() {
  const [studentName, setStudentName] = useState("Student");
  const [applications, setApplications] = useState<Application[]>([]);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [applyingId, setApplyingId] = useState<number | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const loadDashboard = async () => {
    if (!supabase) {
      setStatus("Supabase is not configured.");
      setIsLoading(false);
      return;
    }
    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData.session?.user;
    if (!user) {
      setStatus("Please sign in as a student to view this dashboard.");
      setIsLoading(false);
      return;
    }
    setStudentName(
      user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? "Student",
    );
    const [
      { data: applicationData, error: applicationError },
      { data: internshipData, error: internshipError },
    ] = await Promise.all([
      supabase
        .from("applications")
        .select(
          "id, status, created_at, internships(id, title, department, location, work_mode, duration_months, stipend, description, capacity, required_skills, minimum_degree, field_of_study, minimum_gpa, graduation_year_range, created_at, companies(id, name))",
        )
        .eq("student_id", user.id)
        .order("created_at", { ascending: false }),
      supabase
        .from("internships")
        .select(
          "id, title, department, location, work_mode, duration_months, stipend, description, capacity, required_skills, minimum_degree, field_of_study, minimum_gpa, graduation_year_range, created_at, companies(id, name)",
        )
        .eq("status", "Active")
        .order("created_at", { ascending: false }),
    ]);
    if (applicationError || internshipError) {
      setStatus(
        applicationError?.message ??
          internshipError?.message ??
          "Unable to load student data.",
      );
      setIsLoading(false);
      return;
    }
    setApplications((applicationData ?? []) as unknown as Application[]);
    setInternships((internshipData ?? []) as unknown as Internship[]);
    setIsLoading(false);
  };

  useEffect(() => {
    void loadDashboard();
  }, []);

  const apply = async (internshipId: number) => {
    if (!supabase) return;
    const { data } = await supabase.auth.getSession();
    const user = data.session?.user;
    if (!user) {
      setStatus("Please sign in before applying.");
      return;
    }
    setApplyingId(internshipId);
    setStatus(null);
    const { error } = await supabase
      .from("applications")
      .insert({ internship_id: internshipId, student_id: user.id });
    setApplyingId(null);
    if (error) {
      setStatus(
        error.code === "23505"
          ? "You have already applied for this internship."
          : error.message,
      );
      return;
    }
    setStatus("Application submitted successfully.");
    await loadDashboard();
  };

  const appliedIds = new Set(
    applications
      .map((application) => application.internships?.id)
      .filter(Boolean),
  );
  const filteredInternships = internships.filter((internship) =>
    `${internship.title} ${internship.department ?? ""} ${internship.location ?? ""} ${internship.companies?.name ?? ""}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );
  const statusColor = (value: string) =>
    value === "Shortlisted"
      ? "bg-green-500"
      : value === "Rejected"
        ? "bg-red-500"
        : "bg-yellow-500";

  if (isLoading)
    return (
      <div className="min-h-screen pt-20 gradient-bg flex items-center justify-center text-white">
        Loading dashboard...
      </div>
    );
  return (
    <div className="min-h-screen pt-20 gradient-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, {studentName}
            </h1>
            <p className="text-white/80 text-lg">
              Discover internships and track your real applications.
            </p>
          </header>
          {status && (
            <p
              className="mb-6 rounded-lg border border-white/20 bg-white/10 p-3 text-white"
              role="alert"
            >
              {status}
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="glass-card border-white/20">
              <CardContent className="p-6 text-center">
                <Briefcase className="w-8 h-8 text-white mx-auto mb-2" />
                <div className="text-3xl font-bold text-white">
                  {applications.length}
                </div>
                <div className="text-white/80">Applications</div>
              </CardContent>
            </Card>
            <Card className="glass-card border-white/20">
              <CardContent className="p-6 text-center">
                <Search className="w-8 h-8 text-white mx-auto mb-2" />
                <div className="text-3xl font-bold text-white">
                  {internships.length}
                </div>
                <div className="text-white/80">Open Internships</div>
              </CardContent>
            </Card>
            <Card className="glass-card border-white/20">
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-8 h-8 text-white mx-auto mb-2" />
                <div className="text-3xl font-bold text-white">
                  {
                    applications.filter(
                      (application) => application.status === "Shortlisted",
                    ).length
                  }
                </div>
                <div className="text-white/80">Shortlisted</div>
              </CardContent>
            </Card>
          </div>
          <Tabs defaultValue="browse" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/10 border border-white/20">
              <TabsTrigger value="browse" className="text-white">
                Browse Internships
              </TabsTrigger>
              <TabsTrigger value="applications" className="text-white">
                My Applications
              </TabsTrigger>
            </TabsList>
            <TabsContent value="browse" className="mt-6">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 w-4 h-4" />
                <Input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search by role, company, or location"
                  className="pl-10 bg-white/10 border-white/30 text-white placeholder:text-white/50"
                />
              </div>
              <div className="space-y-4">
                {filteredInternships.length === 0 ? (
                  <Card className="glass-card border-white/20">
                    <CardContent className="p-8 text-center text-white/75">
                      No active internships match your search.
                    </CardContent>
                  </Card>
                ) : (
                  filteredInternships.map((internship) => (
                    <Card
                      key={internship.id}
                      className="glass-card border-white/20"
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                          <div>
                            <h2 className="text-xl font-semibold text-white">
                              {internship.title}
                            </h2>
                            <p className="text-white/80 flex items-center gap-1 mt-1">
                              <Building2 className="w-4 h-4" />
                              {internship.companies?.name ?? "Company"}
                            </p>
                            <div className="flex flex-wrap gap-4 mt-3 text-sm text-white/70">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {internship.location ?? "Flexible"}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {internship.duration_months
                                  ? `${internship.duration_months} months`
                                  : "Flexible duration"}
                              </span>
                              <span>₹{internship.stipend ?? 0}/month</span>
                            </div>
                          </div>
                          <Button
                            disabled={
                              appliedIds.has(internship.id) ||
                              applyingId === internship.id
                            }
                            onClick={() => void apply(internship.id)}
                            className="bg-white text-primary hover:bg-white/90"
                          >
                            {appliedIds.has(internship.id)
                              ? "Applied"
                              : applyingId === internship.id
                                ? "Applying..."
                                : "Apply Now"}
                          </Button>
                        </div>
                        {internship.description && (
                          <p className="text-white/75 mt-4">
                            {internship.description}
                          </p>
                        )}
                        <div className="mt-4 border-t border-white/15 pt-4">
                          <h3 className="text-sm font-semibold text-white mb-2">
                            Requirements
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {internship.required_skills?.length ? (
                              internship.required_skills.map((skill) => (
                                <Badge
                                  key={skill}
                                  className="bg-white/15 text-white"
                                >
                                  {skill}
                                </Badge>
                              ))
                            ) : (
                              <span className="text-sm text-white/60">
                                No specific skills listed
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-white/75 mt-3">
                            {[
                              internship.minimum_degree,
                              internship.field_of_study,
                              internship.minimum_gpa &&
                                `Minimum GPA: ${internship.minimum_gpa}`,
                              internship.graduation_year_range,
                            ]
                              .filter(Boolean)
                              .join(" • ") ||
                              "No academic qualification specified"}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
            <TabsContent value="browse" className="mt-6">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 w-4 h-4" />
                <Input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search by role, company, or location"
                  className="pl-10 bg-white/10 border-white/30 text-white placeholder:text-white/50"
                />
              </div>
              <div className="space-y-4">
                {filteredInternships.length === 0 ? (
                  <Card className="glass-card border-white/20">
                    <CardContent className="p-8 text-center text-white/75">
                      No active internships match your search.
                    </CardContent>
                  </Card>
                ) : (
                  filteredInternships.map((internship) => (
                    <Card
                      key={internship.id}
                      className="glass-card border-white/20"
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                          <div>
                            <h2 className="text-xl font-semibold text-white">
                              {internship.title}
                            </h2>
                            <Link
                              href={
                                internship.companies?.id
                                  ? `/companies/${internship.companies.id}`
                                  : "#"
                              }
                              className="text-white/80 flex items-center gap-1 mt-1 hover:text-white"
                            >
                              <Building2 className="w-4 h-4" />
                              {internship.companies?.name ?? "Company"}
                            </Link>
                            <div className="flex flex-wrap gap-4 mt-3 text-sm text-white/70">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {internship.location ?? "Flexible"}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {internship.duration_months
                                  ? `${internship.duration_months} months`
                                  : "Flexible duration"}
                              </span>
                              <span>₹{internship.stipend ?? 0}/month</span>
                            </div>
                          </div>
                          <Button
                            disabled={
                              appliedIds.has(internship.id) ||
                              applyingId === internship.id
                            }
                            onClick={() => void apply(internship.id)}
                            className="bg-white text-primary hover:bg-white/90"
                          >
                            {appliedIds.has(internship.id)
                              ? "Applied"
                              : applyingId === internship.id
                                ? "Applying..."
                                : "Apply Now"}
                          </Button>
                        </div>
                        {internship.description && (
                          <p className="text-white/75 mt-4">
                            {internship.description}
                          </p>
                        )}
                        <div className="mt-4 border-t border-white/15 pt-4">
                          <h3 className="text-sm font-semibold text-white mb-2">
                            Requirements
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {internship.required_skills?.length ? (
                              internship.required_skills.map((skill) => (
                                <Badge
                                  key={skill}
                                  className="bg-white/15 text-white"
                                >
                                  {skill}
                                </Badge>
                              ))
                            ) : (
                              <span className="text-white/60 text-sm">
                                No specific skills listed.
                              </span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
            <TabsContent value="applications" className="mt-6">
              <div className="space-y-4">
                {applications.length === 0 ? (
                  <Card className="glass-card border-white/20">
                    <CardContent className="p-8 text-center text-white/75">
                      You have not applied to any internships yet.
                    </CardContent>
                  </Card>
                ) : (
                  applications.map((application) => (
                    <Card
                      key={application.id}
                      className="glass-card border-white/20"
                    >
                      <CardContent className="p-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
                        <div>
                          <h2 className="text-xl font-semibold text-white">
                            {application.internships?.title ?? "Internship"}
                          </h2>
                          <p className="text-white/75 flex items-center gap-1">
                            <Building2 className="w-4 h-4" />
                            {application.internships?.companies?.name ??
                              "Company"}
                          </p>
                          <p className="text-white/60 text-sm mt-2">
                            Applied{" "}
                            {new Date(
                              application.created_at,
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge
                          className={`${statusColor(application.status)} text-white h-fit`}
                        >
                          {application.status}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
          <Card className="glass-card border-white/20 mt-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile
              </CardTitle>
              <CardDescription className="text-white/80">
                Your account is connected to Supabase. Profile editing will use
                your saved student data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => (window.location.href = "/student?mode=edit")}
                className="bg-white text-primary hover:bg-white/90"
              >
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
