"use client"

import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { HeartPulse, Home, Calendar, Phone, LogOut } from 'lucide-react'

export default function ClientPortalLayout({ children }: { children: ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    // Basic Mock Auth
    const role = localStorage.getItem("userRole")
    if (!role) {
      router.push("/login")
    }
    // If they are staff, they shouldn't technically be restricted from seeing client view,
    // but usually, we lock them to dashboard. We will just let them see it if they manually land here.
  }, [router])

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      {/* Sidebar specific to Client */}
      <aside className="w-64 border-r bg-white p-6 shadow-sm flex flex-col relative z-10">
        <div className="flex items-center gap-2 mb-8">
          <HeartPulse className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-green-600">AidBridge</h1>
        </div>
        
        <nav className="space-y-3 flex-1">
          <Link href="/client-portal" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-primary/10 hover:text-primary font-medium transition-colors">
            <Home className="h-5 w-5" /> My Portal
          </Link>
          <Link href="/client-portal/appointments" className="flex flex-col gap-1 px-3 py-2.5 rounded-lg hover:bg-primary/10 hover:text-primary font-medium transition-colors group">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5" /> Appointments
            </div>
          </Link>
          <Link href="/client-portal/contact" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-primary/10 hover:text-primary font-medium transition-colors">
            <Phone className="h-5 w-5" /> Contact Staff
          </Link>
        </nav>

        <Link href="/login" className="flex items-center gap-3 px-3 py-2.5 mt-auto rounded-lg text-red-600 hover:bg-red-50 font-medium transition-colors" onClick={() => localStorage.removeItem('userRole')}>
          <LogOut className="h-5 w-5" /> Log Out
        </Link>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
