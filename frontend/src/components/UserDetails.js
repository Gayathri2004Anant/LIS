import {Link} from 'react-router-dom';

const UserDetails = ({user}) => {

    return ( 
        <div className="userdetailspage">
            <div className="userleftpage">
            <div>
        <div className="user">
            <div className="userWrapper">
                <div className="userContent">
            <h2>{user.name}</h2>
            </div>
                <h3>Name: {user.name}</h3>
                <h3>Code Number: {user.code}</h3>
                <h3>Email: {user.email}</h3>
            </div>
            <div><Link to ='/search'>Back to Search</Link></div>
            <button className='searchbutton'><Link className='searchlink' to='/search'>
                    Search for User
                </Link></button>
                <button className='statusbutton'><Link className='statuslink' to='/userstatus'>
                    Status of User
                </Link></button>
            </div>
            </div>
        </div>
        </div>
     );
}
 
export default UserDetails;