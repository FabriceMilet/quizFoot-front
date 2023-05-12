import Head from 'next/head'
import styles from '../styles/Signup.module.scss'
import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/router';
import { setToken } from '../lib/auth';

// je récupère les les users afin de personnalisé mon message d'erreur si pseudo ou email déjà existant
export async function getServerSideProps() {
  try {
    const usersRes = await axios(`${process.env.NEXT_PUBLIC_STRAPI_URL}/users`);
    const usersData = usersRes.data;

    return {
      props: {
        users: usersData,
      }
    }
  } catch (error) {
    console.error(error);
    return {
      props: {
        users: [] 
      }
    }
  }
}

export default function Signup({users}) {
  const router = useRouter();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  });
const [error, setError] = useState(false)
const [errorText, setErrorText] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    let emailExists = false;
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === userData.email) {
        emailExists = true;
        break;
      }
    }

    let pseudoExists = false;
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === userData.username) {
        pseudoExists = true;
        break;
      }
    }

    if (emailExists) {
      setError(true)
      setErrorText("Cet email est déjà utilisé, veuillez en choisir un autre ou vous connecter")
    } else if (pseudoExists) {
      setError(true)
      setErrorText("Ce pseudo est déjà utilisé, veuillez en choisir un autre")
    }
    else if (userData.password.length < 6){
      setError(true)
      setErrorText('Le mot de passe doit contenir au moins 6 caractères')
    }
    else if (userData.password !== userData.passwordConfirmation){
      setError(true)
      setErrorText('Le mot de passe et la confirmation ne correspondent pas')
    }
    else {
      try {
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

      setToken(responseData.data);
      router.push('/');
    } catch (error) {
      console.error(error);
    }}

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
        <h1 className={styles.containerTitle}>Inscription</h1>
        {error ? <h2 className={styles.containerErrorTitle}>{errorText}</h2> : <></>}
        <form
          onSubmit={handleSubmit}
          className={styles.containerForm}
        >
          <div className={styles.containerForm__case}>
            <label htmlFor="username">
              Pseudo
            </label>
            <input
              type="text"
              name="username"
              onChange={(e) => handleChange(e)}
              placeholder="pseudo"
              autoComplete="off"
              required
            />
          </div>
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
            <label htmlFor="password">
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              onChange={(e) => handleChange(e)}
              placeholder="mot de passe"
              autoComplete="off"
              required
            />
          </div>
          <div className={styles.containerForm__case}>
            <label htmlFor="password">
              Confirmation de mot de passe
            </label>
            <input
              type="password"
              name="passwordConfirmation"
              onChange={(e) => handleChange(e)}
              placeholder="confirmation"
              autoComplete="off"
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