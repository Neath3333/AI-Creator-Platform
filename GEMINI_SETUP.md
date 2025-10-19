# Google Gemini AI Setup Guide

Your AI content generation feature needs a Google Gemini API key to work.

## Step 1: Get Your Free Gemini API Key

1. **Go to Google AI Studio**
   - Visit: https://aistudio.google.com/app/apikey
   - Or: https://makersuite.google.com/app/apikey

2. **Sign in with Google Account**
   - Use any Google account (Gmail)

3. **Create API Key**
   - Click "Create API Key" button
   - Select "Create API key in new project" (or use existing project)
   - Copy the generated API key

## Step 2: Add API Key to Your Project

1. **Open `.env.local` file** in your project root

2. **Replace the placeholder:**
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

   With your actual key:
   ```
   GEMINI_API_KEY=AIzaSy...your-actual-key-here...
   ```
   **⚠️ IMPORTANT**: Replace with YOUR actual Gemini API key from Step 1

## Step 3: Restart Your Dev Server

**IMPORTANT:** Environment variables only load when the server starts.

1. **Stop your current dev server** (Ctrl+C in terminal)

2. **Restart it:**
   ```bash
   npm run dev
   ```

## Step 4: Test AI Generation

1. Go to `/dashboard/create` in your app
2. Enter a blog title (e.g., "10 Tips for Better Productivity")
3. Click the **Sparkles icon** (✨) or "Generate Content" button
4. AI should generate content within 3-5 seconds

## Features Using Gemini AI

### 1. **Generate Blog Content**
- Click ✨ Sparkles icon
- AI writes a full blog post based on your title
- Generates 800-1200 words with proper structure

### 2. **Improve Content**
- **Enhance**: Makes content more engaging
- **Expand**: Adds more details and examples
- **Simplify**: Makes content clearer and concise

## Gemini API Free Tier

**Free tier includes:**
- 15 requests per minute
- 1,500 requests per day
- 1 million requests per month
- **Completely free** for individual developers

**Model used:** `gemini-1.5-flash` (fast and efficient)

## Troubleshooting

### Error: "AI service configuration error"
**Cause:** API key is missing or invalid
**Solution:**
1. Check your `.env.local` has `GEMINI_API_KEY=...`
2. Verify the key is correct (no extra spaces)
3. Restart your dev server

### Error: "AI service is temporarily unavailable"
**Cause:** Rate limit exceeded or quota reached
**Solution:**
1. Wait a few minutes and try again
2. Check your quota at https://aistudio.google.com/

### AI Generates Nothing
**Cause:** Title is empty or too short
**Solution:** Enter a meaningful blog title before clicking generate

### Content Generation is Slow
**Cause:** Normal - AI takes time to think
**Solution:** Wait 3-10 seconds. You'll see a loading spinner.

## Alternative: Use Different AI Provider

If you prefer, you can modify the code to use:
- **OpenAI GPT** (requires paid API key)
- **Anthropic Claude** (requires API key)
- **Local AI models** (free but requires setup)

Current implementation uses Gemini because:
- ✅ Free tier is generous
- ✅ Fast response times
- ✅ Good quality content
- ✅ No credit card required

## Security Note

⚠️ **Never commit your API key to GitHub!**

The `.env.local` file is already in `.gitignore`, so your key stays private.

## Need Help?

- Gemini API Docs: https://ai.google.dev/docs
- Get API Key: https://aistudio.google.com/app/apikey
- Check Usage: https://aistudio.google.com/
