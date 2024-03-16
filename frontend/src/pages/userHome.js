/* Search User</h2>
                <h2>Add User</h2>
                <h2>Issue Book</h2>
                <h2>Return Book</h2>
                <h2>Reserve Book</h2> */


import React from 'react';
import {Link} from 'react-router-dom';
import AddUser from '../components/AddUser';
import ViewUser from '../components/ViewUser';
const BookHome = () => {
    return ( 
        <div className="userHome">
           {/* <h1>Manage Books</h1> */}
           <div className="homeContainer">
           <AddUser className="left_bh"/>
              <ViewUser className="right_bh"/>
              </div>
        </div>
     );
}
 
export default BookHome;