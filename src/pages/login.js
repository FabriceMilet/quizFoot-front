import Head from 'next/head'
import styles from '../styles/Login.module.scss'

export default function Login({}) {

  return (
    <div>
      <Head>
        <title>Trouve la compo</title>
        <meta name="description" content="Page de connexion du jeux, quiz sur le football. Le but est de trouver la compo d'un match de foot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/tlc.png" />
      </Head>
    <main className={styles.container}>
   ici viendra la page de Login
    </main>
    </div>
  )
}