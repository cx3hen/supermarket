import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Home from '../pages/Home';
import Users from '../components/Users';
import Roles from '../components/Roles';
import Rights from '../components/Rights';
import Goods from '../components/Goods';
import Params from '../components/Params';

const Routers = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Link to="/page2">link</Link>} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home/*" element={<Home />}>
            <Route path="users" element={<Users />} />
            <Route path="roles" element={<Roles />} />
            <Route path="rights" element={<Rights />} />
            <Route path="goods" element={<Goods />} />
            <Route path="params" element={<Params />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};
export default Routers;
