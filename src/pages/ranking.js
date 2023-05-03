import Head from 'next/head'
import styles from '../styles/Ranking.module.scss'
import axios from 'axios';

// je récupère les quiz et les users
export async function getServerSideProps() {
  try {
    const usersRes = await axios(`http://localhost:1337/api/users`);
    const usersData = usersRes.data;

    const quizzesRes = await axios(`http://localhost:1337/api/quizzes-with-all-info`);
    const quizzesData = quizzesRes.data;

    return {
      props: {
        users: usersData,
        quizzes: quizzesData
      }
    }
  } catch (error) {
    console.error(error);
    return {
      props: {
        users: [],
        quizzes: []
      }
    }
  }
}


export default function Ranking({ users, quizzes }) {
  // je récupère les user qui ont fait les quiz 
  const userIds = quizzes.map((quiz) => quiz.users_permissions_users)
  console.log('userIds', userIds);
  // je récupère un tableau ne comportant que les ids
  const flattenedIds = userIds.flatMap(users => users.map(user => user.id))
  console.log('flattenedIds', flattenedIds)
  // console.log('users', users);
  const filteredUsers = users.filter(user => user.result !== null);
  console.log('filteredUsers', filteredUsers);
  const sortedUsers = filteredUsers.sort((a, b) => b.result - a.result);
  //console.log('sortedUsers', sortedUsers);
  // mainteant je boucle sur filteredUsers pour savoir copmbien de quiz il a fait afin d'en sortir un pourcentage
  const countIds = filteredUsers.map(user => {
    const count = flattenedIds.filter(id => id === user.id).length;
    return { ...user, count };
  });
  console.log('countIds', countIds);
  const sortedUsersbypercentage = countIds.sort((a, b) => {
    const percentageA = a.result / a.count;
    const percentageB = b.result / b.count;
    return percentageB - percentageA;
  });
  console.log('sortedUsersbypercentage', sortedUsersbypercentage);
  return (
    <div>
      <Head>
        <title>Classement général</title>
        <meta name="description" content="Classement général du jeux, quiz sur le football. Le but est de trouver la compo d'un match de foot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/tlc.png" />
      </Head>
      <main className={styles.container}>
        <div className={styles.containerHalf}>
          <h2>Classement par points au cumul des quiz</h2>
          <ul>
            {sortedUsers?.map((user, index) => (
              <li key={user.id}>
                {index + 1} - {user.username} : {user.result} {user.result == 1 || user.result == 0 ? 'point' : 'points'}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.containerHalf}>
          <h2>Classement par pourcentage de bonnes réponses</h2>
          <ul>
            {sortedUsersbypercentage?.map((user, index) => {
              const percentage = (user.result / user.count) / 22 * 100;
              const displayPercentage = Number.isInteger(percentage) ? percentage.toFixed(0) : percentage.toFixed(2);
              return (
                <li key={user.id}>
                  {index + 1} - {user.username} : {displayPercentage !== 'NaN' ? displayPercentage : 0} %
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </div>
  )
}
