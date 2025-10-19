"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// List of model names to try in order of preference (based on actual available models)
const MODEL_FALLBACKS = [
  "models/gemini-flash-latest",      // Always points to latest Flash
  "models/gemini-2.5-flash",          // Stable Gemini 2.5 Flash
  "models/gemini-2.0-flash",          // Stable Gemini 2.0 Flash
  "models/gemini-pro-latest",         // Always points to latest Pro
  "models/gemini-2.5-pro",            // Stable Gemini 2.5 Pro
  "models/gemini-2.0-flash-001",      // Fallback to specific version
  "gemini-flash-latest",              // Try without models/ prefix
  "gemini-2.5-flash"                  // Last resort
];

export async function generateBlogContent(
  title: string,
  category: string = "",
  tags: string[] = []
) {
  try {
    if (!title || title.trim().length === 0) {
      throw new Error("Title is required to generate content");
    }

    // Create a detailed prompt for blog content generation
    const prompt = `
Write a comprehensive blog post with the title: "${title}"

${category ? `Category: ${category}` : ""}
${tags.length > 0 ? `Tags: ${tags.join(", ")}` : ""}

Requirements:
- Write engaging, informative content that matches the title
- Use proper HTML formatting with headers (h2, h3), paragraphs, lists, and emphasis
- Include 3-5 main sections with clear subheadings
- Write in a conversational yet professional tone
- Make it approximately 800-1200 words
- Include practical insights, examples, or actionable advice where relevant
- Use <h2> for main sections and <h3> for subsections
- Use <p> tags for paragraphs
- Use <ul> and <li> for bullet points when appropriate
- Use <strong> and <em> for emphasis
- Ensure the content is original and valuable to readers

Do not include the title in the content as it will be added separately.
Start directly with the introduction paragraph.
`;

    // Try different models until one works
    let content = "";
    let lastError;

    for (const modelName of MODEL_FALLBACKS) {
      try {
        console.log(`Trying model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        content = response.text();
        console.log(`✅ Successfully generated content with model: ${modelName}`);
        break;
      } catch (e) {
        lastError = e;
        console.log(`❌ Model ${modelName} failed:`, e instanceof Error ? e.message : "Unknown error");
        continue;
      }
    }

    if (!content) {
      console.error("All model attempts failed. Last error:", lastError);
      throw lastError || new Error("Failed to generate content with any available model");
    }

    // Basic validation
    if (!content || content.trim().length < 100) {
      throw new Error("Generated content is too short or empty");
    }

    return {
      success: true,
      content: content.trim(),
    };
  } catch (error) {
    console.error("Gemini AI Error:", error);

    // Handle specific error types
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    if (errorMessage?.includes("API key")) {
      return {
        success: false,
        error: "AI service configuration error. Please try again later.",
      };
    }

    if (errorMessage?.includes("quota") || errorMessage?.includes("limit")) {
      return {
        success: false,
        error: "AI service is temporarily unavailable. Please try again later.",
      };
    }

    return {
      success: false,
      error: errorMessage || "Failed to generate content. Please try again.",
    };
  }
}

export async function improveContent(
  currentContent: string,
  improvementType: "enhance" | "expand" | "simplify" = "enhance"
) {
  try {
    if (!currentContent || currentContent.trim().length === 0) {
      throw new Error("Content is required for improvement");
    }

    let prompt = "";

    switch (improvementType) {
      case "expand":
        prompt = `
Take this blog content and expand it with more details, examples, and insights:

${currentContent}

Requirements:
- Keep the existing structure and main points
- Add more depth and detail to each section
- Include practical examples and insights
- Maintain the original tone and style
- Return the improved content in the same HTML format
`;
        break;

      case "simplify":
        prompt = `
Take this blog content and make it more concise and easier to read:

${currentContent}

Requirements:
- Keep all main points but make them clearer
- Remove unnecessary complexity
- Use simpler language where possible
- Maintain the HTML formatting
- Keep the essential information
`;
        break;

      default: // enhance
        prompt = `
Improve this blog content by making it more engaging and well-structured:

${currentContent}

Requirements:
- Improve the flow and readability
- Add engaging transitions between sections
- Enhance with better examples or explanations
- Maintain the original HTML structure
- Keep the same length approximately
- Make it more compelling to read
`;
    }

    // Try different models until one works
    let improvedContent = "";
    let lastError;

    for (const modelName of MODEL_FALLBACKS) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        improvedContent = response.text();
        console.log(`✅ Successfully improved content with model: ${modelName}`);
        break;
      } catch (e) {
        lastError = e;
        console.log(`❌ Model ${modelName} failed for improvement`);
        continue;
      }
    }

    if (!improvedContent) {
      throw lastError || new Error("Failed to improve content with any available model");
    }

    return {
      success: true,
      content: improvedContent.trim(),
    };
  } catch (error) {
    console.error("Content improvement error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to improve content. Please try again.",
    };
  }
}
