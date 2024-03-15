import {Link} from 'react-router-dom';

const UserHome = () => {
    return ( 
        <div className="userHome">
            <h1>Library Administration</h1>
            <div className="options">
                <h2>Search User</h2>
                <h2>Add User</h2>
                <h2>Issue Book</h2>
                <h2>Return Book</h2>
                <h2>Reserve Book</h2>
            </div>
        </div>
     );
}
 
export default UserHome;