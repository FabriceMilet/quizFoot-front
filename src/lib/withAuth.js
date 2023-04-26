import { useEffect } from 'react';
import Router from 'next/router';
import Cookies from 'js-cookie';

// on crée un middleware pour vérifié si l'user est loggué

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    // Vérifie si le token JWT est présent dans les cookies
    const token = Cookies.get('jwt');

    // Si le token n'est pas présent, redirige vers la page de connexion
    useEffect(() => {
      if (!token) {
        Router.push('/login');
      }
    }, [token]);

    // Si l'utilisateur est authentifié, rend le composant enveloppé
    return token ? <WrappedComponent {...props} /> : null;
  };

  return Wrapper;
};

export default withAuth;