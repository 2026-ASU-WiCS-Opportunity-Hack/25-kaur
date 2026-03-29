"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { PageHero } from "@/components/dashboard/page-hero"
import { Search, Plus, Sparkles, Users } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

const FALLBACK_CLIENTS = [
  { id: 19402, name: "Maria Garcia", dob: "1980-05-14", status: "Active" as const, lastVisit: "2023-10-12" },
  { id: 87345, name: "John Doe", dob: "1992-11-03", status: "Active" as const, lastVisit: "2023-10-10" },
  { id: 11003, name: "Elena Rostova", dob: "1975-02-21", status: "Inactive" as const, lastVisit: "2023-08-01" },
]

type ClientRow = {
  id: string | number
  name: string
  dob: string
  status: "Active" | "Inactive"
  lastVisit: string
}

export default function ClientsPage() {
  const [query, setQuery] = useState("")
  const [clients, setClients] = useState<ClientRow[]>(FALLBACK_CLIENTS)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadClients = async () => {
      setIsLoading(true)
      setLoadError(null)

      const hasUrl = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL?.trim())
      const hasPublicKey = Boolean(
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
          process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim()
      )
      if (!hasUrl || !hasPublicKey) {
        setLoadError(
          "Missing NEXT_PUBLIC_SUPABASE_URL and a client key in .env.local. Set NEXT_PUBLIC_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (sb_publishable_…), restart dev, and reload."
        )
        setClients(FALLBACK_CLIENTS)
        setIsLoading(false)
        return
      }

      const supabase = createClient()
      const { data, error } = await supabase
        .from("clients")
        .select("id, client_code, first_name, last_name, dob, status, last_visit")
        .order("created_at", { ascending: true })

      if (!isMounted) return

      if (error) {
        const msg = error.message
        const code = "code" in error ? String((error as { code?: string }).code ?? "") : ""
        const missingTable =
          code === "PGRST205" ||
          (msg.includes("Could not find the table") && msg.includes("clients")) ||
          msg.includes("schema cache")
        setLoadError(
          missingTable
            ? "Supabase API does not see public.clients yet. Fix: (1) In SQL Editor run notify pgrst, 'reload schema'; (2) run npm run db:seed; (3) stop and restart npm run dev so NEXT_PUBLIC_* env updates apply; (4) hard refresh. If it persists, confirm Table Editor lists public.clients and NEXT_PUBLIC_SUPABASE_URL matches that project."
            : `Supabase query failed: ${msg}. Showing fallback demo rows.`
        )
        setClients(FALLBACK_CLIENTS)
        setIsLoading(false)
        return
      }

      if (!data || data.length === 0) {
        setLoadError("No client rows found in database yet. Run the seed script to populate records.")
        setClients([])
        setIsLoading(false)
        return
      }

      const mapped: ClientRow[] = data.map((row) => ({
        id: row.id ?? row.client_code,
        name: `${row.first_name ?? ""} ${row.last_name ?? ""}`.trim() || `Client ${row.client_code}`,
        dob: row.dob ?? "-",
        status: row.status === "Inactive" ? "Inactive" : "Active",
        lastVisit: row.last_visit ?? "-",
      }))

      setClients(mapped)
      setIsLoading(false)
    }

    void loadClients()

    return () => {
      isMounted = false
    }
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return clients
    return clients.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        String(c.id).includes(q) ||
        c.status.toLowerCase().includes(q)
    )
  }, [clients, query])

  return (
    <div className="space-y-8">
      <PageHero
        title="Clients & cases"
        subtitle="Manage your organization's clients and their case files. Search updates the table live."
        variant="compact"
        actions={
          <div className="flex flex-wrap gap-2">
            <Link href="/dashboard/intake">
              <Button variant="secondary" className="gap-2 rounded-xl border-white/20 bg-white/10 text-white hover:bg-white/20">
                <Sparkles className="h-4 w-4" />
                AI Intake
              </Button>
            </Link>
            <Button className="gap-2 rounded-xl bg-amber-400 text-emerald-950 hover:bg-amber-300">
              <Plus className="h-4 w-4" />
              Add client
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-emerald-100 bg-white/90 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <Users className="mb-2 h-6 w-6 text-emerald-600" />
          <p className="text-2xl font-bold tabular-nums">{clients.length}</p>
          <p className="text-xs font-medium text-muted-foreground">Registry size</p>
        </div>
        <div className="rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50/80 to-white p-4 shadow-sm">
          <p className="text-2xl font-bold text-teal-900">{clients.filter((c) => c.status === "Active").length}</p>
          <p className="text-xs font-medium text-teal-800/80">Active cases</p>
        </div>
        <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-4 shadow-sm">
          <p className="text-2xl font-bold text-amber-900">{filtered.length}</p>
          <p className="text-xs font-medium text-amber-800/80">Matching filter</p>
        </div>
      </div>

      <Card className="overflow-hidden border-emerald-100/80 bg-white/90 shadow-lg shadow-emerald-900/5">
        <CardHeader className="border-b border-emerald-50 bg-gradient-to-r from-white to-emerald-50/40">
          <CardTitle>Client registry</CardTitle>
          <CardDescription>Semantic-style search (demo) — try “housing”, “Maria”, or an ID.</CardDescription>
          {loadError ? <p className="mt-2 text-xs text-amber-700">{loadError}</p> : null}
          <div className="relative mt-4 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-600/70" />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="E.g., Which clients need housing support?"
              className="rounded-xl border-emerald-100/80 pl-10 shadow-inner transition focus-visible:ring-emerald-200"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
                <TableHead>Name</TableHead>
                <TableHead>Date of Birth</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-10 text-center text-sm text-muted-foreground">
                    Loading clients from database...
                  </TableCell>
                </TableRow>
              ) : null}
              {!isLoading
                ? filtered.map((client) => (
                <TableRow
                  key={client.id}
                  className="cursor-pointer transition-colors hover:bg-emerald-50/50"
                >
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.dob}</TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        client.status === "Active"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {client.status}
                    </span>
                  </TableCell>
                  <TableCell>{client.lastVisit}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/dashboard/clients/${client.id}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-lg font-semibold text-emerald-800 hover:bg-emerald-100"
                      >
                        View profile
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
          {filtered.length === 0 ? (
            <p className="p-8 text-center text-sm text-muted-foreground">No matches — try a different search.</p>
          ) : null}
        </CardContent>
      </Card>
    </div>
  )
}
