import styles from '../styles/404.module.scss'
import Head from 'next/head'
import Link from 'next/link'

export default function FourOhFour() {
    return (
        <>
            <Head>
                <title>Trouve la compo, 404</title>
                <meta name="description" content="Page 404 du jeux, quiz sur le football. Le but est de trouver la compo d'un match de foot" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/images/tlc.png" />
            </Head>
            <main className={styles.container}>
                <h1>404 - La page demandée n&apos;existe pas</h1>
                <Link href="/">
                    <button>
                        Retourne à l&apos;accueil
                    </button>
                </Link>
            </main>
        </>
    );
};


