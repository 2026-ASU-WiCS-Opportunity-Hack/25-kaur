"use client"

import { useMemo, useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHero } from "@/components/dashboard/page-hero"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type Appointment = {
  id: string
  clientName: string
  serviceType: string
  date: string
  time: string
  notes: string
}

const STORAGE_KEY = "appointments"

function SchedulingForm() {
  const searchParams = useSearchParams()
  const [clientName, setClientName] = useState("")
  const [serviceType, setServiceType] = useState("Case Check-In")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [notes, setNotes] = useState("")
  const [message, setMessage] = useState("")

  const today = useMemo(() => new Date().toISOString().slice(0, 10), [])

  useEffect(() => {
    const d = searchParams.get("date")
    const t = searchParams.get("time")
    if (d) setDate(d)
    if (t) setTime(t)
  }, [searchParams])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newAppointment: Appointment = {
      id: crypto.randomUUID(),
      clientName,
      serviceType,
      date,
      time,
      notes,
    }

    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as Appointment[]
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, newAppointment]))

    setClientName("")
    setServiceType("Case Check-In")
    setDate("")
    setTime("")
    setNotes("")
    setMessage("Appointment booked successfully.")
  }

  return (
    <div className="space-y-8">
      <PageHero
        title="Scheduling"
        subtitle="Create appointments — deep links from the calendar pre-fill date and time automatically."
        variant="compact"
      />

      <Card className="max-w-2xl border-emerald-100/80 bg-white/90 shadow-xl shadow-emerald-900/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Book Appointment</CardTitle>
          <CardDescription>Add a new appointment to the calendar.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Maria Garcia"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceType">Service Type</Label>
              <Input
                id="serviceType"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                placeholder="Case Check-In"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  min={today}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add context for this appointment..."
                rows={4}
              />
            </div>

            <div className="flex items-center gap-3">
              <Button type="submit">Book Appointment</Button>
              <Link href="/dashboard/calendar">
                <Button type="button" variant="secondary">Open Calendar</Button>
              </Link>
            </div>
            {message ? <p className="text-sm text-emerald-600">{message}</p> : null}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default function SchedulingPage() {
  return (
    <Suspense fallback={<div className="p-8 text-sm text-muted-foreground">Loading scheduling…</div>}>
      <SchedulingForm />
    </Suspense>
  )
}
