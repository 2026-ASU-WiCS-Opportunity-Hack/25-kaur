"use client"

import Link from 'next/link'
import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LayoutDashboard, Users, UserPlus, FileText, LogOut, ClipboardPlus, CalendarDays } from 'lucide-react'
import { AmbientBackdrop } from '@/components/dashboard/ambient-backdrop'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    // Basic Auth Check
    const role = localStorage.getItem("userRole")
    if (!role) {
      router.push("/login")
    }
  }, [router])

  return (
    <div className="relative flex min-h-screen bg-slate-50/80 text-slate-900">
      <AmbientBackdrop />
      {/* Sidebar */}
      <aside className="relative z-20 flex w-64 flex-col border-r border-emerald-100/80 bg-gradient-to-b from-white via-white to-emerald-50/40 p-6 shadow-sm backdrop-blur-sm">
        <div className="mb-8 space-y-1">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#115024]">AIDBRIDGE</h1>
          <p className="text-xs font-semibold tracking-wide text-[#1A6D33]">Empowering Nonprofits. Strengthening Communities.</p>
        </div>
        
        <nav className="space-y-3 flex-1">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-primary/10 hover:text-primary font-medium transition-all duration-200 ease-out hover:scale-105">
            <LayoutDashboard className="h-5 w-5" /> Home
          </Link>
          <Link href="/dashboard/clients" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-primary/10 hover:text-primary font-medium transition-all duration-200 ease-out hover:scale-105">
            <Users className="h-5 w-5" /> Clients & Cases
          </Link>
          <Link href="/dashboard/intake" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-primary/10 hover:text-primary font-medium transition-all duration-200 ease-out hover:scale-105">
            <UserPlus className="h-5 w-5" /> AI Photo Intake
          </Link>
          <Link href="/dashboard/reports" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-primary/10 hover:text-primary font-medium transition-all duration-200 ease-out hover:scale-105">
            <FileText className="h-5 w-5" /> Grant Reports
          </Link>
          <Link href="/dashboard/scheduling" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-primary/10 hover:text-primary font-medium transition-all duration-200 ease-out hover:scale-105">
            <ClipboardPlus className="h-5 w-5" /> Scheduling
          </Link>
          <Link href="/dashboard/calendar" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-primary/10 hover:text-primary font-medium transition-all duration-200 ease-out hover:scale-105">
            <CalendarDays className="h-5 w-5" /> Calendar
          </Link>
        </nav>

        <Link href="/login" className="mt-auto flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium text-red-600 transition-all hover:scale-[1.02] hover:bg-red-50" onClick={() => localStorage.removeItem('userRole')}>
          <LogOut className="h-5 w-5" /> Sign Out
        </Link>
      </aside>
      
      {/* Main Content */}
      <main className="relative z-10 flex min-h-screen flex-1 flex-col overflow-y-auto">
        <div className="flex-1 p-6 md:p-8">{children}</div>
        <footer className="relative z-10 grid grid-cols-2 gap-6 border-t border-emerald-100/60 bg-gradient-to-b from-white to-emerald-50/30 px-6 py-8 text-xs text-slate-500 sm:grid-cols-3 lg:grid-cols-5 md:px-8">
          <div>
            <p className="mb-2 text-sm font-semibold text-slate-900">Features</p>
            <p>Case Management</p>
            <p>AI Intake Forms</p>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold text-slate-900">For Nonprofits</p>
            <p>Small Teams</p>
            <p>Enterprise Agencies</p>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold text-slate-900">Resources</p>
            <p>Help Center</p>
            <p>Community Forum</p>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold text-slate-900">Company</p>
            <p>About Us</p>
            <p>Careers</p>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold text-slate-900">Legal</p>
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
          </div>
        </footer>
      </main>
    </div>
  )
}
