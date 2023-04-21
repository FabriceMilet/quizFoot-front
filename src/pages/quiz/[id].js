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
    // console.log('datasss', data);
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
  // console.log('quiz',quiz);
  // on initialise les tableaux de bonnes réponses (un tableau par éauipe avec le nom des 11 joueurs)
  const [answer1, setAnswer1] = useState(
    quiz.players
      ?.filter(player => player.teams.includes(quiz.teams[0].name))
      .map(player => player.name.toLowerCase())
  );
  // console.log('answer1', answer1);
  const [answer2, setAnswer2] = useState(
    quiz.players
      ?.filter(player => player.teams.includes(quiz.teams[1].name))
      .map(player => player.name.toLowerCase())
  );

  const [form1Data, setForm1Data] = useState({ name1: '' });
  const [form2Data, setForm2Data] = useState({ name2: '' });
  const [answersCorrect, setAnswersCorrect] = useState(0);
  const [giveUp, setGiveUp] = useState(false)

  // on met en place une fonction de vérification de réponse en utilisant l'algorithme de Levenshtein
  // qui est une méthode utilisée pour mesurer la différence entre deux chaînes de caractères



  function checkAnswer(userAnswer, correctAnswer) {
    // Convertir les réponses en minuscules pour éviter les erreurs de casse
    userAnswer = userAnswer.toLowerCase();
    correctAnswer = correctAnswer.toLowerCase();

    // Calculer la distance de Levenshtein entre les deux chaînes
    const levenshteinDistance = computeLevenshteinDistance(userAnswer, correctAnswer);

    // Déterminer si la réponse de l'utilisateur est correcte (distance inférieure à une certaine valeur)
    const maxDistance = 2; // la distance maximale pour accepter la réponse
    return levenshteinDistance <= maxDistance;
  }

  function computeLevenshteinDistance(s, t) {
    const m = s.length;
    const n = t.length;
    const d = [];
    for (let i = 0; i <= m; i++) {
      d[i] = [i];
    }
    for (let j = 0; j <= n; j++) {
      d[0][j] = j;
    }
    for (let j = 1; j <= n; j++) {
      for (let i = 1; i <= m; i++) {
        if (s[i - 1] === t[j - 1]) {
          d[i][j] = d[i - 1][j - 1];
        } else {
          d[i][j] = Math.min(d[i - 1][j], d[i][j - 1], d[i - 1][j - 1]) + 1;
        }
      }
    }
    return d[m][n];
  }



  const handleSubmit = (event) => {
    event.preventDefault();

    const form1Answer = form1Data.name1.trim();
    const form2Answer = form2Data.name2.trim();

    // if (answer1.includes(form1Answer.toLowerCase())) {
    if (answer1.includes(form1Answer.toLowerCase())) {


      setAnswersCorrect(answersCorrect + 1);
      console.log('Answer are correct.');
      // console.log('quiz.teams', quiz.teams );
      const index1 = answer1.indexOf(form1Answer.toLowerCase());
      // const index2 = answer.indexOf(form2Answer);
      let newAnswer = answer1.filter((item, index) => index !== index1);
      console.log('newAnswer', newAnswer);
      // on refait un tableau dans lequel on a enlevé la bonne réponse
      setAnswer1(newAnswer);
      // ici on récupère le bon joueur que l'on va chercher à ajouter dans le rendu

      let correctPlayer;
      for (let i = 0; i < quiz.players.length; i++) {
        if (quiz.players[i].name.toLowerCase() === form1Answer.toLowerCase())
        // && (quiz.players[i].team === quiz.teams[0].name || quiz.players[i].team === quiz.teams[1].name))
        {
          correctPlayer = quiz.players[i];
          break;
        }
      }
      // console.log('correctPlayer', correctPlayer);
      // on ajoute le joueur dans le rendu 
      let h3s = document.querySelectorAll('h3');
      let positionElem;
      for (let i = 0; i < h3s.length; i++) {
        if (h3s[i].textContent === correctPlayer.position) {
          positionElem = h3s[i];
          break;
        }
      }
      let playerElement = document.createElement('p');
      playerElement.textContent = correctPlayer.name;
      positionElem.parentNode.insertBefore(playerElement, positionElem.nextSibling);
      // on récupère l'input
      const input = event.target.elements['name1'];
      // on change le style
      input.style.backgroundColor = 'green';
      input.style.transform = 'scale(1.05)';
      // on attend 200ms et on remet à 0
      setTimeout(() => {
        input.style.backgroundColor = '';
        input.style.transform = '';
        setForm1Data({ name1: '' });
        event.target.reset();
      }, 200);
    }
    else if (answer2.includes(form2Answer.toLowerCase())) {
      setAnswersCorrect(answersCorrect + 1);
      console.log('Answer are correct.');
      // console.log('quiz.teams', quiz.teams );
      const index2 = answer2.indexOf(form2Answer);
      // const index2 = answer.indexOf(form2Answer);
      let newAnswer = answer2.filter((item, index) => index !== index2);
      console.log('newAnswer', newAnswer);
      setAnswer2(newAnswer);
      // ici on récupère le bon joueur que l'on va chercher à ajouter dans le rendu

      let correctPlayer;
      for (let i = 0; i < quiz.players.length; i++) {
        if (quiz.players[i].name.toLowerCase() === form2Answer.toLowerCase())
        // && (quiz.players[i].team === quiz.teams[0].name || quiz.players[i].team === quiz.teams[1].name))
        {
          correctPlayer = quiz.players[i];
          break;
        }
      }
      // console.log('correctPlayer', correctPlayer);
      // on ajoute le joueur dans le rendu 
      let h4s = document.querySelectorAll('h4');
      let positionElem;
      for (let i = 0; i < h4s.length; i++) {
        if (h4s[i].textContent === correctPlayer.position) {
          positionElem = h4s[i];
          break;
        }
      }
      let playerElement = document.createElement('p');
      playerElement.textContent = correctPlayer.name;
      positionElem.parentNode.insertBefore(playerElement, positionElem.nextSibling);
      // on récupère l'input
      const input = event.target.elements['name2'];
      // on change le style
      input.style.backgroundColor = 'green';
      input.style.transform = 'scale(1.05)';
      // on attend 200ms et on remet à 0
      setTimeout(() => {
        input.style.backgroundColor = '';
        input.style.transform = '';
        setForm2Data({ name2: '' });
        event.target.reset();
      }, 200);
    }
    else {
      console.log('Answer are incorrect.');
      if (event.target.elements['name1']) {
        const input = event.target.elements['name1'];
        input.style.backgroundColor = 'red';
        input.style.transform = 'scale(0.9)';
        setTimeout(() => {
          input.style.backgroundColor = '';
          input.style.transform = '';
          setForm1Data({ name1: '' });
          event.target.reset();
        }, 200);
      } else if (event.target.elements['name2']) {
        const input = event.target.elements['name2'];
        input.style.backgroundColor = 'red';
        input.style.transform = 'scale(0.9)';
        setTimeout(() => {
          input.style.backgroundColor = '';
          input.style.transform = '';
          setForm2Data({ name2: '' });
          event.target.reset();
        }, 200);
      }

    }
  };

  const handleForm1Change = (event) => {
    setForm1Data({ name1: event.target.value });
  };

  const handleForm2Change = (event) => {
    setForm2Data({ name2: event.target.value });
  };

  const handleClickOnGiveUp = () => {
    setGiveUp(true);
    // ici, on va récupérer les players non trouvés et les ajouter en rouge au rendu
    answer1.forEach((player) => {
      // console.log(player);
      for (let i = 0; i < quiz.players.length; i++) {
        if (quiz.players[i].name.toLowerCase() == player.toLowerCase()) {
          // on ajoute le joueur dans le rendu
          const correctPlayer = quiz.players[i];
          
          let h3s = document.querySelectorAll("h3");
          let positionElem;
          for (let j = 0; j < h3s.length; j++) {
            if (h3s[j].textContent === correctPlayer.position) {
              positionElem = h3s[j];
              break;
            }
          }
          let playerElement = document.createElement("p");
          playerElement.textContent = correctPlayer.name;
          playerElement.style.color = "rgb(218, 90, 20)";
          positionElem.parentNode.insertBefore(
            playerElement,
            positionElem.nextSibling
          );
        }
      }
    });
    answer2.forEach((player) => {
      // console.log(player);
      for (let i = 0; i < quiz.players.length; i++) {
        if (quiz.players[i].name.toLowerCase() == player.toLowerCase()) {
          // on ajoute le joueur dans le rendu
          const correctPlayer = quiz.players[i];
          
          let h4s = document.querySelectorAll("h4");
          let positionElem;
          for (let j = 0; j < h4s.length; j++) {
            if (h4s[j].textContent === correctPlayer.position) {
              positionElem = h4s[j];
              break;
            }
          }
          let playerElement = document.createElement("p");
          playerElement.textContent = correctPlayer.name;
          playerElement.style.color = "rgb(218, 90, 20)";
          positionElem.parentNode.insertBefore(
            playerElement,
            positionElem.nextSibling
          );
        }
      }
    });
  };
  const handleTimerEnd = () => {
    setGiveUp(true)
  }

  return (
    <div>
      <Head>
        <title>Trouve la compo de {quiz.title}</title>
        <meta name="description" content="Jeux, quiz sur le football. Le but est de trouver la compo d'un match de foot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/tlc.png" />
      </Head>

      <main className={styles.container}>
        <h1 className={styles.containerTitle}>{quiz.title}</h1>
        <h2 className={styles.containerSubtitle}>{quiz.description}</h2>
        <div className={styles.containerGame}>
          {answersCorrect == 22 || giveUp ? <ResultAnnouncement className={styles.containerPlayground__Announcement} answersCorrect={answersCorrect} /> : <div className={styles.containerPlayground}>
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
            <div className={styles.containerPlayground__bottom}>
              <Timer onTimerEnd={handleTimerEnd} />
              <div className={styles.containerPlayground__bottomRight}>
                <Count answersCorrect={answersCorrect} />
                <button className={styles.containerPlayground__button} onClick={handleClickOnGiveUp}>Abandonner</button>
              </div>
            </div>
          </div>}

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
                <h4>Gardien</h4>

                <h4>Défenseur</h4>

                <h4>Milieu</h4>

                <h4>Attaquant</h4>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}