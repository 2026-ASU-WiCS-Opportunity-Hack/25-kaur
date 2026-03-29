"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHero } from "@/components/dashboard/page-hero"
import { Users, FileText, CheckCircle, Sparkles, CalendarDays, ClipboardPlus } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const TREND_DATA = [
  { name: "Jul", services: 26 },
  { name: "Aug", services: 35 },
  { name: "Sep", services: 38 },
  { name: "Oct", services: 40 },
  { name: "Nov", services: 30 },
  { name: "Dec", services: 36 },
  { name: "Jan", services: 40 },
  { name: "Feb", services: 30 },
  { name: "Mar", services: 55 },
  { name: "Apr", services: 45 },
  { name: "May", services: 70 },
  { name: "Jun", services: 65 },
]

const INITIAL_NUDGES = [
  {
    id: "19402",
    clientName: "Maria Garcia",
    priority: "Urgent",
    priorityClass: "text-red-500",
    note: '"Follow up with housing authority next Monday regarding Section 8."',
  },
  {
    id: "87345",
    clientName: "John Doe",
    priority: "Upcoming",
    priorityClass: "text-amber-500",
    note: '"Client requested information on local food banks. Must send list by Friday."',
  },
]

const ACTIVE_CLIENTS = 142
const GRANT_REPORTS_DUE = 2
const GREEN_BAR_COLORS = ["#14532d", "#166534", "#15803d", "#16a34a", "#22c55e", "#4ade80"]

