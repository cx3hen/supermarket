import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Home from '../pages/Home';
import Users from '../components/Users';
import Roles from '../components/Roles';
import Rights from '../components/Rights';

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
          </Route>
        </Routes>
      </Router>
    </>
  );
};
export default Routers;
