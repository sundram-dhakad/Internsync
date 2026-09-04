import { NextResponse } from "next/server"

const responseSchema = {
  type: "OBJECT",
  properties: {
    personalInfo: {
      type: "OBJECT",
      properties: {
        firstName: { type: "STRING" },
        lastName: { type: "STRING" },
        email: { type: "STRING" },
        phone: { type: "STRING" },
        address: { type: "STRING" },
        city: { type: "STRING" },
        state: { type: "STRING" },
        pincode: { type: "STRING" },
      },
      required: ["firstName", "lastName", "email", "phone", "address", "city", "state", "pincode"],
    },
    education: {
      type: "OBJECT",
      properties: {
        university: { type: "STRING" },
        degree: { type: "STRING" },
        gpa: { type: "STRING" },
        graduationYear: { type: "STRING" },
      },
      required: ["university", "degree", "gpa", "graduationYear"],
    },
    skills: { type: "ARRAY", items: { type: "STRING" } },
  },
  required: ["personalInfo", "education", "skills"],
}

const sleep = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds))

async function requestGemini(model: string, apiKey: string, prompt: string) {
  return fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0,
          responseMimeType: "application/json",
          responseSchema,
        },
      }),
    },
  )
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: "GEMINI_API_KEY is not configured" }, { status: 503 })
  }

  const body = await request.json().catch(() => null)
  const text = typeof body?.text === "string" ? body.text.trim() : ""
  if (!text) {
    return NextResponse.json({ error: "Resume text is required" }, { status: 400 })
  }

  const prompt = `Extract the resume into the requested JSON schema. Use only facts present in the resume. Never guess or move a value into a different field. Return empty strings for missing scalar values and an empty array for missing skills. Split a person's full name into firstName and lastName. Keep university, degree, phone, address, city, state, postal code, GPA, and graduation year in their appropriate fields. Normalize skills into short names without duplicates.\n\nRESUME TEXT:\n${text.slice(0, 50000)}`

  let response = await requestGemini("gemini-3.6-flash", apiKey, prompt)
  if (response.status === 503) {
    await sleep(1000)
    response = await requestGemini("gemini-3.6-flash", apiKey, prompt)
  }
  if (response.status === 503) {
    response = await requestGemini("gemini-2.5-flash-lite", apiKey, prompt)
  }

  if (!response.ok) {
    const message = await response.text()
    return NextResponse.json({ error: `Resume agent request failed: ${message}` }, { status: 502 })
  }

  const result = await response.json()
  const generatedText = result.candidates?.[0]?.content?.parts?.[0]?.text
  if (typeof generatedText !== "string") {
    return NextResponse.json({ error: "Resume agent returned no structured data" }, { status: 502 })
  }

  try {
    return NextResponse.json(JSON.parse(generatedText))
  } catch {
    return NextResponse.json({ error: "Resume agent returned invalid structured data" }, { status: 502 })
  }
}
