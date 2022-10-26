import styles from './page.module.css'

import { publicEnv } from '../env/publicEnv'

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <code>
          Client environment:{' '}
          {<pre>{JSON.stringify(publicEnv, null, 4)}</pre>}
        </code>
        <p>
          <a href="/api/hello">Server environment</a>
        </p>
      </main>
    </div>
  )
}
