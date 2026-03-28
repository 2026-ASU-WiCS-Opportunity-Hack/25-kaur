"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, FileText, Download } from "lucide-react"

export default function ReportsPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [reportReady, setReportReady] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setReportReady(true)
    }, 3000)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
          Grant Reports
        </h2>
        <p className="text-muted-foreground mt-1">
          Generate comprehensive narrative reports for your funders using AI.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Q3 2023 Funder Report</CardTitle>
          <CardDescription>
            Claude will aggregate all client demographics, services logged, and outcomes for the quarter and draft a narrative based on the United Way template.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!reportReady ? (
            <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg bg-muted/20">
              <FileText className="h-12 w-12 text-primary/40 mb-4" />
              <Button onClick={handleGenerate} disabled={isGenerating} size="lg" className="gap-2">
                {isGenerating ? "Aggregating Data & Drafting..." : (
                  <>
                    <Sparkles className="h-5 w-5" /> Generate Q3 Report
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in zoom-in duration-300">
              <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg space-y-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-lg text-primary">Executive Summary</h3>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" /> Export PDF
                  </Button>
                </div>
                <p className="text-sm leading-relaxed text-card-foreground">
                  In Q3 2023, AidBridge provided case management and housing support services to 142 clients, representing a 12% increase from the previous quarter. Significant achievements included successfully placing 24 individuals into transitional housing...
                </p>
                
                <h3 className="font-bold text-md mt-6 text-primary">Demographic Breakdown</h3>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Children (Under 18): 15%</li>
                  <li>Adults (18-64): 70%</li>
                  <li>Seniors (65+): 15%</li>
                </ul>

                <h3 className="font-bold text-md mt-6 text-primary">Challenges & Adaptations</h3>
                <p className="text-sm leading-relaxed text-card-foreground">
                  A recurrent theme identified across case notes was the anxiety surrounding pending Section 8 extension applications. In response, staff dedicated an additional 40 hours this quarter specifically to housing authority follow-ups...
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
