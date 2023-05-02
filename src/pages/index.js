import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import { FaArrowAltCircleDown } from "react-icons/fa";

export async function getServerSideProps() {
  try {
    const res = await axios(`http://localhost:1337/api/quizzes-with-all-info`);
    const data = res.data;
    return {
      props: { quizzes: data },
    }
  }
  catch (err) {
    console.error(err)
  }
}

export default function Home({ quizzes }) {

  const router = useRouter();

  // on choisi au hasard un id parmi le tableau d'id et on renvoie vers ce quiz
  const handleClickRandomAll = () => {
    // on récupère un tableau avec les id de tous les quiz
    const quizzesIdArray = quizzes.map(quiz => quiz.id);
    const randomQuizIndex = Math.floor(Math.random() * quizzesIdArray.length);
    const randomQuizId = quizzesIdArray[randomQuizIndex];
    router.push(`/quiz/${randomQuizId}`);
  };
  // on fait de même avec les quiz par category
  const handleClickRandomNationale = () => {
    // on récupère un tableau avec les id des quiz sélections nationales
    const filteredQuizzes = quizzes.filter((quiz) => quiz.category.name === 'Sélections nationales');
    const quizzesIdArray = filteredQuizzes.map(quiz => quiz.id);
    const randomQuizIndex = Math.floor(Math.random() * quizzesIdArray.length);
    const randomQuizId = quizzesIdArray[randomQuizIndex];
    router.push(`/quiz/${randomQuizId}`);
  };
  const handleClickRandomLigue1 = () => {
    // on récupère un tableau avec les id des quiz ligue 1
    const filteredQuizzes = quizzes.filter((quiz) => quiz.category.name === 'Ligue 1');
    const quizzesIdArray = filteredQuizzes.map(quiz => quiz.id);
    const randomQuizIndex = Math.floor(Math.random() * quizzesIdArray.length);
    const randomQuizId = quizzesIdArray[randomQuizIndex];
    router.push(`/quiz/${randomQuizId}`);
  };
  const handleClickRandomForreign = () => {
    // on récupère un tableau avec les id des quiz championnats étrangers
    const filteredQuizzes = quizzes.filter((quiz) => quiz.category.name === 'Championnats étrangers');
    const quizzesIdArray = filteredQuizzes.map(quiz => quiz.id);
    const randomQuizIndex = Math.floor(Math.random() * quizzesIdArray.length);
    const randomQuizId = quizzesIdArray[randomQuizIndex];
    router.push(`/quiz/${randomQuizId}`);
  };
  const handleClickRandomChampions = () => {
    // on récupère un tableau avec les id des quiz ligue des champions
    const filteredQuizzes = quizzes.filter((quiz) => quiz.category.name === 'Ligue des champions');
    const quizzesIdArray = filteredQuizzes.map(quiz => quiz.id);
    const randomQuizIndex = Math.floor(Math.random() * quizzesIdArray.length);
    const randomQuizId = quizzesIdArray[randomQuizIndex];
    router.push(`/quiz/${randomQuizId}`);
  };

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
            <button className={styles.containerButton} onClick={handleClickRandomAll}>Let's Go</button></div>
          <h2 className={styles.containerTitle}><div>Ou choisis parmi les thèmes ci-dessous</div> <FaArrowAltCircleDown className={styles.containerArrow} /></h2>
        </div>
        <div className={styles.containerCards}>
          <div className={styles.containerCard}>
            <h3>Sélections nationales</h3>
            <div className={styles.containerCard__bottom}>
              <div className={styles.containerCard__choice}>
                Tu peux choisir ton match
                
                  <Link href="/search/selections-nationales">
                  <button> Ici</button>
                  </Link>
                
              </div>
              <span>ou</span>
              <div className={styles.containerCard__choice}>
                Lancer un quiz au hasard
                <button onClick={handleClickRandomNationale}>
                  Là
                </button>
              </div>

            </div>
          </div>
          <div className={styles.containerCard}>
            <h3>Ligue 1</h3>
            <div className={styles.containerCard__bottom}>
              <div className={styles.containerCard__choice}>Tu peux choisir ton match <Link href="/search/ligue-1">
                <button> Ici</button>
              </Link> </div>
              <span>ou</span>
              <div className={styles.containerCard__choice}>Lancer un quiz au hasard <button onClick={handleClickRandomLigue1}>Là</button></div>

            </div>
          </div>
          <div className={styles.containerCard}>
            <h3>Ligue des champions</h3>
            <div className={styles.containerCard__bottom}>
              <div className={styles.containerCard__choice}>Tu peux choisir ton match <Link href="/search/ligue-des-champions">
                <button> Ici</button>
              </Link> </div>
              <span>ou</span>
              <div className={styles.containerCard__choice}>Lancer un quiz au hasard <button onClick={handleClickRandomChampions}>Là</button></div>

            </div>
          </div>
          <div className={styles.containerCard}>
            <h3>Championnats étrangers</h3>
            <div className={styles.containerCard__bottom}>
              <div className={styles.containerCard__choice}>Tu peux choisir ton match <Link href="/search/championnats-etrangers">
                <button>Ici</button>
              </Link> </div>
              <span>ou</span>
              <div className={styles.containerCard__choice}>Lancer un quiz au hasard<button onClick={handleClickRandomForreign}>Là</button></div>

            </div>
          </div>
        </div>

      </main>
    </div>
  )
};