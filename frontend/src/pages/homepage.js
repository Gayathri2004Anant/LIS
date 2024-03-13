import React from 'react';
import { useHistory } from 'react-router-dom';

function HomePage1() {
    const history = useHistory();

    const handleSearchBooks = () => {
        history.push('/search-books');
    };

    const handleLogin = () => {
        history.push('/loginpage');
    };

    return (
        <div>
            <h1>Welcome to our website!</h1>
            <button onClick={handleSearchBooks}>Search for Books</button>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default HomePage1;
