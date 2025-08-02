// app/api/ollama/route.ts

import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { prompt } = await req.json()

  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'llama3.2', // or 'mistral', 'gemma', etc.
      prompt,
      stream: false,
    }),
  })

  const data = await response.json()

  return NextResponse.json({ response: data.response })
}
