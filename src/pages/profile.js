import Head from 'next/head'
import styles from '../styles/Profile.module.scss'
import axios from 'axios';
import Link from 'next/link';


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

const Profile = ({user}) => {
console.log('user', user);
// console.log('ddd', document.cookie);

// on va pouvoir mettre le nom de l'user comme titre
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
      <div>
        <p>Nombre de bonnes réponses au cumul de tous tes quiz : {user.result}</p>
        <p>Va voir ton classement par rapport aux autres joueurs <Link href="/ranking"><button>Go</button></Link></p>
      </div>
      <div>
        <p>Email : {user.email}</p>
        <p>Tu veux modifier ton mot de passe ?</p>
        
        </div>

   
    </main>
    </>
  )
}
export default Profile;