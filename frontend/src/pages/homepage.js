import React from 'react';
import { Link } from 'react-router-dom';

function Home() {

    return (
        <div>
            <h1>Welcome to our website!</h1>
            <div><Link to ='/search'>Search for Books</Link></div>
            <div><Link to ='/login'>Login</Link></div>
        </div>
    );
}

export default Home;
