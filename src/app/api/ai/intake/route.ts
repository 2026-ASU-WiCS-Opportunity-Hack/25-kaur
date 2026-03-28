import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // In production, we would convert this file to base64 and send it to Anthropic Claude Vision
    // Example:
    // const buffer = Buffer.from(await file.arrayBuffer())
    // const base64Image = buffer.toString('base64')
    // const response = await anthropic.messages.create({ ... })
    // ... parse JSON from response

    // Mock response for hackathon demo
    const mockExtractedData = {
      name: "Samantha Robles",
      dob: "1994-08-22",
      phone: "555-9876",
      email: "s.robles@example.com",
      householdSize: "4",
      dietaryNeeds: "Gluten-Free, No Pork"
    }

    return NextResponse.json(mockExtractedData)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process image' }, { status: 500 })
  }
}
