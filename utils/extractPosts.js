const analyzePosts = require('./analyzePosts');

const extractPosts = async (input) => {
  // Create an array to hold the post details
  let posts = input.map(item => ({
    title: item.data.title,
    selfText: item.data.selftext, // Adding selftext
    createdUtc: item.data.created_utc,
    permalink: item.data.permalink,
    upvoteRatio: item.data.upvote_ratio,
    score: item.data.score,
    url: item.data.url,
    combinedAnalysis: item.data.title + ' ' + item.data.selftext, // Combine title and selftext for analysis
  }));

  // Combine all texts for a single analysis call
  let combinedText = posts.map(post => post.combinedAnalysis).join(' ')

  // Analyze the combined text
  try {
    const decision = await analyzePosts(combinedText)

    // Associate the decision with each post
    posts = posts.map(post => ({ ...post, decision }))
  } catch (error) {
    console.error('Error during analysis:', error)
  }

  return posts
}

module.exports = extractPosts
