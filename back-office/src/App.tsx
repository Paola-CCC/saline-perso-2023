import './App.scss';
import { Login } from './components/pages';
import { useAuthContext } from './contexts/AuthContext';
import Layout from './layout/Layout';

const App: React.FC = () => {
  
  const { isAuthenticated } = useAuthContext();

  return (
    <div className="element">
      { isAuthenticated && (<Layout />)}
      { !localStorage.getItem('jwt') && (<Login />)}
    </div>
  );
};

export default App;