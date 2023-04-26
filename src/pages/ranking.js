import Head from 'next/head'
import styles from '../styles/Ranking.module.scss'
import axios from 'axios';

export async function getServerSideProps() {
  try {
    const res = await axios(`http://localhost:1337/api/users`);
    const data = res.data;
    console.log('datasss', data);
    return {
      props: { users: data },
    }
  }
  catch (err) {
    console.error(err)
  }
}

export default function Ranking({users}) {
console.log('users', users);
const filteredUsers = users.filter(user => user.result !== null);
console.log('filteredUsers', filteredUsers);
const sortedUsers = filteredUsers.sort((a, b) => b.result - a.result);
  return (
    <div>
      <Head>
        <title>Classement général</title>
        <meta name="description" content="Classement général du jeux, quiz sur le football. Le but est de trouver la compo d'un match de foot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/tlc.png" />
      </Head>
    <main className={styles.container}>
    <ul>
          {sortedUsers.map((user, index) => (
            <li key={user.id}>
              {index + 1} - {user.username}: {user.result} {user.result == 1 ? 'point' : 'points'}
            </li>
          ))}
        </ul>
    </main>
    </div>
  )
}
