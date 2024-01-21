const analyzePosts = require('./analyzePosts')

const extractPosts = async (input) => {

  const formattedData = await Promise.all(input.map(async item => {

    const allText = item.data.title + ' ' + item.data.selftext

    if (item.pinned === false || item.banned_by !== null) {

      return {
        title: item.data.title,
        decision: await analyzePosts(allText),
        createdUtc: item.data.created_utc,
        permalink: item.data.permalink,
        upvoteRatio: item.data.upvote_ratio,
        score: item.data.score,
        url: item.data.url,
        combinedAnalysis: allText,
      }
    }

    return null

  }))

  // Filter out null values
  return formattedData.filter(post => post !== null)
}

module.exports = extractPosts
