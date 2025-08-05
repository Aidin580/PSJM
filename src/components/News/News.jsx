import React from 'react'
import styles from './News.module.css'
import NewsCard from '../NewsCard/NewsCard'



export default function News() {
  return (
    <div className={styles.News}>
     <div className={styles.Header}><h3>اطلاعیه های اخیر</h3></div>

     <div className={styles.Contents}>
     <NewsCard />
     <NewsCard />
      <NewsCard />
     <NewsCard />
      <NewsCard />
       
       
     <NewsCard />
      <NewsCard />
     <NewsCard />
       
     </div>
    </div>
  )
}
