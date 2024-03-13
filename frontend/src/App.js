import Home from './pages/homepage';
import Search from './pages/searchPage';
import LoginPage from './pages/loginpage';

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
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
    
  );
}

export default App;
