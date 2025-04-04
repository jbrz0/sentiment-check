'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { usePathname } from 'next/navigation'
import styles from './styles/Home.module.css'

export default function Home() {

  const [subreddit, setSubreddit] = useState()
  const [keyword, setKeyword] = useState()
  const [validate, setValidate] = useState(null)
  const [answer, setAnswer] = useState()
  const [loading, setLoading] = useState(false)


  const search = async (e) => {
    e.preventDefault()
    setValidate(null)
    setLoading(true)
  
    if (!subreddit) {
      setValidate('Enter a subreddit')
    } 
    
    else if (!keyword) {
      setValidate('Enter a keyword')
    } 
    
    else {

      try {
        const response = await axios.get(`${window.location.origin}/api/scanner/${subreddit}/${keyword}`)
        // console.log(response.data)
        setAnswer(response.data)
        setLoading(false)
      } 
      
      catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }
  }

  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Reddit Mood
        </h1>

        {validate && <div className={styles.validate}>{validate}</div>}
        {!validate && <div className={styles.info}>See how people are feeling at r/

        <span className={styles.highlight}>{subreddit ? subreddit : 'aSubreddit'}</span>
        {' '}about{' '}
        <span className={styles.highlight}>{keyword ? keyword : 'something'}</span></div>}

        <form onSubmit={search}>
          <p className={styles.description}>
            Scan {' '}
            <input className={styles.code} type="text" placeholder="subreddit" onChange={(e) => setSubreddit(e.target.value)} />
            {' '} for {' '}
            <input className={styles.code} type="text" placeholder="keyword" onChange={(e) => setKeyword(e.target.value)} />
            <button className={styles.button} onClick={search} type="submit">
              {loading ? <div className={styles.loader}></div> : 'Go'}
            </button>
          </p>
        </form>

        {answer && !loading ? <p className={styles.answer}>{answer}</p> : ''}

        <div className={styles.os}>
          <a href="https://x.com/jbrz0" target="_blank">@jbrz0</a>
        </div>

      </main>
    </div>
  )
}
