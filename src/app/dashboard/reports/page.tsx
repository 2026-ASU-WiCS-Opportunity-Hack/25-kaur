"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHero } from "@/components/dashboard/page-hero"
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
    <div className="mx-auto max-w-4xl space-y-8">
      <PageHero
        title="Grant reports"
        subtitle="Generate comprehensive narrative reports for your funders using AI."
        variant="compact"
      />

      <Card className="overflow-hidden border-emerald-100/80 bg-white/90 shadow-xl shadow-emerald-900/5">
        <CardHeader className="border-b border-emerald-50 bg-gradient-to-r from-white to-emerald-50/50">
          <CardTitle>Q3 2023 Funder Report</CardTitle>
          <CardDescription>
            Claude will aggregate all client demographics, services logged, and outcomes for the quarter and draft a narrative based on the United Way template.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6 md:p-8">
          {!reportReady ? (
            <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-emerald-200/80 bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/50 p-12">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.12),transparent_45%)]" />
              <FileText className="relative mb-4 h-14 w-14 text-emerald-600/80" />
              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                size="lg"
                className="relative gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg shadow-emerald-900/25 hover:from-emerald-500 hover:to-teal-500"
              >
                {isGenerating ? (
                  <>Aggregating data…</>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 text-amber-200" /> Generate Q3 report
                  </>
                )}
              </Button>
              {isGenerating ? (
                <div className="relative mt-6 h-2 w-full max-w-sm overflow-hidden rounded-full bg-emerald-100">
                  <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />
                </div>
              ) : null}
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in zoom-in duration-300">
              <div className="space-y-4 rounded-2xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50/60 to-white p-6 shadow-inner">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-lg text-primary">Executive Summary</h3>
                  <Button variant="outline" size="sm" className="gap-2 rounded-lg border-emerald-200 hover:bg-emerald-50">
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
