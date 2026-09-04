"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  GraduationCap,
  Building2,
  ArrowRight,
  Users,
  Target,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    document.body.className = document.body.className
      .replace(/default-page-body|home-page-body/g, "")
      .trim();
    document.body.classList.add("home-page-body");

    return () => {
      // Clean up body class when component unmounts
      document.body.classList.remove("home-page-body");
      document.body.classList.add("default-page-body");
    };
  }, []);

  const portals = [
    {
      id: "student",
      title: "Student Portal",
      description:
        "Register, upload resume, and get matched with perfect internships",
      icon: GraduationCap,
      href: "/student/login",
      gradient: "gradient-bg",
      features: ["Resume Auto-fill", "Smart Matching"],
    },
    {
      id: "industry",
      title: "Industry Portal",
      description:
        "Post internships and find the best candidates for your company",
      icon: Building2,
      href: "/industry/login",
      gradient: "gradient-bg-secondary",
      features: [
        "Candidate Matching",
        "Analytics Dashboard",
        "Bulk Operations",
      ],
    },
  ];

  const stats = [
    { label: "Students Registered", value: "50,000+", icon: Users },
    { label: "Companies Partnered", value: "2,500+", icon: Building2 },
    { label: "Successful Matches", value: "45,000+", icon: Target },
    { label: "Match Accuracy", value: "94%", icon: Zap },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-8 sm:pt-12">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full animate-float"></div>
          <div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/4 w-64 h-64 bg-white/5 rounded-full animate-float"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>

        <div className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/10"></div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto w-full">
          <div className="mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white text-balance">
              <span>AI-Powered Internship</span>
              <span className="block bg-linear-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Allocating Platform
              </span>
            </h1>
          </div>

          <div className="mb-6 sm:mb-10">
            <p className="text-sm sm:text-lg md:text-xl text-white max-w-3xl mx-auto text-pretty px-4">
              Connecting talented students with industry opportunities through
              intelligent matching, resume auto-fill, and seamless integration
              with Academic Bank of Credits.
            </p>
          </div>

          {/* Stats Grid - Made smaller for mobile */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-10 px-4">
            {stats.map((stat, index) => (
              <Card
                key={stat.label}
                className="glass-card border-white/20 text-center group hover:scale-105 transition-all duration-300"
              >
                <CardContent className="p-2 sm:p-4">
                  <stat.icon className="w-4 h-4 sm:w-6 sm:h-6 text-white mx-auto mb-1 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-sm sm:text-xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portals Section */}
      <section className="py-8 sm:py-16 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              Choose Your Portal
            </h2>
            <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Access the platform through your dedicated portal with features
              tailored to your needs
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {portals.map((portal) => (
              <Card
                key={portal.id}
                className={`relative overflow-hidden border-0 shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer group ${portal.gradient}`}
                onMouseEnter={() => setHoveredCard(portal.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="absolute inset-0 bg-black/20"></div>
                <CardHeader className="relative z-10 text-center pb-3">
                  <div className="mx-auto mb-3 p-2 sm:p-3 bg-white/20 rounded-2xl w-fit group-hover:bg-white/30 transition-all duration-300">
                    <portal.icon className="w-6 h-6 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl font-bold text-white mb-2">
                    {portal.title}
                  </CardTitle>
                  <CardDescription className="text-white/90 text-xs sm:text-sm px-2">
                    {portal.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10 pt-0">
                  <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                    {portal.features.map((feature, index) => (
                      <div
                        key={feature}
                        className={`flex items-center text-white/90 transition-all duration-300 text-xs sm:text-sm ${
                          hoveredCard === portal.id ? "translate-x-2" : ""
                        }`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        <div className="w-1.5 h-1.5 bg-white rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Link href={portal.href}>
                    <Button
                      className="w-full bg-black/50 hover:bg-black/60 text-white border-white/30 hover:border-white/50 transition-all duration-300 text-xs sm:text-sm backdrop-blur-sm"
                      variant="outline"
                    >
                      Enter Portal
                      <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 sm:py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">
            Powered by Advanced Technology
          </h2>
          <p className="text-sm sm:text-lg text-muted-foreground mb-6 sm:mb-10 max-w-3xl mx-auto px-4">
            Our platform leverages cutting-edge AI and seamless integrations to
            provide the best internship matching experience
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                title: "Resume Auto-fill",
                description:
                  "Upload your resume and watch as our AI extracts and fills all relevant information automatically",
                icon: "📄",
              },
              {
                title: "Smart Matching",
                description:
                  "Our AI engine considers skills, preferences, and qualifications for perfect matches",
                icon: "🤖",
              },
              {
                title: "Real-time Analytics",
                description:
                  "Track application status, match scores, and platform statistics in real-time",
                icon: "📊",
              },
              {
                title: "Secure & Compliant",
                description:
                  "Enterprise-grade security with full compliance to data protection regulations",
                icon: "🔒",
              },
              {
                title: "Mobile Responsive",
                description:
                  "Access the platform seamlessly across all devices with our responsive design",
                icon: "📱",
              },
            ].map((feature, index) => (
              <Card
                key={feature.title}
                className="glass-card-white hover:shadow-xl transition-all duration-300 group"
              >
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="text-2xl sm:text-3xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-sm sm:text-lg font-semibold text-foreground mb-1 sm:mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-white py-8 sm:py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <span className="font-bold text-sm sm:text-lg">InternSync</span>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm">
                AI-powered platform for intelligent internship allocation and
                matching.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
                Quick Links
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <Link
                    href="/student/login"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Student Portal
                  </Link>
                </li>
                <li>
                  <Link
                    href="/industry/login"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Industry Portal
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
                Support
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <Link
                    href="/help"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
                Contact Info
              </h4>
              <div className="space-y-2 text-xs sm:text-sm text-gray-300">
                <p>InternSync Platform</p>
                <p>Email: support@internsync.com</p>
                <p>Helpline: 1800-XXX-XXXX</p>
                <p>Available 24/7</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-gray-300">
            <p>&copy; 2024 InternSync Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
