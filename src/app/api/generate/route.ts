import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google AI client with your API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function POST(request: Request) {
  try {
    const { creatorName, friendName, roastLevel } = await request.json();

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Create the prompt for the model
    const prompt = `Write a short, funny, ${roastLevel}-level roast timeline about the friendship between ${creatorName} and ${friendName}.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const story = response.text();

    return NextResponse.json({ story });

  } catch (error) {
    console.error("Error in /api/generate:", error);
    return NextResponse.json({ error: 'Failed to generate story' }, { status: 500 });
  }
}