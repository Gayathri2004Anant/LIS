import React from 'react';
import { Link } from 'react-router-dom';
import './homepage.css'; 

function Home() {

    return (
        <div className='div'>
            <h1 className='a'>Welcome to our website!</h1>
            <div className='link'><Link to ='/search'>Search for Books</Link></div>
            <br/>
            <div className='link'><Link to ='/login'>Login</Link></div>
        </div>
    );
}

export default Home;
