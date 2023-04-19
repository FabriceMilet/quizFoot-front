import { useState, useEffect } from 'react';
import { FaRegClock } from "react-icons/fa";
import styles from '../styles/Quiz.module.scss'

function Timer() {
    // temps initial en secondes
  const [timeLeft, setTimeLeft] = useState(5 * 60); 
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // on nettoye l'intervalle quand le composant est démonté
    return () => clearInterval(id);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // on arrête le timer à 0 et on clean
  useEffect(() => {
    if (timeLeft <= 0) {
      clearInterval(intervalId);
    }
  }, [timeLeft, intervalId]);

  return (
    <div className={styles.containerPlayground__timer}>
    <FaRegClock size={45}/>
    <div>
     <div>Temps restant :</div>
     <div>{minutes} minutes {seconds} </div> 
    </div>
    </div>
  );
}

export default Timer;