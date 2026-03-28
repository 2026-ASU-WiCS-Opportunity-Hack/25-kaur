"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar as CalendarIcon, Clock, Phone, AlertCircle, FileText } from "lucide-react"

export default function ClientPortal() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* Header Profile */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back, Maria</h2>
          <p className="text-muted-foreground mt-1">Here is a quick overview of your case status.</p>
        </div>
        <div className="glass-panel px-4 py-2 rounded-full border border-primary/20 flex items-center gap-2">
           <span className="relative flex h-3 w-3">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
             <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
           </span>
           <span className="text-sm font-medium text-primary">Status: Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Next Appointment Card */}
        <Card className="col-span-1 md:col-span-2 border-primary/10 shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <CalendarIcon className="h-5 w-5" /> Next Scheduled Appointment
            </CardTitle>
            <CardDescription>Your upcoming meetings with AidBridge staff.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-50 border rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-slate-800">Housing Voucher Follow-up</h3>
                  <p className="text-sm text-muted-foreground mt-1">Review Section 8 extension status.</p>
                </div>
                <div className="bg-primary/10 text-primary font-bold px-3 py-1 rounded-md text-sm">
                  In 3 Days
                </div>
              </div>
              <div className="flex gap-4 text-sm text-slate-600 border-t pt-4">
                <span className="flex items-center gap-1"><CalendarIcon className="h-4 w-4" /> Nov 6, 2023</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> 10:00 AM MST</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Required Card */}
        <Card className="col-span-1 shadow-md border-amber-200 bg-amber-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-600 text-lg">
              <AlertCircle className="h-5 w-5" /> Needs Attention
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex items-start gap-3 bg-white p-3 rounded-lg border shadow-sm">
              <FileText className="h-4 w-4 text-amber-500 mt-0.5" />
              <div>
                <p className="font-medium text-slate-800">Upload Pay Stub</p>
                <p className="text-xs text-muted-foreground mt-1">Required for housing voucher.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Case Worker Context */}
      <h3 className="text-xl font-bold mt-10 mb-4 inline-block relative">
        Your Support Team
        <div className="absolute bottom-0 left-0 w-full h-1 bg-primary/20 rounded-full" />
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="glass-panel hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-16 w-16 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500 text-xl overflow-hidden shadow-inner">
               <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Staff Profile" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Sarah Jenkins</h4>
              <p className="text-sm text-muted-foreground">Primary Case Manager</p>
              <div className="mt-2 flex gap-2">
                <button className="text-xs bg-primary text-primary-foreground px-3 py-1 rounded-full flex items-center gap-1 shadow-sm hover:bg-primary/90 transition-colors">
                  <Phone className="h-3 w-3" /> Call
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}
