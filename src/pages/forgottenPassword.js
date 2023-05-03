import { useState } from 'react';
import styles from '../styles/forgottenPassword.module.scss'
import Head from 'next/head'
import axios from 'axios';
import Router from 'next/router';

export default function forgottenPassword() {

    const [userData, setUserData] = useState({
        email: '',
      });

    const [mailSend, setMailSend] = useState(false) 

    const handleSubmit = async (e) => {
        console.log('userData.email', userData.email);
        e.preventDefault();
        try {
          const responseData = await axios.post(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/forgot-password`,
            {
              email: userData.email,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          console.log('responseData.data', responseData.data);
          setMailSend(true)
        } catch (error) {
          console.log(error);
        }
      };
      const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
      };

    return (
        <>
            <Head>
                <title>Mot de passe oublié ?</title>
                <meta name="description" content="Page de mot de passe oublié du jeux, quiz sur le football. Le but est de trouver la compo d'un match de foot" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/images/tlc.png" />
            </Head>
            <main className={styles.container}>
              {mailSend ? <h1>Un mail a été envoyé avec un lien afin de changer ton mot de passe</h1> : 
                (<><h1>Mot de passe oublié ?</h1>
                <form onSubmit={handleSubmit} className={styles.containerForm}>

                    <div className={styles.containerForm__case}>
                        <label htmlFor="email">
                            Ton email :
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

                    <button
                        type="submit"
                    >
                        Envoyer
                    </button>
                </form></>)}
            </main>
        </>
    );
};