import Head from 'next/head'
import styles from '../../styles/Quiz.module.scss'
import axios from 'axios';

export async function getServerSideProps({ params }) {
    try{
    const { id } = params;
    const res = await axios(`http://localhost:1337/api/quizzes-with-all-info`);
    const data = res.data;
    console.log('datasss', data);
    const filteredData = data?.filter((quiz) => quiz.id == id);
    console.log('filteredDat',filteredData);
    return {
      props: { quiz: filteredData[0] },
    }}
    catch(err){
      console.error(err)
    }
  }

export default function Quiz({quiz}) {
    console.log('saluquizt', quiz);
  return (
    <div>
      <Head>
        {/* ici on pourra mettre le nom du quiz en titre */}
        <title>Trouve la compo de {quiz.title}</title>
        <meta name="description" content="Jeux, quiz sur le football. Le but est de trouver la compo d'un match de foot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/tlc.png" />
      </Head>

    <main className={styles.container}>
      Tu es sur la page du quiz {quiz.title}
    </main>
    </div>
  )
}