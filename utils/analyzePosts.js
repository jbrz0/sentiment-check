// const axios = require('axios');

// async function analyzePosts(posts) {
//   try {
//     const response = await axios({
//       method: 'post',
//       url: 'https://api.openai.com/v1/classifications',
//       headers: {
//         'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
//         'Content-Type': 'application/json'
//       },
//       data: {
//         'query': posts,
//         'labels': ["Positive", "Negative", "Neutral"],
//         'model': "davinci"
//       },
//     });

//     return response.data.label;
//   } catch (error) {
//     // Improved error handling
//     if (error.response) {
//       // The server responded with a status code that falls out of the range of 2xx
//       console.error("Error response data:", error.response.data);
//       console.error("Error status:", error.response.status);
//       console.error("Error headers:", error.response.headers);
//     } else if (error.request) {
//       // The request was made but no response was received
//       console.error("Error request:", error.request);
//     } else {
//       // Something else caused the error
//       console.error("Error message:", error.message);
//     }
//     console.error("Error config:", error.config);
//   }
// }

// module.exports = analyzePosts;

const { OpenAI } = require('openai')
require('dotenv').config()
const apiKey = process.env.OPENAI_API_KEY

const openai = new OpenAI({apiKey})

async function analyzePosts(posts) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // check model: gpt-4-1106-preview
      messages: [{"role": "user", "content": `Determine if the following text is positive, negative, or neutral: \n\n${posts}`}],
      // prompt: `Determine if the following text is positive, negative, or neutral: \n\n${posts}`,
      // max_tokens: 60
      // maxRetries: 5
    });

    // console.log(response.choices[0].message.content)
    return response.choices[0].message.content

  } catch (error) {
    console.error('Error during API call:', error)
  }
}

module.exports = analyzePosts
