"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Mic, Square, Sparkles, Loader2, Save } from "lucide-react"

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
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
           Log Client Session
        </h2>
        <p className="text-muted-foreground mt-1">
          Client ID: #{params.id}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Side: Voice Input */}
        <Card className="border-t-4 border-t-primary">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Voice-to-Notes</span>
              <Sparkles className="h-5 w-5 text-primary" />
            </CardTitle>
            <CardDescription>Record your session summary. AI will structure it automatically.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 flex flex-col items-center pt-8 pb-12">
            
            <button
              onClick={handleRecordToggle}
              className={`relative flex items-center justify-center h-24 w-24 rounded-full transition-all duration-300 ${
                isRecording 
                  ? 'bg-red-100 text-red-600 animate-pulse ring-4 ring-red-100 dark:bg-red-900/40' 
                  : 'bg-primary/10 text-primary hover:bg-primary/20'
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
        <Card className={`transition-all duration-500 ${transcriptData ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : ''}`}>
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
