import React, { useState } from 'react';

const LoginPage = () => {
    const [userType, setUserType] = useState('user');
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Handle login logic here
        if(userType && userId) {
            // Assuming you have a function to validate the userType and userId
            if(validateUser(userType, userId)) {
            // Assuming you have a function to navigate to another page
            navigateToPage('/homepage');
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
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginPage;