import Cookies from 'js-cookie';

// Définition des types pour les données que vous souhaitez stocker dans les cookies

// Fonction pour définir un cookie
export const setCookie = (key: string, value: any, options?: Cookies.CookieAttributes) => {
  Cookies.set(key, JSON.stringify(value), options);
};

// Fonction pour récupérer un cookie
export const getCookie = (key: string): any | null => {
  const cookie = Cookies.get(key);
  return cookie ? JSON.parse(cookie) : null;
};

// Fonction pour supprimer un cookie
export const removeCookie = (key: string) => {
  Cookies.remove(key);
};

// removeCookie('cart');

type userData= {
    pseudoUser: string;
    emailUser: string;
    idUser: number;
}

export const setUserCookie = (user: userData) => {
    setCookie("Connected", user, {expires: 7});
}

export const isConnected = ():boolean => {
    const user = getCookie("Connected");
    if (user){
        return true;
    }
    return false;
}

export const getUserCookie = ():userData => {
    const user = getCookie("Connected");
    return user;
}

export const removeUserCookie = () => {
    removeCookie("Connected");
}