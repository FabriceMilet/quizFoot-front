import styles from '../styles/Quiz.module.scss'

function ResultAnnouncement({answersCorrect}) {

    return (
      <div className={styles.containerResultAnnouncement}>
        Vous avez {answersCorrect} réponses correctes
      </div>
    );
  }
  
  export default ResultAnnouncement;