import Head from 'next/head'
import styles from '../styles/Signup.module.scss'
import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/router';
// import { setToken } from '../lib/auth';

export default function Signup({ }) {
  const router = useRouter();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    console.log('userData.email', userData.email);
    console.log('userData.password', userData.password);
    console.log('userData.username', userData.username);
    e.preventDefault();
    try {
      // const responseData = await axios.post(
      //   `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local/register`,
      //   {
      //     email: userData.email,
      //     password: userData.password,
      //     username: userData.username,
      //   }
      // );
      const responseData = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local/register`,
        {
          email: userData.email,
          password: userData.password,
          username: userData.username,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('responseData.data', responseData.data);
      // setToken(responseData.data.jwt);
      router.redirect('/profile');
    } catch (error) {
      console.log(error.response);
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
        <meta name="description" content="Page d'inscription du jeux, quiz sur le football. Le but est de trouver la compo d'un match de foot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/tlc.png" />
      </Head>
      <main className={styles.container}>
        <h1>Inscription</h1>
        <form
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="username">
              Pseudo
            </label>
            <input
              type="text"
              name="username"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
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