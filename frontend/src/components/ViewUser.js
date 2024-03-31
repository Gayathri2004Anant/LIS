import React, { useState } from 'react';
import EditUser from '../components/EditUser';
import {Link} from 'react-router-dom';

const ViewUser = () => {
    const [searchKey, setSearchKey] = useState('');
    const [userData, setUserData] = useState([]);
    const [editing, setEditing] = useState(false);

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
    const handleEdit = () => {
        setEditing(true);
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
    // console.log(userData[0].active_books);
    return (
        <div className='viewBook'>
            <h2>Search/ Delete</h2>
            <div className="searchWrapperLight">
            <input
                type="text"
                placeholder="Enter user code"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            { !editing && userData && (
            <div className="wrapper">
                {userData.map((user, index) => (
                <div key={index} className='userDetails'>
                    <div className="user-wrapper">
                    <h3>User Info</h3>
                    <p>Name: {user.name}</p>
                    <p>Code: {user.code}</p>
                    <p>Email: {user.email}</p>
                    <p>Username: {user.username}</p>
                    <p>Password: {user.password}</p>
                    <p>Notification: {user.notification}</p>
                    <p>Type: {(user.type === 1 && "UG") || (user.type === 2 && "PG" || (user.type === 3) && "RS" || (user.type === 4) && "Faculty")}</p>
                    <p>Max Books: {user.max_books}</p>
                    <p>Active No: {user.active_no}</p>
                    <p>Reserve No: {user.reserve_no}</p>
                    <p>Fine: {user.fine}</p>
                    <p>Valid Till: {user.valid_till}</p>
                    <p>Active Books:</p>
                    <div className='active_books'>
                    
                    {user.active_books.map(id => (
                    <Link to = {"book/"+id} key={id}>
                        <p>{id}</p>
                    </Link>
                ))}
            </div>
            <p>Reserved Books:</p>
            <div className='active_books'>
                    
                    {user.reserved_books.map(id => (
                    <Link to = {"book/"+id} key={id}>
                        <p>{id}</p>
                    </Link>
                ))}
            </div>
                </div>
                </div>
                ))}
                <button className="delete" onClick={() => {console.log(userData[0].id);deleteUser(userData[0].id);}}>Delete</button>
                <button onClick={handleEdit}>Edit</button>
                
            </div>
            
            )}

            { editing && userData && (
            <div className="wrapper">
                {userData.map((user, index) => (
                <div key={index} className='userDetails'>
                    <div className="user-wrapper">
                    <h3>Edit User Info</h3>
                    <p>Name:</p>
                    <input type="text" placeholder="Name" value={user.name} onChange={(e) => setUserData({ ...user, name: e.target.value })} />
                    <p>Code:</p>
                    <input type="text" placeholder="Code" value={user.code} onChange={(e) => setUserData({ ...user, code: e.target.value })} />
                    <p>Email:</p>
                    <input type="text" placeholder="Email" value={user.email} onChange={(e) => setUserData({ ...user, email: e.target.value })} />
                    <p>Username:</p>
                    <input type="text" placeholder="UserName" value={user.username} onChange={(e) => setUserData({ ...user, username: e.target.value })} />
                    <p>Password:</p>
                    <input type="text" placeholder="Password" value={user.password} onChange={(e) => setUserData({ ...user, password: e.target.value })} />
                    <p>Notification:</p>
                    <input type="text" placeholder="Notification" value={user.notification} onChange={(e) => setUserData({ ...user, notification: e.target.value })} />
                    <p>Type: {(user.type === 1 && "UG") || (user.type === 2 && "PG" || (user.type === 3) && "RS" || (user.type === 4) && "Faculty")}</p>
                    <p>Max Books: {user.max_books}</p>
                    <p>Active No: {user.active_no}</p>
                    <p>Reserve No: {user.reserve_no}</p>
                    <p>Fine: {user.fine}</p>
                    <p>Valid Till: {user.valid_till}</p>
                    <p>Active Books:</p>
                    <div className='active_books'>
                    
                    {user.active_books.map(id => (
                    <Link to = {"book/"+id} key={id}>
                        <p>{id}</p>
                    </Link>
                ))}
            </div>
            <p>Reserved Books:</p>
            <div className='active_books'>
                    
                    {user.reserved_books.map(id => (
                    <Link to = {"book/"+id} key={id}>
                        <p>{id}</p>
                    </Link>
                ))}
            </div>
                </div>
                </div>
                ))}
                {/* <button className="delete" onClick={() => {console.log(userData[0].id);deleteUser(userData[0].id);}}>Delete</button> */}
                {/* <button onClick={handleEdit}>Edit</button> */}
                
            </div>
            
            )}
        </div>
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

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import EditUser from '../components/EditUser';

// const ViewUser = () => {
//     const initialUserState = {
//         id:0,
//         name: "",
//         code: "",
//         email: "",
//         username: "",
//         password: "",
//         notification: "",
//         type: 1,
//         max_books: 2,
//         active_no: 0,
//         reserve_no: 0,
//         fine: 0,
//         valid_till: "2024-03-16",
//         active_books: [],
//         reserved_books: []
//     };

//     const [searchKey, setSearchKey] = useState('');
//     const [userData, setUserData] = useState(initialUserState);
//     const [editing, setEditing] = useState(false);

//     const handleSearch = async () => {
//         try {
//             const response = await fetch(`http://localhost:8000/api/users/code/${searchKey}`);
//             if (!response.ok) {
//                 throw new Error('Failed to fetch user data');
//             }
//             const data = await response.json();
//             setUserData(data);
//         } catch (error) {
//             console.error('Error fetching user data:', error);
//         }
//     };

//     const handleEdit = () => {
//         setEditing(true);
//     };

//     const EditUser = async (id) =>{
//         try {
//             const response = await fetch(`http://localhost:8000/api/adm/users/edit_user/${id}`, {
//                 method: 'DELETE',
//             });
//             if (!response.ok) {
//                 throw new Error('Failed to delete user');
//             }
//             console.log('User deleted successfully');
//             setUserData([]); 
//         } catch (error) {
//             console.error('Error deleting user:', error);
//         }
//     }
//     const deleteUser = async (id) => {
//         try {
//             const response = await fetch(`http://localhost:8000/api/adm/users/delete/${id}`, {
//                 method: 'DELETE',
//             });
//             if (!response.ok) {
//                 throw new Error('Failed to delete user');
//             }
//             console.log('User deleted successfully');
//             setUserData([]); 
//         } catch (error) {
//             console.error('Error deleting user:', error);
//         }
//     };

//     return (
//         <div className='viewBook'>
//             <h2>Search/ Delete</h2>
//             <div className="searchWrapperLight">
//                 <input
//                     type="text"
//                     placeholder="Enter user code"
//                     value={searchKey}
//                     onChange={(e) => setSearchKey(e.target.value)}
//                 />
//                 <button onClick={handleSearch}>Search</button>
//             </div>

//             {userData.id!=0 && !editing && (
//                 <div className="wrapper">
//                     {userData.map((user, index) => (
//                         <div key={index} className='userDetails'>
//                             <div className="user-wrapper">
//                                 <h3>User Info</h3>
//                                 <p>Name: {user.name}</p>
//                                 <p>Code: {user.code}</p>
//                                 <p>Email: {user.email}</p>
//                                 <p>Username: {user.username}</p>
//                                 <p>Password: {user.password}</p>
//                                 <p>Notification: {user.notification}</p>
//                                 <p>Type: {(user.type === 1 && "UG") || (user.type === 2 && "PG" || (user.type === 3) && "RS" || (user.type === 4) && "Faculty")}</p>
//                                 <p>Max Books: {user.max_books}</p>
//                                 <p>Active No: {user.active_no}</p>
//                                 <p>Reserve No: {user.reserve_no}</p>
//                                 <p>Fine: {user.fine}</p>
//                                 <p>Valid Till: {user.valid_till}</p>
//                                 <p>Active Books:</p>
//                                 <div className='active_books'>
//                                     {user.active_books.map(id => (
//                                         <Link to={"book/" + id} key={id}>
//                                             <p>{id}</p>
//                                         </Link>
//                                     ))}
//                                 </div>
//                                 <p>Reserved Books:</p>
//                                 <div className='active_books'>
//                                     {user.reserved_books.map(id => (
//                                         <Link to={"book/" + id} key={id}>
//                                             <p>{id}</p>
//                                         </Link>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                     <button className="delete" onClick={() => {console.log(userData[0].id);deleteUser(userData[0].id);}}>Delete</button>
//                  <button onClick={handleEdit}>Edit</button>
//                 </div>
//             )}

//             {editing && userData.id!=0 && (
//                 <div className="wrapper">
//                     {userData.map((user, index) => (
//                         <div key={index} className='userDetails'>
//                             <div className="user-wrapper">
//                                 <h3>Edit User Info</h3>
//                                 <p>Name:</p>
//                                 <input type="text" placeholder="Name" value={user.name} onChange={(e) => console.log(e.target.value)} />

//                                 <p>Code:</p>
//                                 <input type="text" placeholder="Code" value={user.code} onChange={(e) => setUserData({ ...user, code: e.target.value })} />
//                                 <p>Email:</p>
//                                 <input type="text" placeholder="Email" value={user.email} onChange={(e) => setUserData({ ...user, email: e.target.value })} />
//                                 <p>Username:</p>
//                                 <input type="text" placeholder="UserName" value={user.username} onChange={(e) => setUserData({ ...user, username: e.target.value })} />
//                                 <p>Password:</p>
//                                 <input type="text" placeholder="Password" value={user.password} onChange={(e) => setUserData({ ...user, password: e.target.value })} />
//                                 <p>Notification:</p>
//                                 <input type="text" placeholder="Notification" value={user.notification} onChange={(e) => setUserData({ ...user, notification: e.target.value })} />
//                                 <p>Type: {(user.type === 1 && "UG") || (user.type === 2 && "PG" || (user.type === 3) && "RS" || (user.type === 4) && "Faculty")}</p>
//                                 <p>Max Books: {user.max_books}</p>
//                                 <p>Active No: {user.active_no}</p>
//                                 <p>Reserve No: {user.reserve_no}</p>
//                                 <p>Fine: {user.fine}</p>
//                                 <p>Valid Till: {user.valid_till}</p>
//                                 <p>Active Books:</p>
//                                 <div className='active_books'>
//                                     {user.active_books.map(id => (
//                                         <Link to={"book/" + id} key={id}>
//                                             <p>{id}</p>
//                                         </Link>
//                                     ))}
//                                 </div>
//                                 <p>Reserved Books:</p>
//                                 <div className='active_books'>
//                                     {user.reserved_books.map(id => (
//                                         <Link to={"book/" + id} key={id}>
//                                             <p>{id}</p>
//                                         </Link>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                     <button className="delete" onClick={() => {EditUser(userData[0].id);}}>Save</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ViewUser;
