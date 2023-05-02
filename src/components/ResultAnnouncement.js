import styles from '../styles/Quiz.module.scss';
import Link from 'next/link';

function ResultAnnouncement({answersCorrect}) {
  let resultText;
  
  if (answersCorrect == 0) {
    resultText = `Tu n'as aucune bonne réponse, t'as déjà vu un match de foot ?`;
  } else if (answersCorrect == 1) {
    resultText = `Tu as une seule bonne réponse, tu sais Zidane c'est pas juste une pub volvic .. `;
  } else if (answersCorrect > 0 && answersCorrect < 5) {
    resultText = `Tu as trouvé ${answersCorrect} joueurs, retourne voir tes vieilles cassettes 
    de foot en folie et reviens faire un meilleur score`;
  } else if (answersCorrect > 4 && answersCorrect < 11) {
    resultText = `Tu as trouvé ${answersCorrect} joueurs, essaie toi sur un autre match, t'as moyen de dépasser la moyenne !`;
  } else if (answersCorrect > 10 && answersCorrect < 16) {
    resultText = `Tu as trouvé ${answersCorrect} joueurs, c'est pas mal. Refais un match, on verra si c'était de la chance
    ou si t'as un réel talent`;
  } else if (answersCorrect > 15 && answersCorrect < 22) {
    resultText = `Tu as trouvé ${answersCorrect} joueurs, bien joué ! T'as dû en écumer des heures de Téléfoot`;
  } else {
    resultText = `BIG BOSS, un perfect ! Bravo`;
  }

    return (
      <div className={styles.containerResultAnnouncement}>
        <div className={styles.containerResultAnnouncement__text}>{resultText}</div>
        <Link href='/'><button className={styles.containerResultAnnouncement__button}>Rejouer</button></Link>
      </div>
    );
  }
  
  export default ResultAnnouncement;