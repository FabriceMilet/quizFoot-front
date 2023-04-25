import Header from '../components/Header'
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export default function Layout({ children }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const jwt = Cookies.get("jwt");

    useEffect(() => {
        
        console.log('jwt', jwt);
        if (jwt){
            setIsLoggedIn(true);
        }else{
            setIsLoggedIn(false);
        }
        
    }, [jwt]);

    return (
        <div>
            <Header isLoggedIn={isLoggedIn} />
            {children}
        </div>
    )
}