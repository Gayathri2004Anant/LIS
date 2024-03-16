import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [userType, setUserType] = useState('user');
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [url, setUrl] = useState('');

    const validateUser = (userType, userid, password) => {
        // Assuming you have a function to validate the userType and userId
        return (userid === userId && password === 'password'); // Adjust this condition based on your validation logic
    }

    const handleLogin = () => {
        if (userType && userId) {
            if (validateUser(userType, userId, password)) {
                let redirectUrl = '';
                if (userType === 'user') {
                    redirectUrl = `/userlogin/${userId}`;
                } else if (userType === 'admin') {
                    redirectUrl = '/admin';
                }
                setUrl(redirectUrl);
            } else {
                console.log('Invalid userType or userId');
            }
        } else {
            console.log('UserType or UserId is missing');
        }
        console.log(`User Type: ${userType}, User ID: ${userId}, Password: ${password}`);
    };

    useEffect(() => {
        console.log('URL:', url);
    }, [url]);

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
                <button className='loginbutton' onClick={handleLogin}>Save Changes</button>
                <button className='loginbutton'><Link className to={url}>Login</Link></button>
            </div>
            <div className='half2'></div>
        </div>
    );
};

export default LoginPage;
