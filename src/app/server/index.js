const express = require('express')
const cors = require('cors')
const axios = require('axios')
const extractPosts = require('../utils/extractPosts')

const app = express()
require('dotenv').config()
app.use(cors())

const PORT = process.env.PORT || 8080

app.get('/scanner/:subreddit/:word', async (req, res) => {
  const { word, subreddit } = req.params

  try {
    const response = await axios.get(`http://www.reddit.com/r/${subreddit}/search.json?q=${word}&restrict_sr=on&t=week`)
    const searchResults = response.data.data.children

    const analyzedPosts = await extractPosts(searchResults)
    res.json(analyzedPosts);

  } 
  
  catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.listen(PORT, () => console.log(`Live on port ${PORT}!`))

module.exports = app
