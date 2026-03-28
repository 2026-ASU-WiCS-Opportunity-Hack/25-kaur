import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"

const MOCK_PROFILE = {
  id: 1,
  name: "Maria Garcia",
  dob: "1980-05-14",
  phone: "555-0102",
  email: "maria.g@example.com",
  history: [
    { id: 101, date: "2023-10-12", service: "Therapy Session", staff: "Dr. Smith", notes: "Discussed recent anxiety regarding housing." },
    { id: 102, date: "2023-09-28", service: "Intake Evaluation", staff: "Case Manager Jane", notes: "Initial intake completed. Housing support requested." }
  ]
}

export default function ClientProfilePage({ params }: { params: { id: string } }) {
  // In a real app we would fetch the client based on params.id from Supabase
  const client = MOCK_PROFILE

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/clients">
          <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">{client.name}</h2>
          <p className="text-muted-foreground">Client ID: #{params.id}</p>
        </div>
        <div className="ml-auto flex gap-2">
          <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary/10">
            <Sparkles className="h-4 w-4" />
            Generate Handoff Summary
          </Button>
          <Link href={`/dashboard/clients/${params.id}/log-service`}>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Log Service
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Demographics Card */}
        <Card className="md:col-span-1 border-t-4 border-t-primary">
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
        <Card className="md:col-span-2">
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
                  <div key={entry.id} className="p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
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
                <div className="p-6 border rounded-lg bg-primary/5 border-primary/20 space-y-4">
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
