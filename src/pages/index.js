import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { useEffect } from 'react';
import { getQuizzes } from '@/store/slices/quiz.slice';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';

export default function Home({quizzes}) {
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
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <main className={styles.container}>
      <h1>Voici les quiz proposées</h1>
      <ul>
        {quizzes?.map((quiz)=>(
          <li key={quiz.id}>
            {quiz.attributes.title}
          </li>
        )
        )}
        
      </ul>
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
}