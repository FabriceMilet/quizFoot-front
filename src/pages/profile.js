import Head from 'next/head'
import styles from '../styles/Profile.module.scss'

export default function Profile({}) {
// on va pouvoir mettre le nom de l'user comme titre
  return (
    <div>
      <Head>
        <title>Page de profil</title>
        <meta name="description" content="Page de profil du jeux, quiz sur le football. Le but est de trouver la compo d'un match de foot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <main className={styles.container}>
   ici viendra la page de profil
    </main>
    </div>
  )
}