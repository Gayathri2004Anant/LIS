import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [userType, setUserType] = useState('user');
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const validateUser = (userType, userId, password) => {
        // Assuming you have a function to validate the userType and userId
        return (userId === 'admin' && password === 'password');
    }

    const handleLogin = () => {
        // Handle login logic here
        if(userType && userId) {
            // Assuming you have a function to validate the userType and userId
            if(validateUser(userType, userId, password)) {
                if(userType === 'user') {
                    return <Link to='/userlogin'>User Login</Link>
                } else if(userType === 'admin') {
                    return <Link to='/adminlogin'>Admin Login</Link>
                }
            } else {
            console.log('Invalid userType or userId');
            }
        } else {
            console.log('UserType or UserId is missing');
        }
        console.log(`User Type: ${userType}, User ID: ${userId}, Password: ${password}`);
    };

    return (
        <div className='loginfull'>
            <div className='half1'> 
                <h2 className='LoginPage'>Login Page</h2>
                <select className='selectbox' onChange={(e) => setUserType(e.target.value)}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <input className='textbox' type="text" placeholder="User ID" onChange={(e) => setUserId(e.target.value)} />
                <input className='password' type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button className='loginbutton' onClick={handleLogin}><Link className='underline1' to='/search'>Login</Link></button>
            </div>
            <div className='half2'></div>
        </div>
    );
};

export default LoginPage;