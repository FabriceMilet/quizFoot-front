import Head from 'next/head'
import styles from '../styles/Login.module.scss'
import { useRouter } from 'next/router';
import { useState } from 'react'
import { setToken } from '@/lib/auth';
import axios from 'axios';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {
    // console.log('userData.email', userData.email);
    // console.log('userData.password', userData.password);
    e.preventDefault();
    try {
      const responseData = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`,
        {
          identifier: userData.email,
          password: userData.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      // console.log('responseData.data', responseData.data);
      setToken(responseData.data);
      router.push('/');
    } catch (error) {
      console.error(error);
      if (error.response.data.error.message = 'Invalid identifier or password'){
        setError(true)
      }

    }
  };
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
        <h1 className={styles.containerTitle}>Se connecter</h1>
        {error ? <h2 className={styles.containerErrorTitle}>L'email ou le mot de passe est incorrect</h2> : <></>}
        <form onSubmit={handleSubmit} className={styles.containerForm}>

          <div className={styles.containerForm__case}>
            <label htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={(e) => handleChange(e)}
              placeholder="email"
              autoComplete="off"
              required
            />
          </div>
          <div className={styles.containerForm__case}>
            <label htmlFor="username">
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              onChange={(e) => handleChange(e)}
              placeholder="Mot de passe"
              autoComplete="off"
              required
            />
          </div>
          <Link href="/forgottenPassword"><p>Mot de passe oublié ?</p></Link>

          <button
            type="submit"
          >
            Connexion
          </button>
        </form>
      </main>
    </div>
  )
}