import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY not configured" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Try to list models
    try {
      const models = await genAI.listModels();

      return NextResponse.json({
        success: true,
        availableModels: models.models?.map(m => ({
          name: m.name,
          displayName: m.displayName,
          description: m.description,
          supportedMethods: m.supportedGenerationMethods
        })) || [],
        totalModels: models.models?.length || 0
      });
    } catch (listError) {
      // If listing fails, try a direct API call
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
      );

      const data = await response.json();

      return NextResponse.json({
        success: true,
        availableModels: data.models || [],
        rawResponse: data
      });
    }
  } catch (error) {
    console.error("Error listing models:", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      details: error
    }, { status: 500 });
  }
}
