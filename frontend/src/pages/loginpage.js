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
            } else {
            console.log('Invalid userType or userId');
            }
        } else {
            console.log('UserType or UserId is missing');
        }
        console.log(`User Type: ${userType}, User ID: ${userId}, Password: ${password}`);
    };

    return (
        <div>
            <h2>Login Page</h2>
            <select onChange={(e) => setUserType(e.target.value)}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
            <input type="text" placeholder="User ID" onChange={(e) => setUserId(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}><Link to='/search'>Login</Link></button>
        </div>
    );
};

export default LoginPage;