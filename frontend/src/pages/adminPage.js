import {Link} from 'react-router-dom';

const AdminPage = () => {
    return ( 
        <div className="adminHome">
            <div className="admHomeContainer">
            <h1>LIBRARY ADMINISTRATION</h1>
            <div className="options">
                <Link to="/book-home"><h2>Manage Books</h2></Link>
                <Link to="/user-home"><h2>Manage Users</h2></Link>
                <Link to="/issue-reserve"><h2>Book Transanctions</h2></Link>
            </div>
            </div>
        </div>
     );
}
 
export default AdminPage;