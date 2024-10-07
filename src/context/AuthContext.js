import React, {createContext, useState, useEffect, useContext} from 'react'

const AuthContext = createContext();
//Custom hook to use AuthContext
export const useAuth = () => {
 return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState({user:null, loading : true});

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      setAuth({ user, loading: false})
    }
    else {
      setAuth({ user:null, loading: false});
    }
  }, [])

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData)); 
    setAuth({ user: userData, loading: false});
  }

  const logout = (userData) => {
    localStorage.removeItem('user', JSON.stringify(userData)); 
    setAuth({ user: null, loading: false});
  }
  return (
    <AuthContext.Provider value={{
         auth, login, logout
    }}></AuthContext.Provider>
  )
}