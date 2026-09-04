"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, GraduationCap, Building2 } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/student/login", label: "Student Portal", icon: GraduationCap },
    { href: "/industry/login", label: "Industry Portal", icon: Building2 },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 nav-glass border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-10">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-white rounded-lg flex items-center justify-center">
              <GraduationCap className="w-3 h-3 text-primary" />
            </div>
            <span className="text-white font-bold text-sm sm:text-base">InternMatch</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-1 text-white hover:text-blue-200 transition-colors duration-200 text-xs"
              >
                <item.icon className="w-3 h-3" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:bg-white/20 h-6 w-6 p-0"
            >
              {isOpen ? <X className="w-3 h-3" /> : <Menu className="w-3 h-3" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-black/40 backdrop-blur-md rounded-lg mt-1 p-2 border border-white/20">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200 block text-xs"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-3 h-3" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
