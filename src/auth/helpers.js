import cookie from 'js-cookie';

export const setCookie = (name, value) => {
  if (window !== undefined) {
    cookie.set(name, value);
  }
};

export const getCookie = (name) => {
  if (window !== undefined) {
    return cookie.get(name);
  }
};

export const removeCookie = (name) => {
  if (window !== undefined) {
    cookie.remove(name);
  }
};

export const setLocalStorage = (name, value) => {
  if (window !== undefined) {
    localStorage.setItem(name, JSON.stringify(value));
  }
};

export const getLocalStorage = (name) => {
  if (window !== undefined) {
    return localStorage.getItem(name);
  }
};

export const removeLocalStorage = (name) => {
  if (window !== undefined) {
    localStorage.removeItem(name);
  }
};

export const authenticate = (response, next) => {
    setCookie('token', response.data.token);
    setLocalStorage('user', response.data.user);
    next();
};

export const isAuth = () => {
    const token = getCookie('token');
    if(!token){
        return false;
    }
    if(getLocalStorage('user')){
        const user = JSON.parse(getLocalStorage('user'));
        return user;
    }
    return false;
};

export const logout =next => {
    removeLocalStorage('user');
    removeCookie('token');
    next();
};

export const updateUser = (response, next) => {
  console.log("UPDATE USER IN LOCAL STORAGE HELPERS", response);
  if(window !== undefined){
    let auth = JSON.parse(localStorage.getItem('user'));
    auth = response.data.user;
    localStorage.setItem('user', JSON.stringify(auth));
  }
};