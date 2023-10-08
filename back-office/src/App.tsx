import './App.scss';
import Sidebar from './components/organims/Sidebar/Sidebar';
import RoutesNavigation from './routes/RoutesNavigation';


const App: React.FC = () => {

  return (
    <div className="element">
        <Sidebar />
        {/* <RoutesNavigation /> */}
    </div>
  );
};

export default App;