async function analyzePosts(posts) {
  try {
    const response = await fetch('https://api.openai.com/v1/classifications', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: posts,
        labels: ["Positive", "Negative", "Neutral"],
        model: "davinci"
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'API request failed')
    }

    return data.label

  } catch (error) {
    console.error('Error during API call:', error.message)
  }
}

module.exports = analyzePosts
