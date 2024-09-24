import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import SignUp from './components/signUp';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<SignUp />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
};

export default App;