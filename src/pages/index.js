import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { useEffect } from 'react';
import { getQuizzes } from '@/store/slices/quiz.slice';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import Link from 'next/link';

export default function Home({ quizzes }) {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getQuizzes());
  // }, []);

  // const quizzes = useSelector((state) => state.quiz.quizzes);

  return (
    <div>
      <Head>
        <title>Trouve la compo</title>
        <meta name="description" content="Jeux, quiz sur le football. Le but est de trouver la compo d'un match de foot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/tlc.png" />
      </Head>
      <main className={styles.container}>
        <div className={styles.containerTop}>
          <div className={styles.containerTop__title} >
          <h1 className={styles.containerTitle} >Lance un match au hasard parmi tous nos quiz</h1>
          <button className={styles.containerButton}>Let's Go</button></div>
          <h2 className={styles.containerTitle}>Ou choisis parmi les thèmes ci-dessous</h2>
        </div>
        <div className={styles.containerCards}>
          <div className={styles.containerCard}>
            <h3>Sélections nationales</h3>
            <div>
              <div className={styles.containerCard__choice}>Tu peux choisir ton match 
              <Link href="/search/selections-nationales">
              <button>Ici</button> 
              </Link></div>
              <span>ou</span>
              <div className={styles.containerCard__choice}>Lancer un quiz au hasard<button>Là</button></div>
              
              </div>
            </div>
            <div className={styles.containerCard}>
            <h3>Ligue 1</h3>
            <div>
              <div className={styles.containerCard__choice}>Tu peux choisir ton match <button>Ici</button> </div>
              <span>ou</span>
              <div className={styles.containerCard__choice}>Lancer un quiz au hasard <button>Là</button></div>
              
              </div>
            </div>
            <div className={styles.containerCard}>
            <h3>Ligue des champions</h3>
            <div>
              <div className={styles.containerCard__choice}>Tu peux choisir ton match <button>Ici</button> </div>
              <span>ou</span>
              <div className={styles.containerCard__choice}>Lancer un quiz au hasard <button>Là</button></div>
              
              </div>
            </div>
            <div className={styles.containerCard}>
            <h3>Championnats étrangers</h3>
            <div>
              <div className={styles.containerCard__choice}>Tu peux choisir ton match <button>Ici</button> </div>
              <span>ou</span>
              <div className={styles.containerCard__choice}>Lancer un quiz au hasard<button>Là</button></div>
              
              </div>
            </div>
        </div>

      </main>
    </div>
  )
}
// export async function getServerSideProps() {

//   const quizzes = await getQuizzes();
//   return {
//     props: {
//       quizzes,
//     },
//   };
// }
{/* <ul>
{quizzes?.map((quiz)=>(
  <li key={quiz.id}>
    {quiz.attributes.title}
  </li>
)
)}

</ul>
export async function getStaticProps() {
  const response = await axios('http://localhost:1337/api/quizzes');
  console.log(response.data.data); 
  const data = await response.data.data;
  const quizzes = data

  return {
    props: {
       quizzes,
    },
  };
} */}