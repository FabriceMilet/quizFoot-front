import Head from 'next/head'
import styles from '../styles/Profile.module.scss'
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { FaTrashAlt } from "react-icons/fa";
import { useRouter } from 'next/router';
import { unsetToken } from '../lib/auth';


export async function getServerSideProps(context) {
  try {
    const userId = context.req.cookies.id
    const jwt = context.req.cookies.jwt
    // Vérifie si le token JWT est présent dans les cookies
    if (!jwt) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }

    const res = await axios(`http://localhost:1337/api/users/${userId}`);
    const data = res.data;

    return {
      props: { user: data },
    }


  }
  catch (err) {
    console.error(err)
    return {
      props: { user: null },
    }
  }
}

const Profile = ({ user }) => {
  const router = useRouter();
  const [newUsername, setNewUsername] = useState("");
  const [openModal, setOpenModal] = useState(false)
 //  console.log('user', user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id = Cookies.get('id')
    const jwt = Cookies.get('jwt')
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/${id}`,
        {
          username: newUsername,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
          },
        }
      );
      window.location.reload()
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickOnDelete = () => {
    setOpenModal(true)
  }

  const handleClickOnNo = () => {
    setOpenModal(false)
  }

  const handleClickOnYes = async () => {
    const id = Cookies.get('id')
    try {
     await axios.delete(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/${id}`
      )
    unsetToken()  
    router.push('/');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Head>
        <title>Page de profil de {user.username}</title>
        <meta name="description" content="Page de profil du jeux, quiz sur le football. Le but est de trouver la compo d'un match de foot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/tlc.png" />
      </Head>
      <main className={styles.container}>
        <h1>Profil de {user.username}</h1>
        <p className={styles.containerMail}>Email : {user.email}</p>

        {openModal ? <>
              <h2 className={styles.containerShadow}>Es-tu vraiment sûr de vouloir supprimer ton compte ?</h2>
          <div> <button onClick={handleClickOnYes}>Oui</button> <button onClick={handleClickOnNo}>Non</button></div></>
           : <>

        <div className={styles.containerInfo}>
          <h2 className={styles.containerShadow}>Tu veux modifier ton pseudo ?</h2>
          <form className={styles.containerForm} onSubmit={handleSubmit}>
            <label htmlFor="newUsername">Nouveau pseudo : </label>
            <input
              type="text"
              id="newUsername"
              name="newUsername"
              value={newUsername}
              placeholder='Nouveau pseudo'
              onChange={(e) => setNewUsername(e.target.value)}
            />
         
            <button type="submit">Modifier le pseudo </button>
          </form>
        </div>

        <div className={styles.containerRanking}>
          <h2 className={styles.containerShadow}>Nombre de bonnes réponses au cumul de tous tes quiz : <span>{user.result}</span></h2>
          <p className={styles.containerRanking2}>Va voir ton classement par rapport aux autres joueurs <Link href="/ranking"><button>ici</button></Link></p>
        </div>

        <div className={styles.containerDelete}>
        <h2 className={styles.containerShadow}>Tu veux supprimer ton compte ?</h2>
        <p> Clique ici pour nous dire au revoir <button onClick={handleClickOnDelete}><FaTrashAlt /></button> </p>
        </div>

</>}
      </main>
    </>
  )
};

export default Profile;