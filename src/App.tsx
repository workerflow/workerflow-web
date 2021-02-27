import { Fragment } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

import Home from "./pages/Home";
import Login from "./pages/Login";

function About() {
  return <h1>About</h1>;
}

export default function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="about" element={<About />} />
        </Routes>
      </Router>
    </Fragment>
  );
}
