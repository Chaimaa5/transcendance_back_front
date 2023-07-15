import './App.css';
import './index.css';
import Container from './component/app/index';
import Login from './component/login/index';
import Button_ from './component/button/index'
import Setup from './component/setup';
import Profile from './component/profile/index';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Leaderboord from './component/leaderboord/index';

function App() {
  return (
     <div className="app-">
    <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path={"/Home"}  element={<Container />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/Profile" element={<Container />} />
          <Route path="/Leaderboord" element={<Container />} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