export default function DashboardPage() {
  const router = useRouter()
  const [range, setRange] = useState("Last 6 Months")
  const [nudges, setNudges] = useState(INITIAL_NUDGES)
  const [completedNudges, setCompletedNudges] = useState<typeof INITIAL_NUDGES>([])
  const [showCompleted, setShowCompleted] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const savedOpen = localStorage.getItem("openNudges")
    const savedDone = localStorage.getItem("doneNudges")
    if (savedOpen) setNudges(JSON.parse(savedOpen))
    if (savedDone) setCompletedNudges(JSON.parse(savedDone))
  }, [])

  useEffect(() => {
    if (!isMounted) return
    localStorage.setItem("openNudges", JSON.stringify(nudges))
    localStorage.setItem("doneNudges", JSON.stringify(completedNudges))
  }, [nudges, completedNudges, isMounted])

  const chartData = useMemo(() => {
    if (range === "All Years") return TREND_DATA
    if (range === "Last Year") return TREND_DATA.slice(-12)
    return TREND_DATA.slice(-6)
  }, [range])

  const servicesLogged = useMemo(() => {
    return chartData.reduce((total, item) => total + item.services, 0)
  }, [chartData])

  const markNudgeDone = (id: string) => {
    const target = nudges.find((nudge) => nudge.id === id)
    if (!target) return
    setNudges((prev) => prev.filter((nudge) => nudge.id !== id))
    setCompletedNudges((prev) => [target, ...prev])
  }

  const undoNudge = (id: string) => {
    const target = completedNudges.find((nudge) => nudge.id === id)
    if (!target) return
    setCompletedNudges((prev) => prev.filter((nudge) => nudge.id !== id))
    setNudges((prev) => [target, ...prev])
  }

  const openPendingFollowUps = () => {
    setShowCompleted(false)
    const nudgesSection = document.getElementById("smart-nudges")
    nudgesSection?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="space-y-8">
      <PageHero
        title="Overview"
        subtitle="Here's what's happening at your organization today."
        actions={
          <>
            <Button
              variant="secondary"
              className="gap-2 rounded-xl border-white/20 bg-white/10 text-white hover:bg-white/20"
              onClick={() => router.push("/dashboard/calendar")}
            >
              <CalendarDays className="h-4 w-4" />
              Calendar
            </Button>
            <Button
              className="gap-2 rounded-xl bg-amber-400 text-emerald-950 hover:bg-amber-300"
              onClick={() => router.push("/dashboard/scheduling")}
            >
              <ClipboardPlus className="h-4 w-4" />
              Schedule
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card
          role="button"
          tabIndex={0}
          onClick={() => router.push("/dashboard/clients")}
          onKeyDown={(e) => e.key === "Enter" && router.push("/dashboard/clients")}
          className="group cursor-pointer border-emerald-100/80 bg-white/90 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-900/5"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Active Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ACTIVE_CLIENTS}</div>
            <p className="text-xs text-muted-foreground">+10% from last month</p>
          </CardContent>
        </Card>
        <Card
          role="button"
          tabIndex={0}
          onClick={() => router.push("/dashboard/reports")}
          onKeyDown={(e) => e.key === "Enter" && router.push("/dashboard/reports")}
          className="group cursor-pointer border-emerald-100/80 bg-white/90 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-900/5"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Services Logged (Monthly)</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{servicesLogged}</div>
            <p className="text-xs text-muted-foreground">Based on selected trend window</p>
          </CardContent>
        </Card>
        <Card
          role="button"
          tabIndex={0}
          onClick={openPendingFollowUps}
          onKeyDown={(e) => e.key === "Enter" && openPendingFollowUps()}
          className="group cursor-pointer border-amber-100/80 bg-gradient-to-br from-amber-50/50 to-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-amber-200 hover:shadow-lg"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary">Pending AI Follow-ups</CardTitle>
            <Sparkles className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{nudges.length}</div>
            <p className="text-xs text-primary/70">{completedNudges.length} marked done</p>
          </CardContent>
        </Card>
        <Card
          role="button"
          tabIndex={0}
          onClick={() => router.push("/dashboard/reports")}
          onKeyDown={(e) => e.key === "Enter" && router.push("/dashboard/reports")}
          className="group cursor-pointer border-emerald-100/80 bg-white/90 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-900/5"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Grant Reports Due</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{GRANT_REPORTS_DUE}</div>
            <p className="text-xs text-muted-foreground">Q3 Deadlines Approaching</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="col-span-1 border-emerald-100/80 bg-white/90 shadow-md shadow-emerald-900/5 backdrop-blur-sm transition-shadow hover:shadow-lg">
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div>
              <CardTitle>Services Trend</CardTitle>
              <CardDescription>Amount of resources and services provided over time.</CardDescription>
            </div>
            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="h-9 min-w-[180px] rounded-md border border-input bg-background px-3 text-sm"
            >
              <option>Last 6 Months</option>
              <option>Last Year</option>
              <option>All Years</option>
            </select>
          </CardHeader>
          <CardContent className="h-[300px]">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar 
                    dataKey="services" 
                    radius={[4, 4, 0, 0]} 
                    barSize={34}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`${entry.name}-${index}`} fill={GREEN_BAR_COLORS[index % GREEN_BAR_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full animate-pulse rounded-md bg-muted/40" />
            )}
          </CardContent>
        </Card>

        <Card
          id="smart-nudges"
          className="col-span-1 border-emerald-200/60 bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/40 shadow-md shadow-emerald-900/5 backdrop-blur-sm transition-shadow hover:shadow-lg"
        >
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <Sparkles className="h-5 w-5 text-yellow-500" /> Smart Nudges
              </CardTitle>
              <div className="flex gap-2">
                <Button size="sm" variant={showCompleted ? "secondary" : "default"} onClick={() => setShowCompleted(false)}>
                  Open
                </Button>
                <Button size="sm" variant={showCompleted ? "default" : "secondary"} onClick={() => setShowCompleted(true)}>
                  Done
                </Button>
              </div>
            </div>
            <CardDescription>AI-detected critical follow-ups organically extracted from your case notes.</CardDescription>
          </CardHeader>
          <CardContent>
            {!showCompleted && nudges.length === 0 ? (
              <div className="rounded-lg border bg-background p-6 text-sm text-muted-foreground">
                All follow-ups are complete. Great work.
              </div>
            ) : !showCompleted ? (
              <div className="space-y-4">
                {nudges.map((nudge) => (
                  <div key={nudge.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex justify-between">
                      <span className="text-sm font-semibold">{nudge.clientName} (ID #{nudge.id})</span>
                      <span className={`text-xs font-semibold ${nudge.priorityClass}`}>{nudge.priority}</span>
                    </div>
                    <p className="mt-3 rounded-md bg-slate-50 px-3 py-3 text-sm italic text-slate-600">{nudge.note}</p>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" className="bg-emerald-600 text-white hover:bg-emerald-700" onClick={() => markNudgeDone(nudge.id)}>
                        Mark Done
                      </Button>
                      <Link href={`/dashboard/clients/${nudge.id}`} onClick={() => localStorage.setItem("lastOpenedClientId", nudge.id)}>
                        <Button size="sm" className="bg-slate-100 text-slate-700 hover:bg-slate-200">Open Client Profile</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : completedNudges.length === 0 ? (
              <div className="rounded-lg border bg-background p-6 text-sm text-muted-foreground">
                No completed follow-ups yet.
              </div>
            ) : (
              <div className="space-y-4">
                {completedNudges.map((nudge) => (
                  <div key={nudge.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm opacity-90">
                    <div className="flex justify-between">
                      <span className="text-sm font-semibold line-through">{nudge.clientName} (ID #{nudge.id})</span>
                      <span className="text-xs font-semibold text-emerald-600">Done</span>
                    </div>
                    <p className="mt-3 rounded-md bg-slate-50 px-3 py-3 text-sm italic text-slate-600">{nudge.note}</p>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" className="bg-slate-100 text-slate-700 hover:bg-slate-200" onClick={() => undoNudge(nudge.id)}>
                        Undo
                      </Button>
                      <Link href={`/dashboard/clients/${nudge.id}`}>
                        <Button size="sm" className="bg-emerald-600 text-white hover:bg-emerald-700">Open Client Profile</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
