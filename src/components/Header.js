import styles from '../styles/Header.module.scss';
import Link from 'next/link';

export default function Home() {
    return (
        <div className={styles.container}>
            <Link href='/'><button>Home</button> </Link>
            <Link href='/quiz'><button>Quiz</button> </Link>
        </div>
    )
}