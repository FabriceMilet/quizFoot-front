import styles from '../styles/Header.module.scss';
import Link from 'next/link';
import { FaSearch } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx"
import tlc from '../../public/images/tlc.png'
import { unsetToken } from '../lib/auth';
import Cookies from 'js-cookie';

export default function Header({isLoggedIn}) {

    const handleLogout = () => {
        unsetToken()   
    }
    const jwt = Cookies.get('jwt')
    console.log('vérifin jwt', jwt);
console.log('isLoggedIn', isLoggedIn);
    return (
        <div className={styles.container}>
            <div className={styles.containerLogo}>
                <Link href='/'><img src={tlc.src} alt="logo du site" /> </Link>
            </div>
            <h1 className={styles.containerTitle}>Trouve la compo</h1>

            {isLoggedIn ?
                (
                    <nav className={styles.containerNavigation}>
                        <div className={styles.containerNavigation__logos}>
                            <Link href='/search'><button><FaSearch size={20} /></button> </Link>
                            <Link href='/profile'><button><RxAvatar size={25} /></button> </Link>
                        </div>
                        <div className={styles.containerNavigation__link}>
                            <Link href='/ranking'><button>Classement</button> </Link></div>
                        <div className={styles.containerNavigation__link}>
                            <button onClick={handleLogout}>Se déconnecter</button></div>
                    </nav>

                )
                : 
                (
                    <nav className={styles.containerNavigation}>
                        <div className={styles.containerNavigation__logos}>
                            <Link href='/search'><button><FaSearch size={20} /></button> </Link>
                        </div>
                        <div className={styles.containerNavigation__link}>
                            <Link href='/ranking'><button>Classement</button> </Link></div>
                        <div className={styles.containerNavigation__link}>
                            <Link href='/signup'><button>S'inscrire</button> </Link></div>
                            <div className={styles.containerNavigation__link}>
                        <Link href='/login'><button>Connexion</button> </Link></div>
                    </nav>
                )}
             
        </div>
    )
}