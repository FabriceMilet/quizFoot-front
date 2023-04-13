import Head from 'next/head'
import styles from '../styles/Quiz.module.scss'


export default function Home() {
  return (
    <div>
      <Head>
        {/* ici on pourra mettre le nom du quiz en titre */}
        <title>Trouve la compo</title>
        <meta name="description" content="Jeux, quiz sur le football. Le but est de trouver la compo d'un match de foot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/tlc.png" />
      </Head>

    <main className={styles.container}>
      Tu es sur la page du quiz
    </main>
    </div>
  )
}
