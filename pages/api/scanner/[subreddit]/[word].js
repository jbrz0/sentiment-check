import axios from 'axios'
import extractPosts from '../../../../utils/extractPosts'

export default async function handler(req, res) {
  const { query: { word, subreddit } } = req

  try {
    const response = await axios.get(`http://www.reddit.com/r/${subreddit}/search.json?q=${word}&restrict_sr=on&t=week`)
    const searchResults = response.data.data.children;

    const analyzedPosts = await extractPosts(searchResults)
    res.status(200).json(analyzedPosts)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
