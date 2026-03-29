"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PageHero } from "@/components/dashboard/page-hero"
import { Sparkles, UploadCloud, FileText, CheckCircle2 } from "lucide-react"

export default function AIIntakePage() {
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [extractedData, setExtractedData] = useState<any>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleProcessImage = async () => {
    if (!file) return
    
    setIsProcessing(true)
    
    // In a real hackathon project, we'd send FormData to /api/ai/intake
    // Mocking the Claude Vision delay and response 
    setTimeout(() => {
      setExtractedData({
        name: "Samantha Robles",
        dob: "1994-08-22",
        phone: "555-9876",
        email: "s.robles@example.com",
        householdSize: "4",
        dietaryNeeds: "Gluten-Free, No Pork"
      })
      setIsProcessing(false)
    }, 2500)
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <PageHero
        title="Photo-to-intake"
        subtitle="Upload a paper form snapshot. AI extracts fields so you can review and save in seconds."
        variant="compact"
        badge={
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-emerald-200">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            Vision AI
          </p>
        }
      />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card className="overflow-hidden border-emerald-100/80 border-t-4 border-t-emerald-600 bg-white/90 shadow-lg shadow-emerald-900/5">
          <CardHeader>
            <CardTitle>1. Upload Paper Form</CardTitle>
            <CardDescription>Supported formats: JPG, PNG, HEIC</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              onDragOver={(e) => {
                e.preventDefault()
                setIsDragging(true)
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault()
                setIsDragging(false)
                const f = e.dataTransfer.files?.[0]
                if (f && f.type.startsWith("image/")) setFile(f)
              }}
              className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 transition-all duration-200 ${
                isDragging
                  ? "scale-[1.02] border-emerald-400 bg-emerald-50 shadow-inner"
                  : "border-emerald-200/60 bg-gradient-to-br from-slate-50 to-emerald-50/30"
              }`}
            >
              <UploadCloud className="mb-4 h-10 w-10 text-emerald-600" />
              <Label htmlFor="file-upload" className="cursor-pointer bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
                Choose Image
              </Label>
              <Input 
                id="file-upload" 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleFileUpload} 
              />
              {file && (
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
                  <FileText className="h-4 w-4" />
                  {file.name}
                </div>
              )}
            </div>
            
            <Button 
              className="w-full gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 shadow-md hover:from-emerald-500 hover:to-teal-500" 
              onClick={handleProcessImage} 
              disabled={!file || isProcessing}
            >
              {isProcessing ? "Extracting Data..." : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Process with AI
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Dynamic Extracted Form */}
        <Card className={`transition-all duration-500 ${extractedData ? "border-emerald-200 ring-2 ring-emerald-200/50 shadow-lg" : "pointer-events-none opacity-50"}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              2. Review & Save
            </CardTitle>
            <CardDescription>Verify the AI-extracted fields before saving.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-1">
                <Label>Full Name</Label>
                <Input defaultValue={extractedData?.name} />
              </div>
              <div className="space-y-1">
                <Label>Date of Birth</Label>
                <Input defaultValue={extractedData?.dob} type="date" />
              </div>
              <div className="space-y-1">
                <Label>Phone Number</Label>
                <Input defaultValue={extractedData?.phone} />
              </div>
              <div className="col-span-2 space-y-1">
                <Label>Email</Label>
                <Input defaultValue={extractedData?.email} type="email" />
              </div>
              
              <div className="col-span-2 mt-4 pt-4 border-t text-sm font-medium text-muted-foreground">
                Organization Custom Fields
              </div>
              
              <div className="space-y-1">
                <Label>Household Size</Label>
                <Input defaultValue={extractedData?.householdSize} type="number" />
              </div>
              <div className="col-span-2 space-y-1">
                <Label>Dietary Needs</Label>
                <Input defaultValue={extractedData?.dietaryNeeds} />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Save New Client</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
