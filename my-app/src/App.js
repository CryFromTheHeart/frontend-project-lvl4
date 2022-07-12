import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { ToastContainer as Toaster } from 'react-toastify';
import { LoginPage } from './components/LoginPage';
import { NotFoundPage } from './components/NotFoundPage';
import routes from './routes';
import { useAuth } from './hooks';
import ChatPage from './components/ChatPage';
import Navbar from './components/Navbar';
import { RegistrationPage } from './components/RegistrationPage';

const ChoseChatOrLoginPage = () => {
  const authInfo = useAuth();
  return authInfo.user ? (
    <ChatPage />
  ) : (
    <Navigate to={routes.loginPagePath()} />
  );
};

function App() {
  return (
    <Router>
      <div className="d-flex flex-column h-100">
        <Navbar />
        <Routes>
          <Route
            path={routes.mainPagePath()}
            element={<ChoseChatOrLoginPage />}
          />
          <Route path={routes.loginPagePath()} element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path={routes.signupPath()} element={<RegistrationPage />} />
        </Routes>
      </div>
      <Toaster />
    </Router>
  );
}

export default App;
