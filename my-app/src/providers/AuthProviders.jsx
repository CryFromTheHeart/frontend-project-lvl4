import React, { useState } from 'react';
import { AuthContext } from '../contexts';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(
    currentUser ? { username: currentUser.username } : null,
  );

  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ username: userData.username });
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const getHeaderAuth = () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    return { Authorization: `Bearer ${userData.token}` };
  };
  return (
    <AuthContext.Provider value={
      {
        user, logIn, logOut, getHeaderAuth 
      }
    }
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
