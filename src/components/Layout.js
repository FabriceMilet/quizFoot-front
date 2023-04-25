// import styles from '../styles/Header.module.scss';
import Header from '../components/Header'
import { UserProvider } from '../lib/authContext';

export default function Layout({ user, loading = false, children }) {
    return (
        <UserProvider value={{ user, loading }}>
            <Header />
            {children}
        </UserProvider>
    )
}