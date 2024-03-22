import React from 'react';
import { Link } from 'react-router-dom';

function Home() {

    return (
        <div className='home'>
            
            <div className='topBar'>
                <div className='logo'>
                <button className='login'><Link to ='/login' className='underline'>Login</Link></button>
                </div>
                
            </div>
            <div className='mainpage'>
                    <div className="blackback"><h1 className='welcome'>Where Every Page <br/>Is A New Adventure</h1></div>
                    <div className='half'>
                        <button className='button'><Link to ='/search' className='underline'>Search for Books</Link></button>
                    </div>
                </div>
            
        </div>
    );
}

export default Home;