import './App.scss';
import { useAuthContext } from './contexts/AuthContext';
import Layout from './layout/Layout';
import PublicRoutes from './routes/PublicRoutes/PublicRoutes';

const App: React.FC = () => {
  
  const { isAuthenticated } = useAuthContext();

  return (
    <div className="element">
       {  isAuthenticated && isAuthenticated !== false ? 
          (<Layout />) : 
          (<PublicRoutes />)
       }
    </div>
  );
};

export default App;