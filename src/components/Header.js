import styles from '../styles/Header.module.scss';
import Link from 'next/link';
import { FaSearch } from "react-icons/fa";
import { RxAvatar, RxHamburgerMenu } from "react-icons/rx"
import tlc from '../../public/images/tlc.png'
import { unsetToken } from '../lib/auth';
import { useState } from 'react';

export default function Header({ isLoggedIn }) {

    const handleLogout = () => {
        unsetToken()
        setShowMenu(false);
    }

    const [showMenu, setShowMenu] = useState(false);

    const HandleOpenMenu = () => {
        window.scrollTo({ top: 0 });
        setShowMenu(true);
    }
    const handleClose = () => {
        setShowMenu(false);
    }
    const handleClickOnButton = () => {
        setShowMenu(false);
    }

    return (<>
        {showMenu ? <div className={showMenu ? styles.containerMenu : styles.container}><div > 
        {isLoggedIn ?
                    (
                            <nav className={showMenu ? styles.containerNavigationMobile : styles.containerNavigation}>
                                <button onClick={handleClose}>X Fermer</button>
                                <div >
                                <Link href='/'><button onClick={handleClickOnButton}>Accueil</button> </Link></div>
                                <div >
                                <Link href='/search'><button onClick={handleClickOnButton}> Chercher un quiz</button> </Link>
                            </div>
                            <div >
                                <Link href='/profile'><button onClick={handleClickOnButton}> Page profile</button> </Link>
                            </div>
                                <div >
                                    <Link href='/ranking'><button onClick={handleClickOnButton}>Classement</button> </Link></div>
                                <div >
                                    <button onClick={handleLogout}>Se déconnecter</button></div>
                            </nav>
                       
                    )
                    :
                    (
                        <nav className={showMenu ? styles.containerNavigationMobile : styles.containerNavigation}>
                            <button onClick={handleClose}>X Fermer</button>
                            <div >
                                <Link href='/'><button onClick={handleClickOnButton}>Accueil</button> </Link></div>
                            <div >
                                <Link href='/search'><button onClick={handleClickOnButton}> Chercher un quiz</button> </Link>
                            </div>
                            <div >
                                <Link href='/ranking'><button onClick={handleClickOnButton}>Classement</button> </Link></div>
                            <div >
                                <Link href='/signup'><button onClick={handleClickOnButton}>S'inscrire</button> </Link></div>
                            <div >
                                <Link href='/login'><button onClick={handleClickOnButton}>Connexion</button> </Link></div>
                        </nav>
                    
                    )
                }
            
            </div></div> :
            <div className={styles.container}>


                <div className={styles.containerLogo}>
                    <Link href='/'><img src={tlc.src} alt="logo du site" /> </Link>
                </div>
                <h1 className={styles.containerTitle}>Trouve la compo</h1>

                {isLoggedIn ?
                    (
                        <>
                            <button className={styles.containerBurger} onClick={HandleOpenMenu}>
                                <RxHamburgerMenu />
                            </button>
                            <nav className={showMenu ? styles.containerNavigationMobile : styles.containerNavigation}>
                                <div className={styles.containerNavigation__logos}>
                                    <Link href='/search'><button><FaSearch size={20} /></button> </Link>
                                    <Link href='/profile'><button><RxAvatar size={25} /></button> </Link>
                                </div>
                                <div className={styles.containerNavigation__link}>
                                    <Link href='/ranking'><button>Classement</button> </Link></div>
                                <div className={styles.containerNavigation__link}>
                                    <button onClick={handleLogout}>Se déconnecter</button></div>
                            </nav>
                        </>
                    )
                    :
                    (<>
                        <button className={styles.containerBurger} onClick={HandleOpenMenu}>
                            <RxHamburgerMenu />
                        </button>
                        <nav className={showMenu ? styles.containerNavigationMobile : styles.containerNavigation}>
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
                    </>
                    )
                }

            </div>}
    </>)
}