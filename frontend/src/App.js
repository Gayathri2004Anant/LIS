// import Home from './pages/homepage';
// import Search from './pages/searchPage';
// import LoginPage from './pages/loginpage';
// import BookPage from './pages/bookPage';
// import AdminPage from './pages/adminPage';
// import BookHome from './pages/bookHome';
// import UserHome from './pages/userHome';
// import IssueOrReservePage from './pages/issueOrReserve';
// import UserLoginStatus from './pages/userloginstatus';
// import Transactions from './pages/transaction';
// import ViewDefaulters from './pages/viewDefaulters';
// import UserLogin from './pages/userlogin';
// import "./styles/searchStyles.css";
// import "./styles/bookStyles.css";
// import "./styles/adminPage.css";
// import "./styles/userHome.css";
// import "./styles/bookHome.css";
// import "./styles/issueReserve.css";
// import "./styles/receipt.css";
// import "./styles/homepage1.css";
// import "./styles/loginPage.css";

// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from 'react-router-dom';


// import React from "react";

// function App() {
//   return (
//     <div className="app">
//       <Router>
//         <Switch>
//           <Route path="/transactions">
//             <Transactions />
//           </Route>
//         </Switch>
//         <Switch>
//         <Route path="/issue-reserve">
//           <IssueOrReservePage />
//         </Route>
//         <Route path="/user-home">
//           <UserHome />
//         </Route>
//         <Route path="/book-home">
//           <BookHome />
//         </Route>
//         <Route path="/admin">
//           <AdminPage />
//         </Route>
//         <Route path="/login">
//             <LoginPage />
//           </Route>
//           <Route path="/search">
//             <Search />
//           </Route>
//           <Route path="/book/:id">
//             <BookPage/>
//           </Route>
//           <Route path="/userlogin/:idNumber">
//             <UserLogin />
//           </Route>
//           <Route path="/userloginstatus/:idNumber">
//             <UserLoginStatus />
//           </Route>
//           <Route path="/">
//           <Home />
//           </Route>
//         </Switch>
//       </Router>
//     </div>
    
//   );
// }

// export default App;

import Home from './pages/homepage';
import Search from './pages/searchPage';
import LoginPage from './pages/loginpage';
import BookPage from './pages/bookPage';
import AdminPage from './pages/adminPage';
import BookHome from './pages/bookHome';
import UserHome from './pages/userHome';
import IssueOrReservePage from './pages/issueOrReserve';
import UserLoginStatus from './pages/userloginstatus';
import Transactions from './pages/transaction';
import ViewDefaulters from './pages/viewDefaulters';
import UserLogin from './pages/userlogin';
import "./styles/searchStyles.css";
import "./styles/bookStyles.css";
import "./styles/adminPage.css";
import "./styles/userHome.css";
import "./styles/bookHome.css";
import "./styles/issueReserve.css";
import "./styles/receipt.css";
import "./styles/homepage1.css";
import "./styles/loginPage.css";
import "./styles/UserDetails.css";
import "./styles/userlogin.css";
import "./styles/defaulters.css";


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import PrivateRoute from './utils/PrivateRoute';
import AdminRoute from './utils/AdminRoute';
import { AuthProvider } from './context/AuthContext';

import React from "react";

function App() {
  return (
    <div className="app">
      <Router>
      <AuthProvider>
        <Switch>
        
          <AdminRoute path="/defaulters">
            <ViewDefaulters/>
          </AdminRoute>
          <AdminRoute path="/transactions">
            <Transactions />
          </AdminRoute>
          <AdminRoute path="/issue-reserve">
            <IssueOrReservePage />
          </AdminRoute>
          <AdminRoute path="/user-home">
            <UserHome />
          </AdminRoute>
          <AdminRoute path="/book-home">
            <BookHome />
          </AdminRoute>
          <AdminRoute path="/userlogin/admin">
            <AdminPage />
          </AdminRoute>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/book/:id">
            <BookPage/>
          </Route>
          <PrivateRoute path="/userlogin/:idNumber">
            <UserLogin />
          </PrivateRoute>
          <PrivateRoute path="/userloginstatus/:idNumber">
            <UserLoginStatus />
          </PrivateRoute>
          <Route path="/">
            <Home />
          </Route>
          
        </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;

