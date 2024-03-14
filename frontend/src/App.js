import Home from './pages/homepage';
import Search from './pages/searchPage';
import LoginPage from './pages/loginpage';
import BookPage from './pages/bookPage';
import "./styles/searchStyles.css";
import "./styles/bookStyles.css";

import UserLogin from './pages/userlogin';
import AdminLogin from './pages/adminlogin';
import UserStatus from './pages/userstatus';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';


import React from "react";

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/userlogin">
            <UserLogin />
          </Route>
          <Route path="/userstatus">
            <UserStatus />
          </Route>
          <Route path="/adminlogin">
            <AdminLogin />
          </Route>
          <Route path="/book/:id">
            <BookPage/>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
    
  );
}

export default App;
