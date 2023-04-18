import Head from 'next/head'
import styles from '../../styles/Quiz.module.scss'
import axios from 'axios';
import Timer from '../../components/Timer'
import Count from '../../components/Count'
import { useState } from 'react';
import ResultAnnouncement from '@/components/ResultAnnouncement';

export async function getServerSideProps({ params }) {
  try {
    const { id } = params;
    console.log('id', id);
    const res = await axios(`http://localhost:1337/api/quiz-with-all-info/${id}`);
    // const res = await axios(`http://localhost:1337/api/quizzes-with-all-info`);
    const data = res.data;
    console.log('datasss', data);
   //  const filteredData = data?.filter((quiz) => quiz.id == id);
   //  console.log('filteredDat', filteredData);
    return {
      props: { quiz: data },
    }
  }
  catch (err) {
    console.error(err)
  }
}

export default function Quiz({ quiz }) {
  console.log('quiz',quiz);
  // on initialise les tableaux de bonnes réponses (un tableau par éauipe avec le nom des 11 joueurs)
  const [answer1, setAnswer1] = useState(
    quiz.players
      ?.filter(player => player.teams.includes(quiz.teams[0].name))
      .map(player => player.name.toLowerCase())
  );
  console.log('answer1', answer1);
  const [answer2, setAnswer2] = useState(
    quiz.players
      ?.filter(player => player.teams.includes(quiz.teams[1].name))
      .map(player => player.name.toLowerCase())
  );

  const [form1Data, setForm1Data] = useState({ name1: '' });
  const [form2Data, setForm2Data] = useState({ name2: '' });
  const [answersCorrect, setAnswersCorrect] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form1Answer = form1Data.name1.trim();
    const form2Answer = form2Data.name2.trim();

    if (answer1.includes(form1Answer.toLowerCase()) ) {
      setAnswersCorrect(answersCorrect + 1);
      console.log('Answer are correct.');
      // console.log('quiz.teams', quiz.teams );
      const index1 = answer1.indexOf(form1Answer);
      // const index2 = answer.indexOf(form2Answer);
      let newAnswer = answer1.filter((item, index) => index !== index1);
      console.log('newAnswer', newAnswer);
      setAnswer1(newAnswer);
      setForm1Data('')
    } 
    else if (answer2.includes(form2Answer.toLowerCase())){
      setAnswersCorrect(answersCorrect + 1);
      console.log('Answer are correct.');
      // console.log('quiz.teams', quiz.teams );
      const index2 = answer2.indexOf(form2Answer);
      // const index2 = answer.indexOf(form2Answer);
      let newAnswer = answer2.filter((item, index) => index !== index2);
      console.log('newAnswer', newAnswer);
      setAnswer2(newAnswer);
    }
    else {
      console.log('Answer are incorrect.');
    }
  };

  const handleForm1Change = (event) => {
    setForm1Data({ name1: event.target.value });
  };

  const handleForm2Change = (event) => {
    setForm2Data({ name2: event.target.value });
  };

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
        <h2 className={styles.containerSubtitle}>{quiz.description}</h2>
        <div className={styles.containerGame}>
          <div className={styles.containerPlayground}>
            <div className={styles.containerPlayground__forms}>
              <form className={styles.containerPlayground__form} onSubmit={handleSubmit}>
                <label htmlFor="name1" autoComplete="off">{quiz.teams[0].name}</label>
                <input type="text" id="name1" name="name1" value={form1Data.name} onChange={handleForm1Change} />
              </form>
              <form className={styles.containerPlayground__form} onSubmit={handleSubmit}>
                <label htmlFor="name2" autoComplete="off">{quiz.teams[1].name}</label>
                <input type="text" id="name2" name="name2" value={form2Data.name} onChange={handleForm2Change} />
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