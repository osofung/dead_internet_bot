# Dead Internet Bot

Dead Internet Bot is a parody browser extension that analyzes short-form social media content and generates fake NPC-style comments as a joke.

## Current milestone

Version 0.1.0:
- Loads as a Chrome extension
- Detects YouTube Shorts pages
- Reads the current page title and URL from a content script
- Displays the result in the popup

## Local setup

1. Open Chrome and go to `chrome://extensions/`
2. Turn on **Developer mode**
3. Click **Load unpacked**
4. Select this project folder
5. Open a YouTube Shorts page
6. Click the extension icon
7. Press **Check current page**

## Next steps

- Extract visible comments from Shorts
- Add on-page overlay
- Send page data to Python backend
- Generate parody comments with AI
- Support Instagram Reels