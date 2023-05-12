import styles from '../styles/Quiz.module.scss'

function Count({answersCorrect}) {

  return (
    <div className={styles.containerPlayground__count} >
      {answersCorrect}/22
    </div>
  );
};

export default Count;