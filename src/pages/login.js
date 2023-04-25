import Head from 'next/head'
import styles from '../styles/Login.module.scss'
import { useState } from 'react'

export default function Login({}) {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });

const handleSubmit = () => {

}
const handleChange = (e) => {
  const { name, value } = e.target;
  setUserData({ ...userData, [name]: value });
};
  return (
    <div>
      <Head>
        <title>Trouve la compo</title>
        <meta name="description" content="Page de connexion du jeux, quiz sur le football. Le but est de trouver la compo d'un match de foot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/tlc.png" />
      </Head>
      <main className={styles.container}>
        <h1>Se connecter</h1>
        <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="identifier"
                    onChange={(e) => handleChange(e)}
                    placeholder="Pseudo"
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    onChange={(e) => handleChange(e)}
                    placeholder="Mot de passe"
                    required
                  />

                  <button
                    type="submit"
                  >
                    S'inscrire
                  </button>
                </form>
      </main>
    </div>
  )
}