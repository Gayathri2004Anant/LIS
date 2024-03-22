
// import React, { useState } from 'react';
// import {Link} from 'react-router-dom';

// const ViewDefaulters = () => {
//     const [userData, setUserData] = useState([]);

//     const GenNotifications = async () => {
//         try {
//             const response = await fetch(`http://localhost:8000/api/adm/gennotice/`);
//             if (!response.ok) {
//                 throw new Error('Failed to fetch user data');
//             }
//             const data = await response.json();
//             setUserData(data);
//         } catch (error) {
//             console.error('Error fetching user data:', error);
//         }
//     };

//     return ( <div>
//         <button onClick={GenNotifications}>send notification</button>
//         {userData && (
//             <div className="wrapper">
//                 {userData.map((user, index) => (
//                 <div key={index} className='userDetails'>
//                     <div className="user-wrappe">
//                     <h3>User Info</h3>
//                     <p>Name: {user.name}</p>
//                     <p>Code: {user.code}</p>
//                     <p>Email: {user.email}</p>
//                     <p>Active No: {user.active_no}</p>
//                     <p>Reserve No: {user.reserve_no}</p>
//                     <p>Fine: {user.fine}</p>
//                     <p>Valid Till: {user.valid_till}</p>
//                     <p>Active Books:</p>
//                     <div className='active_books'>
                    
//                     {user.active_books.map(id => (
//                     <Link to = {"book/"+id} key={id}>
//                         <p>{id}</p>
//                     </Link>
//                 ))}
//             </div>
//             <p>Reserved Books:</p>
//             <div className='active_books'>       
//                     {user.reserved_books.map(id => (
//                     <Link to = {"book/"+id} key={id}>
//                         <p>{id}</p>
//                     </Link>
//                 ))}
//             </div>
//                 </div>
//                 </div>
//                 ))}
                
//             </div>
            
//             )}
//     </div> );
// };

// export default ViewDefaulters;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ViewDefaulters = () => {
    const [transData, setTransData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/adm/gennotice/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                setTransData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData(); // Call fetchData when component mounts
    }, []); // Empty dependency array ensures it only runs once after mount

    return (
        <div>
            {/* <button onClick={() => setUserData([])}>Clear Data</button> */}
            {/* <button onClick={GenNotifications}>Send Notification</button> */}
            {transData && (
                <div className="transwrapper">
                    <h2>Fined Transactions</h2>
                    {transData.map((trans, index) => (
                        <div key={index} className='transDetails'>
                            <div className="trans-wrapper">
                                <p>User Code: {trans.user_code}</p>
                                <p>ISBN: {trans.book_id}</p>
                                <p>Issue Date: {trans.issue_date}</p>
                                <p>Due Date: {trans.due_date}</p>
                                <p>Dues: {trans.dues}</p>
                                
                            </div>
                        </div>
                    ))}
                    <Link to="/userlogin/admin"><button>Back</button></Link>
                </div>
            )}
        </div>
    );
};

export default ViewDefaulters;
