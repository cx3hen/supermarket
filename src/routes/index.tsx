import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Login from '../pages/Login';

const Routers = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Link to="/page2">link</Link>} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
};
export default Routers;
