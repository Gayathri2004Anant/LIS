import React from 'react';
import {Link} from 'react-router-dom';
import AddBook from '../components/AddBook';
import ViewBook from '../components/ViewBook';
const BookHome = () => {
    return ( 
        <div className="bookHome">
           {/* <h1>Manage Books</h1> */}
           <div className="homeContainer">
            <div className="left_bh">
           <AddBook/>
           </div>
           <div className="right_bh">
              <ViewBook/>
              </div>
              </div>
        </div>
     );
}
 
export default BookHome;