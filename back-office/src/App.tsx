import './App.scss';
import { useAuthContext } from './contexts/AuthContext';
import Layout from './layout/Layout';
import { Login} from './pages';


const App: React.FC = () => {
  const { isAuthenticated } = useAuthContext();

  return (
    <div className="element">
       {  isAuthenticated && isAuthenticated !== false  ? (<Layout />) : <Login /> }
    </div>
  );
};

export default App;