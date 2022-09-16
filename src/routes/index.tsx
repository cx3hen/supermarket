import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Login from '../pages/Login';
import Home from '../pages/Home';
import User from '../components/User';

const Routers = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Link to="/page2">link</Link>} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home/*" element={<Home />}>
            <Route path="user" element={<User />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};
export default Routers;
