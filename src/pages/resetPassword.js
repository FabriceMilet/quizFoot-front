import { useState } from 'react';
import styles from '../styles/resetPassword.module.scss'
import Head from 'next/head'
import axios from 'axios';
import Router from 'next/router';
import queryString from 'query-string';

export default function resetPassword() {

    const [userData, setUserData] = useState({
        password: '',
        passwordConfirmation: ''
    });

    const handleSubmit = async (e) => {
        
        const params = queryString.parse(location.search);
        const resetCode = params.code;
        e.preventDefault();
        try {
            const responseData = await axios.post(
                `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/reset-password`,
                {
                    code: resetCode,
                    password: userData.password,
                    passwordConfirmation: userData.passwordConfirmation,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('responseData.data', responseData.data);
            Router.push('/login');
        } catch (error) {
            console.error(error);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    return (
        <>
            <Head>
                <title>Nouveau mot de passe</title>
                <meta name="description" content="Changement de mot de passe du jeux, quiz sur le football. Le but est de trouver la compo d'un match de foot" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/images/tlc.png" />
            </Head>
            <main className={styles.container}>
                <h1>Choisis un nouveau mot de passe</h1>
                <form onSubmit={handleSubmit} className={styles.containerForm}>

                    <div className={styles.containerForm__case}>
                        <label htmlFor="password">
                            Nouveau mot de passe :
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

                    <div className={styles.containerForm__case}>
                        <label htmlFor="passwordConfirmation">
                            Confirmation du mot de passe : 
                        </label>
                        <input
                            type="password"
                            name="passwordConfirmation"
                            onChange={(e) => handleChange(e)}
                            placeholder="Confirmation"
                            autoComplete="off"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                    >
                        Envoyer
                    </button>
                </form>
            </main>
        </>
    );
};