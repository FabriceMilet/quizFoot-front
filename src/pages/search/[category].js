import axios from "axios";
import Head from 'next/head'
import styles from '../../styles/Search.module.scss'
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";

export async function getServerSideProps({ params }) {
  try {
    const { category } = params;
    const res = await axios(`${process.env.NEXT_PUBLIC_STRAPI_URL}/quizzes-with-all-info`);
    const data = res.data;
    const filteredData = data?.filter((quiz) => quiz.category.slug === category);
    return {
      props: { quizzes: filteredData },
    }
  }
  catch (err) {
    console.error(err)
  }
}

export default function Search({ quizzes }) {

  const userId = Cookies.get('id')
  const [noMoreQuiz, setNoMoreQuiz] = useState(false)
  const [searchTerm, setSearchTerm] = useState('');

  let quizzesNotDone
  if (userId) {
    quizzesNotDone = quizzes?.filter(quiz => {
      return !quiz.users_permissions_users.some(user => user.id == userId);
    });
  } else {
    quizzesNotDone = quizzes
  }
  
  useEffect(() => {
    if (quizzesNotDone && quizzesNotDone.length === 0) {
      setNoMoreQuiz(true);
    }
  }, [quizzesNotDone]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }
  // on filtre les quiz dispo selon la recherche de l'utilisateur
  const filteredQuizzes = quizzesNotDone.filter((quiz) => {
    return quiz.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <Head>
        <title>Choisis ton match</title>
        <meta name="description" content="Page de recherche du jeux, quiz sur le football. Le but est de trouver la compo d'un match de foot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/tlc.png" />
      </Head>
      <main className={styles.container}>
        <h1>Choisis entre ces matchs de {quizzes[0].category.name}</h1>
        <div className={styles.containerSearch}>
          <input type="text" placeholder="Rechercher un match" value={searchTerm} onChange={handleSearch} />
        </div>
        {noMoreQuiz ? (
          <div className={styles.containerAnnonce}>
            Tu as fait tous les quiz de cette catégorie, essaie une autre ! <Link href='/'><button>Rejouer</button></Link>
          </div>
        ) : (
          <ul>
            {filteredQuizzes?.map((quiz) => (
              <Link href={`/quiz/${quiz.id}`} key={quiz.id}><li >
                - <span>{quiz.title} : {quiz.description}</span>
              </li></Link>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}