import Link from 'next/link'
import { ReactNode } from 'react'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-muted/40 p-4">
        <h1 className="text-2xl font-bold text-primary mb-8">AidBridge</h1>
        <nav className="space-y-2">
          <Link href="/dashboard" className="block px-3 py-2 rounded-md hover:bg-muted font-medium">
            Home Dashboard
          </Link>
          <Link href="/dashboard/clients" className="block px-3 py-2 rounded-md hover:bg-muted font-medium">
            Clients & Cases
          </Link>
          <Link href="/dashboard/intake" className="block px-3 py-2 rounded-md hover:bg-muted font-medium">
            AI Photo Intake
          </Link>
          <Link href="/dashboard/reports" className="block px-3 py-2 rounded-md hover:bg-muted font-medium">
            Grant Reports
          </Link>
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}
