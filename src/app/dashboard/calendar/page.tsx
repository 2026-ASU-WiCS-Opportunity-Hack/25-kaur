"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import {
  CalendarDays,
  Clock,
  Sparkles,
  Sun,
  Trash2,
  Zap,
  CalendarPlus,
  ArrowRight,
} from "lucide-react"

type Appointment = {
  id: string
  clientName: string
  serviceType: string
  date: string
  time: string
  notes: string
}

const STORAGE_KEY = "appointments"
const TIME_SLOTS = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"]

const toDateKey = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

const monthPrefix = (date: Date) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  return `${y}-${m}`
}

const formatPrettyDate = (d: Date) =>
  d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric", year: "numeric" })

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [hoverSlot, setHoverSlot] = useState<string | null>(null)

  const refresh = useCallback(() => {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as Appointment[]
    setAppointments(data.sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)))
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) refresh()
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [refresh])

  const bookedForDay = useMemo(
    () => appointments.filter((appt) => appt.date === toDateKey(selectedDate)),
    [appointments, selectedDate]
  )

  const bookedDays = useMemo(() => {
    const days = new Set(appointments.map((appt) => appt.date))
    return (date: Date) => days.has(toDateKey(date))
  }, [appointments])

  const appointmentsThisMonth = useMemo(() => {
    const prefix = monthPrefix(selectedDate)
    return appointments.filter((a) => a.date.startsWith(prefix))
  }, [appointments, selectedDate])

  const busyDaysSorted = useMemo(() => {
    const prefix = monthPrefix(selectedDate)
    const map = new Map<string, number>()
    appointmentsThisMonth.forEach((a) => {
      if (a.date.startsWith(prefix)) map.set(a.date, (map.get(a.date) ?? 0) + 1)
    })
    return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5)
  }, [appointmentsThisMonth, selectedDate])

  const availability = useMemo(() => {
    const bookedTimes = new Set(bookedForDay.map((appt) => appt.time))
    return TIME_SLOTS.map((slot) => ({
      slot,
      available: !bookedTimes.has(slot),
    }))
  }, [bookedForDay])

  const nextFreeSlot = useMemo(() => availability.find((s) => s.available)?.slot ?? null, [availability])

  const removeAppointment = (id: string) => {
    const next = appointments
      .filter((appt) => appt.id !== id)
      .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    setAppointments(next)
  }

  const goToday = () => setSelectedDate(new Date())

  const schedulingHref = (slot?: string) => {
    const params = new URLSearchParams({ date: toDateKey(selectedDate) })
    if (slot) params.set("time", slot)
    return `/dashboard/scheduling?${params.toString()}`
  }

  const isToday =
    toDateKey(selectedDate) === toDateKey(new Date())

  return (
    <div className="relative isolate space-y-8 pb-24">
      {/* Hero header */}
      <div className="relative overflow-hidden rounded-3xl border border-emerald-200/60 bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900 px-8 py-10 text-white shadow-2xl shadow-emerald-900/30">
        <div className="absolute right-6 top-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md">
          <Sparkles className="h-7 w-7 text-amber-300" />
        </div>
        <div className="absolute -right-8 bottom-0 h-40 w-40 rounded-full border border-white/10 bg-white/5" />
        <div className="relative max-w-2xl space-y-3">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-emerald-200">
            <Zap className="h-3.5 w-3.5 text-amber-300" />
            Live schedule
          </p>
          <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">Calendar</h2>
          <p className="text-lg text-emerald-100/90">
            Monthly view with smart highlights. Tap a free slot to book instantly.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/dashboard/scheduling">
              <Button className="gap-2 rounded-xl bg-amber-400 text-emerald-950 hover:bg-amber-300">
                <CalendarPlus className="h-4 w-4" />
                New appointment
              </Button>
            </Link>
            <Button
              variant="secondary"
              className="gap-2 rounded-xl border-white/20 bg-white/10 text-white hover:bg-white/20"
              onClick={goToday}
            >
              <Sun className="h-4 w-4 text-amber-200" />
              Jump to today
            </Button>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid gap-4 sm:grid-cols-3">
        <button
          type="button"
          onClick={() => setSelectedDate(new Date())}
          className="group relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
        >
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-emerald-100/80 transition-transform group-hover:scale-110" />
          <CalendarDays className="relative mb-2 h-6 w-6 text-emerald-600" />
          <p className="relative text-3xl font-bold tabular-nums text-emerald-950">{appointmentsThisMonth.length}</p>
          <p className="relative text-sm font-medium text-muted-foreground">Bookings this month</p>
        </button>
        <div className="relative overflow-hidden rounded-2xl border border-teal-100 bg-gradient-to-br from-white to-teal-50/50 p-5 shadow-sm">
          <div className="absolute right-3 top-3 text-teal-200">
            <Sparkles className="h-8 w-8" />
          </div>
          <p className="text-3xl font-bold tabular-nums text-teal-900">{busyDaysSorted.length}</p>
          <p className="text-sm font-medium text-teal-800/80">Busy days (top streak)</p>
        </div>
        <div
          className={`rounded-2xl border p-5 shadow-sm transition-all ${
            nextFreeSlot
              ? "border-lime-200 bg-gradient-to-br from-lime-50 to-white"
              : "border-rose-100 bg-rose-50/50"
          }`}
        >
          <Clock className="mb-2 h-6 w-6 text-lime-700" />
          <p className="text-lg font-bold text-emerald-950">
            {nextFreeSlot ?? "Fully booked"}
          </p>
          <p className="text-sm text-muted-foreground">
            {nextFreeSlot ? "Next open slot on selected day" : "Pick another date"}
          </p>
        </div>
      </div>

      <Card className="overflow-hidden border-emerald-100/80 shadow-xl shadow-emerald-900/5">
        <CardHeader className="border-b border-emerald-50 bg-gradient-to-r from-white to-emerald-50/30">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-xl">Month overview</CardTitle>
              <CardDescription>
                {formatPrettyDate(selectedDate)}
                {isToday ? " · Today" : ""}
              </CardDescription>
            </div>
            {busyDaysSorted.length > 0 ? (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">Hot days:</span>
                {busyDaysSorted.map(([day, count]) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => {
                      const [y, m, d] = day.split("-").map(Number)
                      setSelectedDate(new Date(y, m - 1, d))
                    }}
                    className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-900 transition hover:bg-amber-100 hover:scale-105"
                  >
                    {day.slice(5)} ×{count}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-8 p-6 xl:grid-cols-[1.15fr_1fr]">
          {/* Calendar glass panel */}
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-400/20 via-transparent to-teal-400/10 blur-xl" />
            <div className="relative rounded-3xl border border-white/60 bg-white/80 p-4 shadow-inner backdrop-blur-md md:p-6">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  if (date) setSelectedDate(date)
                }}
                modifiers={{ booked: bookedDays }}
                modifiersClassNames={{
                  booked:
                    "ring-2 ring-emerald-400/60 ring-offset-2 ring-offset-white bg-emerald-100 text-emerald-900 font-semibold",
                }}
                className="w-full [&_.rdp-month]:w-full [&_.rdp-table]:w-full"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
                  <Clock className="h-4 w-4" />
                </span>
                Timeline · {toDateKey(selectedDate)}
              </h3>
              {bookedForDay.length === 0 ? (
                <div className="rounded-2xl border-2 border-dashed border-emerald-200/80 bg-emerald-50/40 p-8 text-center">
                  <p className="font-medium text-emerald-900">Clear schedule</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    No appointments yet. Grab a slot below or create one.
                  </p>
                  <Link href={schedulingHref()} className="mt-4 inline-flex">
                    <Button className="gap-2 rounded-xl">
                      Schedule this day
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ) : (
                <ul className="space-y-3">
                  {bookedForDay
                    .slice()
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map((appt, i) => (
                      <li
                        key={appt.id}
                        className="group relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-4 shadow-md transition hover:border-emerald-200 hover:shadow-lg"
                        style={{ animationDelay: `${i * 60}ms` }}
                      >
                        <div
                          className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-emerald-500 to-teal-500 opacity-90"
                          aria-hidden
                        />
                        <div className="pl-3">
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                              <p className="font-semibold text-slate-900">{appt.clientName}</p>
                              <p className="text-sm text-muted-foreground">{appt.serviceType}</p>
                            </div>
                            <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-100 px-2.5 py-1 text-sm font-mono font-semibold text-emerald-900">
                              {appt.time}
                            </span>
                          </div>
                          {appt.notes ? (
                            <p className="mt-2 rounded-lg bg-slate-50 px-3 py-2 text-sm italic text-slate-600">
                              {appt.notes}
                            </p>
                          ) : null}
                          <Button
                            size="sm"
                            variant="secondary"
                            className="mt-3 gap-2 text-rose-700 hover:bg-rose-50"
                            onClick={() => removeAppointment(appt.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Cancel
                          </Button>
                        </div>
                      </li>
                    ))}
                </ul>
              )}
            </div>

            <div>
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                <Zap className="h-5 w-5 text-amber-500" />
                Quick book · availability
              </h3>
              <p className="mb-3 text-sm text-muted-foreground">
                Click a green slot to open scheduling with date and time filled in.
              </p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {availability.map((item) => (
                  <Link
                    key={item.slot}
                    href={item.available ? schedulingHref(item.slot) : "#"}
                    onClick={(e) => !item.available && e.preventDefault()}
                    className={`
                      relative rounded-xl border-2 px-3 py-3 text-center text-sm font-medium transition-all duration-200
                      ${
                        item.available
                          ? "border-emerald-200 bg-gradient-to-br from-emerald-50 to white text-emerald-800 hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md active:scale-[0.98]"
                          : "cursor-not-allowed border-rose-100 bg-rose-50/80 text-rose-600 opacity-75"
                      }
                      ${hoverSlot === item.slot ? "scale-[1.02]" : ""}
                    `}
                    onMouseEnter={() => setHoverSlot(item.slot)}
                    onMouseLeave={() => setHoverSlot(null)}
                  >
                    <span className="block font-mono font-bold">{item.slot}</span>
                    <span className="text-xs opacity-80">{item.available ? "Open" : "Taken"}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Floating action */}
      <Link
        href="/dashboard/scheduling"
        className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-2xl shadow-emerald-900/40 transition hover:scale-110 hover:shadow-emerald-800/50 focus:outline-none focus:ring-4 focus:ring-emerald-300/50"
        aria-label="New appointment"
      >
        <CalendarPlus className="h-6 w-6" />
      </Link>
    </div>
  )
}
