import axios from "axios";
import Head from 'next/head'
import styles from '../styles/Search.module.scss'
import Link from 'next/link';

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
// console.log(quizzes)
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
    <ul>
    {quizzes.map((quiz) =>(
     <li>
        - {quiz.title} : {quiz.description}
        <button className={styles.containerButton}><Link key={quiz.id} href={`/quiz/${quiz.id}`}>Go</Link></button></li> 
      ))}
      </ul>
    </main>
    </div>
  )
}
