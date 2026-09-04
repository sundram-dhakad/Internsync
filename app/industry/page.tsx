"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Building2, FileText, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";

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
];

const companySizes = [
  ["startup", "Startup (1-50 employees)"],
  ["small", "Small (51-200 employees)"],
  ["medium", "Medium (201-1000 employees)"],
  ["large", "Large (1000+ employees)"],
];

export default function IndustryPortal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get("mode") === "edit";
  const [companySector, setCompanySector] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState<string | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isEditMode || !supabase) return;
    const client = supabase;
    void client.auth.getSession().then(async ({ data: sessionData }) => {
      const user = sessionData.session?.user;
      if (!user) return router.replace("/industry/login");
      const { data: company } = await client
        .from("companies")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();
      if (!company) return;
      const values: Record<string, string> = {
        companyName: company.name ?? "",
        registrationNumber: company.registration_number ?? "",
        companyDescription: company.description ?? "",
        website: company.website ?? "",
        contactName: company.contact_name ?? "",
        designation: company.designation ?? "",
        contactEmail: company.contact_email ?? user.email ?? "",
        contactPhone: company.contact_phone ?? "",
        officeAddress: company.office_address ?? "",
      };
      Object.entries(values).forEach(([id, value]) => {
        const input = document.getElementById(id) as
          | HTMLInputElement
          | HTMLTextAreaElement
          | null;
        if (input) input.value = value;
      });
      setCompanySector(company.sector ?? "");
      setCompanySize(company.company_size ?? "");
    });
  }, [isEditMode, router]);

  const getInputValue = (id: string) =>
    (
      document.getElementById(id) as
        | HTMLInputElement
        | HTMLTextAreaElement
        | null
    )?.value.trim() ?? "";

  const handleRegistration = async () => {
    setRegistrationStatus(null);
    if (!supabase) {
      setRegistrationStatus(
        "Supabase is not configured. Add the variables from .env.example to .env.local.",
      );
      return;
    }

    const { data: sessionData } = await supabase.auth.getSession();
    const companyName = getInputValue("companyName");
    const contactEmail =
      getInputValue("contactEmail") || sessionData.session?.user.email || "";
    const password = getInputValue("companyPassword");
    const confirmPassword = getInputValue("confirmCompanyPassword");
    const missingFields = [
      !companyName && "Company Name",
      !contactEmail && "Contact Email",
      !sessionData.session && !isEditMode && !password && "Account Password",
      !sessionData.session &&
        !isEditMode &&
        !confirmPassword &&
        "Confirm Password",
      !companySector && "Industry Sector",
    ].filter(Boolean) as string[];

    if (missingFields.length > 0) {
      setRegistrationStatus(`Please complete: ${missingFields.join(", ")}.`);
      return;
    }

    if (!sessionData.session && !isEditMode && password !== confirmPassword) {
      setRegistrationStatus("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    let user = sessionData.session?.user;
    if (!user) {
      const { data, error } = await supabase.auth.signUp({
        email: contactEmail,
        password,
        options: { data: { role: "industry", full_name: companyName } },
      });
      if (error || !data.user) {
        setIsSubmitting(false);
        setRegistrationStatus(
          error?.message ?? "Unable to create the company account.",
        );
        return;
      }
      if (!data.session) {
        setIsSubmitting(false);
        setRegistrationStatus(
          "Account created. Check your email to verify your account, then sign in and register the company.",
        );
        return;
      }
      user = data.user;
    }

    const { error: profileError } = await supabase.from("profiles").upsert({
      id: user.id,
      role: "industry",
      full_name: companyName,
    });
    const { error: companyError } = await supabase.from("companies").upsert({
      id: user.id,
      name: companyName,
      registration_number: getInputValue("registrationNumber") || null,
      sector: companySector,
      company_size: companySize || null,
      description: getInputValue("companyDescription") || null,
      website: getInputValue("website") || null,
      contact_name: getInputValue("contactName") || null,
      designation: getInputValue("designation") || null,
      contact_email: contactEmail,
      contact_phone: getInputValue("contactPhone") || null,
      office_address: getInputValue("officeAddress") || null,
    });

    setIsSubmitting(false);
    if (profileError || companyError) {
      setRegistrationStatus(
        profileError?.message ??
          companyError?.message ??
          "Unable to save the company.",
      );
      return;
    }
    router.push("/industry/dashboard");
  };

  return (
    <div className="min-h-screen pt-20 gradient-bg-secondary">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Industry Partner Registration
            </h1>
            <p className="text-white/90 text-lg">
              Register your company to access the InternSync platform
            </p>
          </div>

          <Card className="glass-card border-white/20 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">
                Company Information
              </CardTitle>
              <CardDescription className="text-white/80">
                Fields marked with * are required
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <Card className="glass-card border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Building2 className="w-5 h-5 mr-2" />
                    Company Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-white">
                        Company Name *
                      </Label>
                      <Input
                        id="companyName"
                        placeholder="Enter your company name"
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="registrationNumber"
                        className="text-white"
                      >
                        Registration Number
                      </Label>
                      <Input
                        id="registrationNumber"
                        placeholder="Company registration number"
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Industry Sector *</Label>
                      <Select
                        value={companySector}
                        onValueChange={setCompanySector}
                      >
                        <SelectTrigger className="bg-white/10 border-white/30 text-white">
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {sectors.map((sector) => (
                            <SelectItem key={sector} value={sector}>
                              {sector}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Company Size</Label>
                      <Select
                        value={companySize}
                        onValueChange={setCompanySize}
                      >
                        <SelectTrigger className="bg-white/10 border-white/30 text-white">
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                        <SelectContent>
                          {companySizes.map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
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
                      placeholder="Describe your company and mission"
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
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

              <Card className="glass-card border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">
                    Contact Information
                  </CardTitle>
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
                        placeholder="e.g., HR Manager"
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail" className="text-white">
                        Email Address *
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
                    {!isEditMode && (
                      <>
                        <div className="space-y-2">
                          <Label
                            htmlFor="companyPassword"
                            className="text-white"
                          >
                            Account Password *
                          </Label>
                          <Input
                            id="companyPassword"
                            type="password"
                            minLength={6}
                            placeholder="Create a password"
                            className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="confirmCompanyPassword"
                            className="text-white"
                          >
                            Confirm Password *
                          </Label>
                          <Input
                            id="confirmCompanyPassword"
                            type="password"
                            minLength={6}
                            placeholder="Confirm your password"
                            className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                          />
                        </div>
                      </>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="officeAddress" className="text-white">
                      Office Address
                    </Label>
                    <Textarea
                      id="officeAddress"
                      placeholder="Complete office address"
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Company Documents
                  </CardTitle>
                  <CardDescription className="text-white/80">
                    Documents can be uploaded after registration.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    disabled
                    className="h-20 bg-white/10 border-white/30 text-white flex-col"
                  >
                    <Upload className="w-6 h-6 mb-1" />
                    Registration Certificate
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    disabled
                    className="h-20 bg-white/10 border-white/30 text-white flex-col"
                  >
                    <Upload className="w-6 h-6 mb-1" />
                    GST Certificate
                  </Button>
                </CardContent>
              </Card>

              {registrationStatus && (
                <p className="text-sm text-white" role="alert">
                  {registrationStatus}
                </p>
              )}
              <div className="flex justify-end">
                <Button
                  onClick={handleRegistration}
                  disabled={isSubmitting}
                  className="bg-white text-primary hover:bg-white/90 px-8"
                >
                  {isSubmitting ? "Registering..." : "Register"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
