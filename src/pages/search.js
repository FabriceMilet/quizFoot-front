import axios from "axios";
import Head from 'next/head'
import styles from '../styles/Search.module.scss'
import Link from 'next/link';
import Cookies from 'js-cookie';
import { FaMailBulk } from "react-icons/fa";
import { useEffect, useState } from "react";

export async function getServerSideProps() {
  try{
  const res = await axios(`http://localhost:1337/api/quizzes-with-all-info`);
  const data = res.data;
  return {
    props: { quizzes: data },
  }}
  catch(err){
    console.error(err)
  }
}

export default function Search({quizzes}) {
console.log('quizzes', quizzes)
const userId = Cookies.get('id')
const [noMoreQuiz, setNoMoreQuiz] = useState(false)

let quizzesNotDone
if (userId){
  quizzesNotDone = quizzes?.filter(quiz => {
    // console.log('quiz', quiz);
    return !quiz.users_permissions_users.some(user => user.id == userId);
    } );
  }else{
    quizzesNotDone = quizzes
  }
 console.log('quizzesNotDone', quizzesNotDone);
 useEffect(() => {
  if(quizzesNotDone && quizzesNotDone.length === 0) {
     setNoMoreQuiz(true);
  }
}, [quizzesNotDone]);

const handleClick = () => {
  window.location.href = `mailto:fabrice.milet.dev@gmail.com`;
}
 
  return (
    <div>
      <Head>
        <title>Choisis ton match</title>
        <meta name="description" content="Page de recherche du jeux, quiz sur le football. Le but est de trouver la compo d'un match de foot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/tlc.png" />
      </Head>
      <main className={styles.container}>
        <h1>Choisis un match parmi tous nos quiz</h1>
        {noMoreQuiz ? (
          <div className={styles.containerAnnonce}>
            Tu as fait tous les quiz, contacte le créateur du site pour lui dire d'en créer d'autres <button onClick={handleClick}><FaMailBulk/></button>
          </div>
        ) : (
          <ul>
            {quizzesNotDone?.map((quiz) => (
              <Link href={`/quiz/${quiz.id}`}><li key={quiz.id}>
                - <span> {quiz.title} : {quiz.description}</span>
              </li></Link>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}
