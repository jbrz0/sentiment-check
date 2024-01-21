'use client'

import { useState } from 'react'
import axios from 'axios'
import styles from './styles/Home.module.css'

export default function Home() {

  const [subreddit, setSubreddit] = useState()
  const [keyword, setKeyword] = useState()
  const [validate, setValidate] = useState(null)
  const [answer, setAnswer] = useState()

  const search = async (e) => {
    e.preventDefault()
    setValidate(null)
  
    if (!subreddit) {
      setValidate('Enter a subreddit')
    } 
    
    else if (!keyword) {
      setValidate('Enter a keyword')
    } 
    
    else {

      try {
        const response = await axios.get(`http://localhost:8080/scanner/${subreddit}/${keyword}`)
        // console.log(response.data)
        setAnswer(response.data)
      } 
      
      catch (error) {
        console.error('Error fetching data:', error)
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
            <button className={styles.button} onClick={search} type="submit">Go</button>
          </p>
        </form>

        {answer ? <p className={styles.answer}>{answer}</p> : ''}

      </main>
    </div>
  )
}
