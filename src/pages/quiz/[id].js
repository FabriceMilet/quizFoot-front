import Head from 'next/head'
import styles from '../../styles/Quiz.module.scss'
import axios from 'axios';
import Timer from '../../components/Timer'
import Count from '../../components/Count'
import { useState, useEffect } from 'react';
import ResultAnnouncement from '@/components/ResultAnnouncement';

export async function getServerSideProps({ params }) {
  try {
    const { id } = params;
    const res = await axios(`http://localhost:1337/api/quizzes-with-all-info`);
    const data = res.data;
    console.log('datasss', data);
    const filteredData = data?.filter((quiz) => quiz.id == id);
    console.log('filteredDat', filteredData);
    return {
      props: { quiz: filteredData[0] },
    }
  }
  catch (err) {
    console.error(err)
  }
}

export default function Quiz({ quiz }) {
  const answer = quiz.players.map(player => player.name.toLowerCase());

  const [form1Data, setForm1Data] = useState({ name: '' });
  const [form2Data, setForm2Data] = useState({ name: '' });
  const [answersCorrect, setAnswersCorrect] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form1Answer = form1Data.name.trim();
    const form2Answer = form2Data.name.trim();

    if (answer.includes(form1Answer.toLowerCase()) || answer.includes(form2Answer.toLowerCase())) {
      setAnswersCorrect(answersCorrect + 1);
      console.log('Answers are correct.');
    } else {
      console.log('Answers are incorrect.');
    }
  };

  const handleForm1Change = (event) => {
    setForm1Data({ name: event.target.value });
  };

  const handleForm2Change = (event) => {
    setForm2Data({ name: event.target.value });
  };

  if (answersCorrect == 22) {

  }
  // console.log('saluquizt', quiz);
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
        <h1 className={styles.containerTitle}>{quiz.title}</h1>
        <div className={styles.containerGame}>
          <div className={styles.containerPlayground}>
            <div className={styles.containerPlayground__forms}>
              <form className={styles.containerPlayground__form} onSubmit={handleSubmit}>
                <label htmlFor="name1" autocomplete="off">{quiz.teams[0].name}</label>
                <input type="text" id="name1" name="name1" value={form1Data.name1} onChange={handleForm1Change} />
              </form>
              <form className={styles.containerPlayground__form} onSubmit={handleSubmit}>
                <label htmlFor="name2" autocomplete="off">{quiz.teams[1].name}</label>
                <input type="text" id="name2" name="name2" value={form1Data.name2} onChange={handleForm2Change} />
              </form>
            </div>
            {answersCorrect < 22 ? <div className={styles.containerPlayground__bottom}>
              <Timer />
              <Count answersCorrect={answersCorrect} />
            </div> : <ResultAnnouncement className={styles.containerPlayground__Announcement} />}
          </div>

          <div className={styles.containerResult}>
            <div className={styles.containerResult__team}>
              <h2>{quiz.teams[0].name}</h2>
              <div className={styles.containerResult__position}>
                <h3>Gardien</h3>
  
                <h3>Défenseur</h3>

                <h3>Milieu</h3>

                <h3>Attaquant</h3>
                </div>
              </div>
               
              <div className={styles.containerResult__team}>
              <h2>{quiz.teams[1].name}</h2>
              <div className={styles.containerResult__position}>
                <h3>Gardien</h3>
  
                <h3>Défenseur</h3>

                <h3>Milieu</h3>

                <h3>Attaquant</h3>
                </div>
              </div>
          </div>
        </div>
      </main>
    </div>
  )
}