# ImageKit Background Removal Setup Guide

## Problem
Background removal and drop shadow features require additional ImageKit configuration.

## Solutions

### Option 1: Disable These Features (Quick Fix)
If you don't need AI background removal, you can hide these features from the UI.

In `src/components/image-upload-modal.tsx`, comment out the background removal section.

### Option 2: Use Remove.bg API Integration (Recommended)
ImageKit doesn't have built-in AI background removal. Integrate with remove.bg:

1. **Get remove.bg API key**
   - Sign up at https://www.remove.bg/api
   - Get your API key

2. **Add to `.env.local`**
   ```
   REMOVE_BG_API_KEY=your_api_key_here
   ```

3. **Create remove.bg API route**
   Create `src/app/api/remove-bg/route.ts`:
   ```typescript
   import { NextResponse } from "next/server";
   import { auth } from "@clerk/nextjs/server";

   export async function POST(request: Request) {
     const { userId } = await auth();
     if (!userId) {
       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
     }

     const { imageUrl } = await request.json();

     const response = await fetch("https://api.remove.bg/v1.0/removebg", {
       method: "POST",
       headers: {
         "X-Api-Key": process.env.REMOVE_BG_API_KEY!,
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         image_url: imageUrl,
         size: "auto",
       }),
    });

     if (!response.ok) {
       return NextResponse.json(
         { error: "Background removal failed" },
         { status: 500 }
       );
     }

     const buffer = await response.arrayBuffer();
     return new NextResponse(buffer, {
       headers: {
         "Content-Type": "image/png",
       },
     });
   }
   ```

### Option 3: Use ImageKit Extensions (If Available)
Check if your ImageKit plan supports AI extensions:

1. Go to https://imagekit.io/extensions
2. Check for background removal extensions
3. Enable and configure according to their docs

## Current Implementation Status

✅ **Working**:
- Image upload
- Resize & crop
- Text overlay
- Aspect ratio transformations

⚠️ **Requires Setup**:
- Background removal (needs remove.bg or ImageKit extension)
- Drop shadow (works with padding, but limited without bg removal)

## Testing

After setup, check the browser console for:
- Transformation chain (shows what transforms are applied)
- Generated URL (shows the ImageKit URL with parameters)

Example URL format:
```
https://ik.imagekit.io/your-id/tr:w-800,h-600,n-remove_bg,p-15,pc-00000050/image.jpg
```

Parameters:
- `w-800,h-600` = resize
- `n-remove_bg` = named transformation (background removal)
- `p-15` = padding for shadow effect
- `pc-00000050` = padding color (semi-transparent black)
