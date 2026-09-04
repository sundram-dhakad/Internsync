"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Building2, Globe, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

type Company = {
  name: string;
  sector: string | null;
  company_size: string | null;
  description: string | null;
  website: string | null;
  office_address: string | null;
  contact_email: string | null;
};

type Internship = {
  id: number;
  title: string;
  department: string | null;
  location: string | null;
  work_mode: string | null;
  duration_months: number | null;
  stipend: number | null;
  description: string | null;
  required_skills: string[];
};

export default function CompanyProfilePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>(null);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase || !params.id) return;
    const client = supabase;
    const loadCompany = async () => {
      const [
        { data: companyData, error: companyError },
        { data: internshipData, error: internshipError },
      ] = await Promise.all([
        client
          .from("companies")
          .select(
            "name, sector, company_size, description, website, office_address, contact_email",
          )
          .eq("id", params.id)
          .maybeSingle(),
        client
          .from("internships")
          .select(
            "id, title, department, location, work_mode, duration_months, stipend, description, required_skills",
          )
          .eq("company_id", params.id)
          .eq("status", "Active")
          .order("created_at", { ascending: false }),
      ]);
      if (companyError || internshipError) {
        setError(
          companyError?.message ??
            internshipError?.message ??
            "Unable to load company profile.",
        );
        return;
      }
      if (!companyData) {
        setError("Company profile not found.");
        return;
      }
      setCompany(companyData as Company);
      setInternships((internshipData ?? []) as Internship[]);
    };
    void loadCompany();
  }, [params.id]);

  if (error)
    return (
      <main className="min-h-screen pt-20 gradient-bg flex items-center justify-center p-6 text-white">
        {error}
      </main>
    );
  if (!company)
    return (
      <main className="min-h-screen pt-20 gradient-bg flex items-center justify-center p-6 text-white">
        Loading company profile...
      </main>
    );

  return (
    <main className="min-h-screen pt-20 gradient-bg px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="text-white hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <Card className="glass-card border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-3xl text-white">
              <Building2 className="h-7 w-7" />
              {company.name}
            </CardTitle>
            <CardDescription className="flex flex-wrap gap-4 text-white/75">
              {company.sector && <span>{company.sector}</span>}
              {company.company_size && <span>{company.company_size}</span>}
              {company.office_address && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {company.office_address}
                </span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-white/85">
            <p className="whitespace-pre-line">
              {company.description ??
                "This company has not added a description yet."}
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-blue-200 hover:text-white"
                >
                  <Globe className="h-4 w-4" />
                  Visit website
                </a>
              )}
              {company.contact_email && <span>{company.contact_email}</span>}
            </div>
          </CardContent>
        </Card>
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Open internships
          </h2>
          <div className="space-y-4">
            {internships.length === 0 ? (
              <p className="text-white/75">
                No active internships are currently listed.
              </p>
            ) : (
              internships.map((internship) => (
                <Card
                  key={internship.id}
                  className="glass-card border-white/20"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {internship.title}
                        </h3>
                        <p className="text-white/70">
                          {internship.department ?? "Internship"}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 text-sm text-white/75">
                        {internship.location && (
                          <span>{internship.location}</span>
                        )}
                        {internship.work_mode && (
                          <span>{internship.work_mode}</span>
                        )}
                      </div>
                    </div>
                    {internship.description && (
                      <p className="mt-3 text-white/80">
                        {internship.description}
                      </p>
                    )}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {(internship.required_skills ?? []).map((skill) => (
                        <Badge key={skill} className="bg-white/15 text-white">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </section>
        <Link href="/student/dashboard">
          <Button className="bg-white text-primary hover:bg-white/90">
            Browse all internships
          </Button>
        </Link>
      </div>
    </main>
  );
}
