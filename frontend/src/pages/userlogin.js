// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import UserDetails from '../components/UserDetails';
// import "../styles/userlogin.css";
// import { Divider } from '@material-ui/core';

// const UserLogin = () => {
//     const { idNumber } = useParams();
//     console.log(idNumber, "idNumber");
//     const [user,setUser]=useState({
//         name: "",
//         code: "",
//         email: "",
//     });

//     useEffect(() => {
//         const getUser = async () => {
//           try {
//             let response = await fetch(`http://localhost:8000/api/users/code/${idNumber}`);
//             let data = await response.json();
//             // console.log(data);
//             setUser(data);
//             console.log(user);
//             console.log(user.available, "available");
//           } catch (error) {
//             console.error("Error fetching user:", error);
//           }
//         };
//         getUser();
//     }, [idNumber]);

//     return (
//       <div className="userloginpage">
//       {/* {user.map((usr,idx)=>{
//         <div>
//           <UserDetails user={usr}/>
//         </div>
//       }) }     */}
//       {user.name}
//       </div>   // <UserDetails user={user} />
//       );
// };

// export default UserLogin;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserDetails from '../components/UserDetails';
import "../styles/userlogin.css";
import { Divider } from '@material-ui/core';

const UserLogin = () => {
    const { idNumber } = useParams();
    console.log(idNumber, "idNumber");
    const [user, setUser] = useState([]);

    useEffect(() => {
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
        getUser();
    }, [idNumber]);

    // Log user outside useEffect to see the updated value
    console.log(user);

    return (
        <div className="userloginpage">
            {user&&user.name}
          
        </div>   // <UserDetails user={user} />
    );
};

export default UserLogin;
