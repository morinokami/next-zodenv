import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { publicEnv } from '../env/publicEnv'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <p>
          <code>
            Client environment:{' '}
            {<pre>{JSON.stringify(publicEnv, null, 4)}</pre>}
          </code>
        </p>
        <p>
          <a href="/api/hello">Server environment</a>
        </p>
      </main>
    </div>
  )
}

export default Home
