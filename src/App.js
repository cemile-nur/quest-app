
import './App.css';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import User from './components/User/User';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar></Navbar>
        <switch>
          <Route exact path="/" Component={Home}></Route>
          <Route exact path= "/users/:userId" Component={User}></Route>
        </switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
