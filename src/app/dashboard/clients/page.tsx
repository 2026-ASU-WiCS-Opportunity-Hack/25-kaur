import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Search, Plus, Sparkles } from "lucide-react"
import Link from "next/link"

const MOCK_CLIENTS = [
  { id: 1, name: "Maria Garcia", dob: "1980-05-14", status: "Active", lastVisit: "2023-10-12" },
  { id: 2, name: "John Doe", dob: "1992-11-03", status: "Active", lastVisit: "2023-10-10" },
  { id: 3, name: "Elena Rostova", dob: "1975-02-21", status: "Inactive", lastVisit: "2023-08-01" },
]

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">Clients</h2>
          <p className="text-muted-foreground">Manage your organization's clients and their case files.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/intake">
            <Button variant="secondary" className="gap-2">
              <Sparkles className="h-4 w-4" />
              AI Intake Form
            </Button>
          </Link>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Client
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Client Registry</CardTitle>
          <CardDescription>Search for clients via semantic search (AI) or name.</CardDescription>
          <div className="relative mt-4 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="E.g., Which clients need housing support?" 
              className="pl-8"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date of Birth</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_CLIENTS.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.dob}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${client.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-800'}`}>
                      {client.status}
                    </span>
                  </TableCell>
                  <TableCell>{client.lastVisit}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/dashboard/clients/${client.id}`}>
                      <Button variant="ghost" size="sm">View Profile</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
