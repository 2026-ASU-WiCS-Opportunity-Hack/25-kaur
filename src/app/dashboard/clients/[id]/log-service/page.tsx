"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { PageHero } from "@/components/dashboard/page-hero"
import { Mic, Square, Sparkles, Loader2, Save, ArrowLeft } from "lucide-react"

export default function LogServicePage({ params }: { params: { id: string } }) {
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [transcriptData, setTranscriptData] = useState<any>(null)
  
  // Minimal manual fallback state
  const [manualNote, setManualNote] = useState("")

  const handleRecordToggle = () => {
    if (isRecording) {
      setIsRecording(false)
      processAudioMock()
    } else {
      setIsRecording(true)
      setTranscriptData(null)
    }
  }

  const processAudioMock = () => {
    setIsProcessing(true)
    // Simulating sending audio to /api/ai/transcribe which returns structured data
    setTimeout(() => {
      setTranscriptData({
        transcript: "The client came in today discussing some anxiety around losing their upcoming housing voucher. They applied for the Section 8 extension last Thursday but haven't heard back.",
        serviceType: "Case Management - Housing",
        summary: "Client is anxious about pending Section 8 extension.",
        actionItems: "Follow up with housing authority next Monday regarding Section 8.",
        suggestedFollowUpDate: "2023-11-06"
      })
      setIsProcessing(false)
    }, 2500)
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <PageHero
        title="Log client session"
        subtitle={`Voice or manual notes · Client ID #${params.id}`}
        variant="compact"
        actions={
          <Link href={`/dashboard/clients/${params.id}`}>
            <Button
              variant="secondary"
              size="sm"
              className="gap-2 rounded-xl border-white/20 bg-white/10 text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4" />
              Profile
            </Button>
          </Link>
        }
      />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card className="overflow-hidden border-emerald-100/80 border-t-4 border-t-emerald-600 bg-white/90 shadow-xl shadow-emerald-900/5">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Voice-to-Notes</span>
              <Sparkles className="h-5 w-5 text-primary" />
            </CardTitle>
            <CardDescription>Record your session summary. AI will structure it automatically.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 flex flex-col items-center pt-8 pb-12">
            
            <button
              type="button"
              onClick={handleRecordToggle}
              className={`relative flex h-28 w-28 items-center justify-center rounded-full transition-all duration-300 ${
                isRecording
                  ? "animate-pulse bg-red-100 text-red-600 ring-4 ring-red-200/80 dark:bg-red-900/40"
                  : "bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-800 shadow-inner hover:scale-105 hover:shadow-lg"
              }`}
            >
              {isRecording ? <Square className="h-10 w-10 fill-current" /> : <Mic className="h-10 w-10" />}
            </button>
            <p className="text-sm font-medium text-muted-foreground text-center">
              {isRecording ? "Recording... Click to stop." : "Tap to speak. Use natural language."}
            </p>

            {isProcessing && (
              <div className="flex items-center gap-2 text-primary text-sm font-medium animate-pulse mt-4">
                <Loader2 className="h-5 w-5 animate-spin" />
                Transcribing with Whisper & Claude...
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Side: Structured Data Draft */}
        <Card
          className={`transition-all duration-500 ${
            transcriptData ? "border-emerald-200 ring-2 ring-emerald-200/40 bg-gradient-to-br from-emerald-50/60 to-white shadow-lg" : "border-slate-100"
          }`}
        >
          <CardHeader>
            <CardTitle>Session Review</CardTitle>
            <CardDescription>Review and edit structured notes before saving.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            
            {transcriptData ? (
              <div className="space-y-4 animate-in fade-in zoom-in duration-300">
                <div className="space-y-1">
                  <Label>Service Type</Label>
                  <Input defaultValue={transcriptData.serviceType} />
                </div>
                <div className="space-y-1">
                  <Label>Summary (For Handoffs)</Label>
                  <Textarea defaultValue={transcriptData.summary} rows={2} />
                </div>
                <div className="space-y-1">
                  <Label>Follow-up Actions Assigned</Label>
                  <Textarea defaultValue={transcriptData.actionItems} rows={2} className="border-green-200" />
                </div>
                <div className="space-y-1">
                  <Label>Next Visit / Follow-up Date</Label>
                  <Input defaultValue={transcriptData.suggestedFollowUpDate} type="date" />
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Original Transcript</Label>
                  <Textarea readOnly defaultValue={transcriptData.transcript} rows={3} className="text-xs bg-muted/50" />
                </div>
              </div>
            ) : (
              <div className="space-y-4 pt-4 border-t">
                <p className="text-sm text-muted-foreground italic mb-2">Or type manually (not recommended):</p>
                <div className="space-y-1">
                  <Label>Service Notes</Label>
                  <Textarea 
                    value={manualNote} 
                    onChange={e => setManualNote(e.target.value)} 
                    placeholder="Enter notes manually..." 
                    rows={8}
                    className="bg-muted/30"
                  />
                </div>
              </div>
            )}

          </CardContent>
          <CardFooter>
            <Button className="w-full gap-2">
              <Save className="h-4 w-4" /> Save Record
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
