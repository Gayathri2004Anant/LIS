import React from 'react';
import {Link} from 'react-router-dom';
import AddBook from '../components/AddBook';
import ViewBook from '../components/ViewBook';
const BookHome = () => {
    return ( 
        <div className="bookHome">
           {/* <h1>Manage Books</h1> */}
           <div className="homeContainer">
           <AddBook className="left_bh"/>
              <ViewBook className="right_bh"/>
              </div>
        </div>
     );
}
 
export default BookHome;