import {Link} from 'react-router-dom';

const AdminPage = () => {
    return ( 
        <div className="adminHome">
            <h1>Library Administration</h1>
            <div className="options">
                <Link to="/book-home"><h2>Manage Books</h2></Link>
                <Link to="/user-home"><h2>Manage Users</h2></Link>
            </div>
        </div>
     );
}
 
export default AdminPage;