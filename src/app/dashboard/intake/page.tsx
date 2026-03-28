"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, UploadCloud, FileText, CheckCircle2 } from "lucide-react"

export default function AIIntakePage() {
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [extractedData, setExtractedData] = useState<any>(null)

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
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
          <Sparkles className="h-6 w-6" /> Photo-to-Intake
        </h2>
        <p className="text-muted-foreground mt-2">
          Upload a photo of a paper intake form. Claude Vision AI will extract the text and pre-fill the client record for you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border-t-4 border-t-primary">
          <CardHeader>
            <CardTitle>1. Upload Paper Form</CardTitle>
            <CardDescription>Supported formats: JPG, PNG, HEIC</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-primary/20 rounded-lg p-8 flex flex-col items-center justify-center bg-muted/30">
              <UploadCloud className="h-10 w-10 text-primary mb-4" />
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
              className="w-full gap-2" 
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
        <Card className={`transition-all duration-500 ${extractedData ? 'border-primary ring-2 ring-primary/20' : 'opacity-50 pointer-events-none'}`}>
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
