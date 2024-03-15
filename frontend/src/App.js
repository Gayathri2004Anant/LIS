import Home from './pages/homepage';
import Search from './pages/searchPage';
import LoginPage from './pages/loginpage';
import BookPage from './pages/bookPage';
import AdminPage from './pages/adminPage';
import BookHome from './pages/bookHome';
import UserHome from './pages/userHome';
import IssueOrReservePage from './pages/issueOrReserve';
import "./styles/searchStyles.css";
import "./styles/bookStyles.css";
import "./styles/adminPage.css";
import "./styles/userHome.css";
import "./styles/bookHome.css";

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
        <Route path="/issue-reserve">
          <IssueOrReservePage />
        </Route>
        <Route path="/user-home">
          <UserHome />
        </Route>
        <Route path="/book-home">
          <BookHome />
        </Route>
        <Route path="/admin">
          <AdminPage />
        </Route>
        <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/search">
            <Search />
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
