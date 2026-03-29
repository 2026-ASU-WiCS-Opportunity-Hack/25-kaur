import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHero } from "@/components/dashboard/page-hero"
import { Sparkles, ArrowLeft, Plus, FileText, Calendar, ClipboardList } from "lucide-react"
import Link from "next/link"
import { getDemoProfile } from "@/lib/demo-clients"

export default function ClientProfilePage({ params }: { params: { id: string } }) {
  const client = getDemoProfile(params.id)

  const serviceCount = client.history.length
  const lastVisit =
    client.history.length > 0
      ? [...client.history].sort((a, b) => b.date.localeCompare(a.date))[0]!.date
      : "—"

  return (
    <div className="space-y-8">
      <PageHero
        title={client.name}
        subtitle={`Client record · ID #${params.id}`}
        variant="compact"
        actions={
          <>
            <Link href="/dashboard/clients">
              <Button
                variant="secondary"
                size="sm"
                className="gap-2 rounded-xl border-white/20 bg-white/10 text-white hover:bg-white/20"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
            <Button
              variant="secondary"
              size="sm"
              className="gap-2 rounded-xl border-white/20 bg-white/10 text-white hover:bg-white/20"
            >
              <Sparkles className="h-4 w-4 text-amber-200" />
              Handoff summary
            </Button>
            <Link href={`/dashboard/clients/${params.id}/log-service`}>
              <Button size="sm" className="gap-2 rounded-xl bg-amber-400 text-emerald-950 hover:bg-amber-300">
                <Plus className="h-4 w-4" />
                Log service
              </Button>
            </Link>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-1 border-emerald-100/80 border-t-4 border-t-emerald-600 bg-white/90 shadow-lg shadow-emerald-900/5">
          <CardHeader>
            <CardTitle>Demographics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="grid grid-cols-2">
              <span className="text-muted-foreground">Date of Birth:</span>
              <span className="font-medium text-right">{client.dob}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-muted-foreground">Phone:</span>
              <span className="font-medium text-right">{client.phone}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-muted-foreground">Email:</span>
              <span className="font-medium text-right">{client.email}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-muted-foreground">Status:</span>
              <span
                className={`font-medium text-right ${
                  client.status === "Active" ? "text-green-600" : "text-slate-600"
                }`}
              >
                {client.status}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 border-emerald-100/80 bg-white/90 shadow-md shadow-emerald-900/5">
          <Tabs defaultValue="history" className="w-full">
            <CardHeader className="p-0 pt-6 px-6 pb-2">
              <TabsList>
                <TabsTrigger value="history">Service History</TabsTrigger>
                <TabsTrigger value="report">Client report</TabsTrigger>
                <TabsTrigger value="summary">AI Handoff Brief</TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent className="pt-4">
              <TabsContent value="history" className="space-y-4">
                {client.history.map((entry) => (
                  <div
                    key={entry.id}
                    className="rounded-xl border border-emerald-100/80 bg-gradient-to-r from-white to-emerald-50/30 p-4 shadow-sm transition hover:border-emerald-200 hover:shadow-md"
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-primary">{entry.service}</h4>
                        <p className="text-xs text-muted-foreground">Logged by {entry.staff}</p>
                      </div>
                      <span className="rounded bg-muted px-2 py-1 text-xs">{entry.date}</span>
                    </div>
                    <p className="mt-2 text-sm">{entry.notes}</p>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="report" className="space-y-4">
                <div className="rounded-2xl border border-emerald-200/70 bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/40 p-6 shadow-md shadow-emerald-900/5">
                  <div className="mb-5 flex items-center gap-2 border-b border-emerald-100/80 pb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-800">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-emerald-950">Client summary</h3>
                      <p className="text-xs text-muted-foreground">
                        {`Snapshot for case review and reporting — demo data only (not connected to a live database).`}
                      </p>
                    </div>
                  </div>
                  <dl className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-white/80 bg-white/70 px-4 py-3 shadow-sm">
                      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Full name</dt>
                      <dd className="mt-1 font-semibold text-foreground">{client.name}</dd>
                    </div>
                    <div className="rounded-xl border border-white/80 bg-white/70 px-4 py-3 shadow-sm">
                      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Client ID</dt>
                      <dd className="mt-1 font-mono text-sm font-semibold tabular-nums text-foreground">#{client.id}</dd>
                    </div>
                    <div className="rounded-xl border border-white/80 bg-white/70 px-4 py-3 shadow-sm">
                      <dt className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        Date of birth
                      </dt>
                      <dd className="mt-1 font-medium text-foreground">{client.dob}</dd>
                    </div>
                    <div className="rounded-xl border border-white/80 bg-white/70 px-4 py-3 shadow-sm">
                      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Case status</dt>
                      <dd className="mt-1">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            client.status === "Active"
                              ? "bg-emerald-100 text-emerald-900"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {client.status}
                        </span>
                      </dd>
                    </div>
                    <div className="rounded-xl border border-white/80 bg-white/70 px-4 py-3 shadow-sm sm:col-span-2">
                      <dt className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        <ClipboardList className="h-3.5 w-3.5" />
                        Activity overview
                      </dt>
                      <dd className="mt-2 flex flex-wrap gap-4 text-sm">
                        <span>
                          <span className="text-muted-foreground">Services logged: </span>
                          <span className="font-semibold tabular-nums text-foreground">{serviceCount}</span>
                        </span>
                        <span className="hidden text-emerald-200 sm:inline">|</span>
                        <span>
                          <span className="text-muted-foreground">Last visit: </span>
                          <span className="font-semibold text-foreground">{lastVisit}</span>
                        </span>
                      </dd>
                    </div>
                  </dl>
                </div>
              </TabsContent>

              <TabsContent value="summary">
                <div className="space-y-4 rounded-2xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50/70 to-white p-6">
                  <div className="mb-2 flex items-center gap-2 font-semibold text-primary">
                    <Sparkles className="h-5 w-5" />
                    <span>AI Generated Handoff Brief</span>
                  </div>
                  <p className="text-sm italic text-muted-foreground">
                    {`Click "Generate Handoff Summary" above to have Claude summarize this client's entire history into a 1-page briefing for a new case manager.`}
                  </p>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
