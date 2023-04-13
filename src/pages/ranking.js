import Head from 'next/head'
import styles from '../styles/Ranking.module.scss'

export default function Ranking({}) {

  return (
    <div>
      <Head>
        <title>Classement général</title>
        <meta name="description" content="Classement général du jeux, quiz sur le football. Le but est de trouver la compo d'un match de foot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <main className={styles.container}>
   ici viendra la page de classement général
    </main>
    </div>
  )
}
