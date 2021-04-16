import { Fragment } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

import Home from "./pages/Home";
import Login from "./pages/Login";
import Editor from "./pages/Editor";

function About() {
  return <h1>About</h1>;
}

export default function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/editor" element={<Editor />} />
        </Routes>
      </Router>
    </Fragment>
  );
}
