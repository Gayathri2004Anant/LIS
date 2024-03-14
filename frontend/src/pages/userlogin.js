
import React from 'react';
import { Link } from 'react-router-dom';

const UserLogin = () => {
    // Replace these with actual user data
    const user = {
        name: 'John Doe',
        membershipValidity: 'Valid',
        idNumber: '123456',
        codeNumber: 'ABC123',
        email: 'johndoe@example.com',
        username: 'johndoe',
        password: 'password'
    };

    return (
        <div>
            <h1>User Login</h1>
                   <h2>User Details</h2>
                    <p>Name: {user.name}</p>
                    <p>Membership Validity: {user.membershipValidity}</p>
                    <p>ID Number: {user.idNumber}</p>
                    <p>Code Number: {user.codeNumber}</p>
                    <p>Email: {user.email}</p>
                    <p>Username: {user.username}</p>
                    <p>Password: {user.password}</p>
                    <Link to='/search'>
                        Search for Books
                    </Link>
                    <Link to='/userstatus'>
                        Status of Books
                    </Link>
        </div>
    );
};

export default UserLogin;