
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import UserDetails from '../components/UserDetails';
// import "../styles/userlogin.css";

// const UserLogin = () => {
//     const { idNumber } = useParams();
//     const [user, setUser] = useState([]);

//     useEffect(() => {
//         const getUser = async () => {
//             try {
//                 let response = await fetch(`http://localhost:8000/api/users/code/${idNumber}`);
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 }
//                 let data = await response.json();
//                 setUser(data);
//             } catch (error) {
//                 console.error("Error fetching user:", error);
//             }
//         };
//         getUser();
//     }, [idNumber]);

//     // Log user outside useEffect to see the updated value
//     console.log(user[0], "user[0].name");

//     return (
//       <UserDetails user={user[0]} />
//     // <div>Hello</div>
//     );
// };

// export default UserLogin;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserDetails from '../components/UserDetails';
import "../styles/userlogin.css";

const UserLogin = () => {
    const { idNumber } = useParams();
    const [user, setUser] = useState([]);

    
        const getUser = async () => {
            try {
                let response = await fetch(`http://localhost:8000/api/users/code/${idNumber}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                let data = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        
        useEffect(() => {
            getUser();
        }, [idNumber]);
    console.log(user[0], "user[0].name");
    return (
        <div className="wrapper">
        {user.map((usr, index) => (
        <div key={index} className='userdetails'>
            <UserDetails user={usr}/>
        </div>))}
        </div>
    
    )
        };


export default UserLogin;
