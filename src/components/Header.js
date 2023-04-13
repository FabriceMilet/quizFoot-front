import styles from '../styles/Header.module.scss';
import Link from 'next/link';
import { FaSearch } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx"

export default function Header() {
    return (
        <div className={styles.container}>
            <div className={styles.container_logo}>
            <Link href='/'><button>Logo</button> </Link> 
            </div>
            <h1 className={styles.container_title}>Trouve la compo</h1>
            <nav className={styles.container_navigation}>
            <Link href='/search'><button><FaSearch/></button> </Link>
            {/* ici on aura soit le lien vers le profil ou vers s'inscrire selon si logué ou non */}
            <Link href='/profile'><button><RxAvatar/></button> </Link>
            <Link href='/ranking'><button>Classement</button> </Link>
            <Link href='/signup'><button>S'inscrire</button> </Link>
            <Link href='/login'><button>Connexion</button> </Link>
            </nav>
        </div>
    )
}