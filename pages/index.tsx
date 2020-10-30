import Head from 'next/head'
import React from 'react'
import { From } from '../components/From'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Rysvägen 16 - Spökrunda</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Välkommen till RYSVÄGEN 16
        </h1>
        <div className={styles.block}>
        <p>
          Du går spökrundan genom skanna de utplacerade QR koderna.
        </p>
        <p>
          Det finns totalt 10 frågor, alla måste besvaras!
        </p>
        <p className={styles.halloween}>
          Men se upp, det finns farliga spöken lösa på tomtem. 
        </p>
        </div>
        <div className={styles.block}>
          <From />
        </div>
        <p></p>
      </main>
    </div>
  )
}
