import React from 'react';
import { Link } from 'react-router-dom';

function Home() {

    return (
        <div className='home'>
            
            <div className='topbar'>
                <div className='logo'>
                <button className='login'><Link to ='/login' className='underline'>Login</Link></button>
                </div>
                <div className='mainpage'>
                    <div className='half'><h1 className='welcome'>Welcome to our website! <br/>
                    Please select an option below:</h1></div>
                    <div className='half'></div>
                    <div className='half'>
                        <button className='button'><Link to ='/search' className='underline'>Search for Books</Link></button>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Home;
