const { OpenAI } = require('openai')
require('dotenv').config()
const apiKey = process.env.OPENAI_API_KEY

const openai = new OpenAI({apiKey})

async function analyzePosts(posts) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // check model: gpt-4-1106-preview
      messages: [{"role": "user", "content": `Determine if the following text is positive, negative, or neutral: \n\n${posts}`}],
    })

    console.log(response.choices, response.choices[0], response.choices[0].message.content)
    return response.choices[0].message.content

  } catch (error) {
    console.error('Error during API call:', error)
  }
}

module.exports = analyzePosts
