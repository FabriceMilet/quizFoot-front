import Head from 'next/head'
import styles from '../styles/Search.module.scss'

export default function Search({}) {

  return (
    <div>
      <Head>
        <title>Choisis ton match</title>
        <meta name="description" content="Page de recherche du jeux, quiz sur le football. Le but est de trouver la compo d'un match de foot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <main className={styles.container}>
   ici viendra la page de recherche
    </main>
    </div>
  )
}
