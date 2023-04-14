import axios from "axios";
import Head from 'next/head'
import styles from '../../styles/Search.module.scss'
import Link from 'next/link';

export async function getServerSideProps({ params }) {
  try{
  const { category } = params;
  const res = await axios(`http://localhost:1337/api/quizzes-with-all-info`);
  const data = res.data;
  const filteredData = data?.filter((quiz) => quiz.category.slug === category);
  return {
    props: { quizzes: filteredData },
  }}
  catch(err){
    console.error(err)
  }
}

export default function Search({quizzes}) {
console.log(quizzes)
  return (
    <div>
      <Head>
        <title>Choisis ton match</title>
        <meta name="description" content="Page de recherche du jeux, quiz sur le football. Le but est de trouver la compo d'un match de foot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/tlc.png" />
      </Head>
    <main className={styles.container}>
    choisis entre ces matchs de {quizzes[0].category.name}
    {quizzes.map((quiz) =>(
      <Link key={quiz.id} href={`/quiz/${quiz.id}`}>
        {quiz.title}
        </Link>
      ))}
    </main>
    </div>
  )
}