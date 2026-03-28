"use client"

import Link from 'next/link'
import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { HeartPulse, LayoutDashboard, Users, UserPlus, FileText, LogOut } from 'lucide-react'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    // Basic Mock RBAC
    const role = localStorage.getItem("userRole")
    if (!role) {
      router.push("/login")
    } else if (role === "client") {
      router.push("/client-portal")
    }
  }, [router])

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-white p-6 shadow-sm flex flex-col relative z-10">
        <div className="flex items-center gap-2 mb-8">
          <HeartPulse className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-green-600">AidBridge</h1>
        </div>
        
        <nav className="space-y-3 flex-1">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-primary/10 hover:text-primary font-medium transition-colors">
            <LayoutDashboard className="h-5 w-5" /> Home
          </Link>
          <Link href="/dashboard/clients" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-primary/10 hover:text-primary font-medium transition-colors">
            <Users className="h-5 w-5" /> Clients & Cases
          </Link>
          <Link href="/dashboard/intake" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-primary/10 hover:text-primary font-medium transition-colors">
            <UserPlus className="h-5 w-5" /> AI Photo Intake
          </Link>
          <Link href="/dashboard/reports" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-primary/10 hover:text-primary font-medium transition-colors">
            <FileText className="h-5 w-5" /> Grant Reports
          </Link>
        </nav>

        <Link href="/login" className="flex items-center gap-3 px-3 py-2.5 mt-auto rounded-lg text-red-600 hover:bg-red-50 font-medium transition-colors" onClick={() => localStorage.removeItem('userRole')}>
          <LogOut className="h-5 w-5" /> Sign Out
        </Link>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
