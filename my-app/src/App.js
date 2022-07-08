import { BrowserRouter as Router, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './components/LoginPage';
import Login from './components/CopyLoginForm';
import { NotFoundPage } from './components/NotFoundPage';
import routes from './routes';
import { AuthContext } from './contexts';
import './App.css';
import { useAuth } from './hooks';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(
    currentUser ? { username: currentUser.username } : null
  );

  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ username: userData.username });
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const ChoseChatOrLoginPage = () => {
  const authInfo = useAuth();
  return authInfo.user ? (
    <div>MainPage</div>
  ) : (
    <Navigate to={routes.loginPagePath()} />
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path={routes.mainPagePath()}
            element={<ChoseChatOrLoginPage />}
          />
          <Route path={routes.loginPagePath()} element={<Login />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
