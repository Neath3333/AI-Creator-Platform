# How to Check ImageKit Transformations - Debug Guide

## Step 1: Open Browser Console

### Option A: Using Keyboard
- **Windows/Linux**: Press `F12` or `Ctrl + Shift + I`
- **Mac**: Press `Cmd + Option + I`

### Option B: Using Menu
1. Right-click anywhere on the page
2. Click "Inspect" or "Inspect Element"
3. Click the "Console" tab at the top

## Step 2: Clear Console
- Click the 🚫 (clear) button in the console to start fresh

## Step 3: Test Image Upload & Transformation

1. **Upload an Image**
   - Click the upload area in your app
   - Select an image file
   - Wait for upload to complete
   - You should see: `Image uploaded successfully!`

2. **Go to Transform Tab**
   - Click "Transform" tab or "Start Transforming" button

3. **Enable Background Removal**
   - Toggle on "Remove Background"
   - You should see it turn blue/active

4. **Enable Drop Shadow**
   - Toggle on "Drop Shadow"
   - Should only work if background removal is enabled

5. **Apply Transformations**
   - Click "Apply Transformations" button
   - Watch the console for output

## Step 4: What to Look For in Console

### ✅ GOOD Output (Working):
```
Building transformation URL from: {
  src: "https://ik.imagekit.io/tqidir5vl/...",
  transformations: [{ effects: ["bgremove", "dropshadow"] }]
}

Transformation chain: [{ effects: ["bgremove", "dropshadow"] }]

Generated transform params: e-bgremove,e-dropshadow

Generated URL: https://ik.imagekit.io/tqidir5vl/tr:e-bgremove,e-dropshadow/...

Final transformed URL: https://ik.imagekit.io/tqidir5vl/tr:e-bgremove,e-dropshadow/...
```

### ❌ BAD Output (Errors):

**Error 1: Image Load Error**
```
Image load error: {
  src: "https://ik.imagekit.io/...",
  error: ...
}
```
**Solution**: ImageKit AI features may not be enabled. Check step 5 below.

**Error 2: 404 Not Found**
```
GET https://ik.imagekit.io/... 404 (Not Found)
```
**Solution**: Invalid transformation or image not found.

**Error 3: 403 Forbidden**
```
GET https://ik.imagekit.io/... 403 (Forbidden)
```
**Solution**: AI features not enabled or plan doesn't support them.

## Step 5: Check ImageKit Dashboard

### Check if AI Features Are Enabled

1. **Go to ImageKit Dashboard**
   - Visit: https://imagekit.io/dashboard
   - Log in with your account

2. **Check Extensions**
   - Go to: https://imagekit.io/extensions
   - Look for "Background Removal" extension
   - Check if it's installed/enabled

3. **Check Your Plan**
   - Go to Settings → Billing
   - Check if your plan includes AI transformations
   - Free plans may have limited AI features

4. **Check Usage Limits**
   - Go to Usage & Limits
   - See if you've exceeded AI transformation quota

## Step 6: Check Network Tab

1. Click "Network" tab in DevTools (next to Console)
2. Filter by "Img" or "All"
3. Apply transformations again
4. Look for the ImageKit request
5. Click on it to see:
   - Request URL
   - Status Code (200 = good, 403/404 = error)
   - Response (error message if any)

## Step 7: Test with Simple Transformation First

If background removal isn't working, test with basic transformations:

1. **Disable** background removal
2. **Disable** drop shadow
3. **Only enable** resize (change aspect ratio)
4. Click "Apply Transformations"
5. Does the image resize? ✅ = ImageKit working, ❌ = configuration issue

## Step 8: Manual URL Test

Copy the generated URL from console and paste it directly in browser:

**Example URL:**
```
https://ik.imagekit.io/tqidir5vl/tr:e-bgremove,e-dropshadow/userId/timestamp_filename.jpg
```

**What happens?**
- ✅ Image loads with effect applied = Working!
- ❌ Error page = ImageKit configuration issue
- ❌ Image loads without effect = AI features not enabled

## Common Issues & Solutions

### Issue 1: "Failed to load transformed image"
**Cause**: ImageKit returned error or invalid URL
**Solution**:
- Check console for exact URL
- Paste URL in browser to see ImageKit error message
- Verify AI features enabled in dashboard

### Issue 2: Image loads but no background removal
**Cause**: AI features not enabled or plan limitation
**Solution**:
- Enable Background Removal extension in ImageKit
- Upgrade plan if needed
- Check quota limits

### Issue 3: Transformation works but very slow
**Cause**: AI transformations take time to process
**Solution**: This is normal, wait 3-5 seconds for first load

### Issue 4: Works once but not on subsequent tries
**Cause**: ImageKit quota exceeded
**Solution**: Check usage limits in dashboard

## Alternative: Test ImageKit Directly

Test if ImageKit AI works outside your app:

1. Go to: https://imagekit.io/tools/remove-background/
2. Upload an image
3. See if background removal works
4. If this works but your app doesn't → configuration issue
5. If this doesn't work → account/plan issue

## What to Report Back

After checking, tell me:

1. ✅/❌ Does console show the logs?
2. ✅/❌ What is the generated URL? (copy-paste it)
3. ✅/❌ Does the URL work when pasted in browser?
4. ✅/❌ What error appears in Network tab?
5. ✅/❌ Are AI features enabled in ImageKit dashboard?
6. ✅/❌ What is your ImageKit plan? (Free/Paid)

## Quick Command to Check

Run your dev server and navigate to the image upload page:
```bash
npm run dev
```

Then follow the steps above!
