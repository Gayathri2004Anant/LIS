import React, { useState } from 'react';
import {Link} from 'react-router-dom';

const ViewUser = () => {
    const [searchKey, setSearchKey] = useState('');
    const [userData, setUserData] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/users/code/${searchKey}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/adm/users/delete/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            console.log('User deleted successfully');
            setUserData([]); 
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter user code"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            {userData && (
            <div className="wrapper">
                {userData.map((user, index) => (
                <div key={index}>
                    <h2>{user.name}</h2>
                    <p>{user.code}</p>
                </div>
                ))}
                <button className="delete" onClick={() => deleteUser(userData.id)}>Delete</button>
            </div>
            )}
            <Link to = "/issue-reserve"><h3>Issue/Return</h3></Link>
        </div>
    );
};

export default ViewUser;

// {userData && (
//     <div className="wrapper">
//         <div>
//             {/* <h2>{userData.name}</h2> */}
//             <pre>{JSON.stringify(userData, null, 2)}</pre>
//         </div>
//         <button className="delete" onClick={() => deleteUser(userData.id)}>Delete</button>
//     </div>
// )}

