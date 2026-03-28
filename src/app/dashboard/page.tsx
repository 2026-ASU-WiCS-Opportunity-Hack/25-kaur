"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, CheckCircle, Sparkles } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const MOCK_DATA = [
  { name: 'Jan', services: 40 },
  { name: 'Feb', services: 30 },
  { name: 'Mar', services: 55 },
  { name: 'Apr', services: 45 },
  { name: 'May', services: 70 },
  { name: 'Jun', services: 65 },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-primary">Overview</h2>
        <p className="text-muted-foreground">Here's what's happening at your organization today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Active Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Services Logged (Monthly)</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">384</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary">Pending AI Follow-ups</CardTitle>
            <Sparkles className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">7</div>
            <p className="text-xs text-primary/70">Requires your attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Grant Reports Due</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Q3 Deadlines Approaching</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Services Trend</CardTitle>
            <CardDescription>Number of services provided over the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar 
                  dataKey="services" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]} 
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Sparkles className="h-5 w-5" /> Smart Nudges
            </CardTitle>
            <CardDescription>AI-detected follow-ups from your case notes.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-background rounded-lg p-4 border shadow-sm">
                <div className="flex justify-between">
                  <span className="font-semibold text-sm">Maria Garcia (ID #1)</span>
                  <span className="text-xs font-bold text-red-500">Urgent</span>
                </div>
                <p className="text-sm mt-1 text-muted-foreground">"Follow up with housing authority next Monday regarding Section 8."</p>
                <div className="mt-3 flex gap-2">
                  <button className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">Mark Done</button>
                  <button className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">Go to Client</button>
                </div>
              </div>
              <div className="bg-background rounded-lg p-4 border shadow-sm">
                <div className="flex justify-between">
                  <span className="font-semibold text-sm">John Doe (ID #2)</span>
                  <span className="text-xs font-medium text-amber-500">Upcoming</span>
                </div>
                <p className="text-sm mt-1 text-muted-foreground">"Client requested information on local food banks. Must send list by Friday."</p>
                <div className="mt-3 flex gap-2">
                  <button className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">Mark Done</button>
                  <button className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">Go to Client</button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
