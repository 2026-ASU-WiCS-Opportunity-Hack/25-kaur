import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHero } from "@/components/dashboard/page-hero"
import { Sparkles, ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"

const MOCK_PROFILES: Record<string, {
  id: number
  name: string
  dob: string
  phone: string
  email: string
  history: { id: number; date: string; service: string; staff: string; notes: string }[]
}> = {
  "19402": {
    id: 19402,
    name: "Maria Garcia",
    dob: "1980-05-14",
    phone: "555-0102",
    email: "maria.g@example.com",
    history: [
      { id: 101, date: "2023-10-12", service: "Therapy Session", staff: "Dr. Smith", notes: "Discussed recent anxiety regarding housing." },
      { id: 102, date: "2023-09-28", service: "Intake Evaluation", staff: "Case Manager Jane", notes: "Initial intake completed. Housing support requested." }
    ]
  },
  "87345": {
    id: 87345,
    name: "John Doe",
    dob: "1992-11-03",
    phone: "555-0188",
    email: "john.d@example.com",
    history: [
      { id: 201, date: "2023-10-10", service: "Case Review", staff: "Case Manager Lee", notes: "Reviewed transportation and food support needs." },
      { id: 202, date: "2023-09-22", service: "Resource Navigation", staff: "Dr. Smith", notes: "Provided local pantry list and SNAP information." }
    ]
  },
}

export default function ClientProfilePage({ params }: { params: { id: string } }) {
  // In a real app we would fetch the client based on params.id from Supabase
  const client = MOCK_PROFILES[params.id] ?? MOCK_PROFILES["19402"]

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
              <span className="font-medium text-right text-green-600">Active</span>
            </div>
          </CardContent>
        </Card>

        {/* Dynamic Context Panel */}
        <Card className="md:col-span-2 border-emerald-100/80 bg-white/90 shadow-md shadow-emerald-900/5">
          <Tabs defaultValue="history" className="w-full">
            <CardHeader className="p-0 pt-6 px-6 pb-2">
              <TabsList>
                <TabsTrigger value="history">Service History</TabsTrigger>
                <TabsTrigger value="summary">AI Handoff Brief</TabsTrigger>
              </TabsList>
            </CardHeader>
            
            <CardContent className="pt-4">
              <TabsContent value="history" className="space-y-4">
                {client.history.map(entry => (
                  <div
                    key={entry.id}
                    className="rounded-xl border border-emerald-100/80 bg-gradient-to-r from-white to-emerald-50/30 p-4 shadow-sm transition hover:border-emerald-200 hover:shadow-md"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-primary">{entry.service}</h4>
                        <p className="text-xs text-muted-foreground">Logged by {entry.staff}</p>
                      </div>
                      <span className="text-xs bg-muted px-2 py-1 rounded">{entry.date}</span>
                    </div>
                    <p className="text-sm mt-2">{entry.notes}</p>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="summary">
                <div className="space-y-4 rounded-2xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50/70 to-white p-6">
                  <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                    <Sparkles className="h-5 w-5" />
                    <span>AI Generated Handoff Brief</span>
                  </div>
                  <p className="text-sm italic text-muted-foreground">Click "Generate Handoff Summary" above to have Claude summarize this client's entire history into a 1-page briefing for a new case manager.</p>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
