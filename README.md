# Reddit Mood

<img src="/public/readme/1 - iphone.png">  
<img src="/public/readme/2 - vinyl.png">  
<img src="/public/readme/3 - openai.png">  
<img src="/public/readme/4 - wsb.png">  

## Overview

Scan a subreddit for all posts with a keyword, and determine the sentiment (positive, negative or neutral)

- Pulls the top posts from the week
- Uses OpenAI API


## Getting Started

1. Install packages `npm i`

2. Add OpenAI API key to new `.env` file (sample included - `.env.sample`)

3. To run both nextjs and the express server (dev mode) `npm run dev`

4. Build and deploy via `npm run build` / `npm start`

## Notes

- Extracted post data/settings: `/utils/extractPosts.js`
- AI prompt/model config: `/utils/analyzePosts.js`
- Local server config: `/server/index.js`

