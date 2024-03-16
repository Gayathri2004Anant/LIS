import {Link} from 'react-router-dom';
const StatusUserDetails = ({user}) => {

    return ( 
        <div className="userdetailspage">
            <div className="userleftpage">
            <div>
        <div className="user">
            <div className="userWrapper">
                <div className="userContent">
            <h2>{user.name}</h2>
            </div>
                <h3> {user.notification}</h3>
                <h3>Number of Active Books: {user.active_no}</h3>
                <h3>Active Books: {user.active_books}</h3>
                <h3>Number of Reserved Books: {user.reserve_no}</h3>
                <h3>Reserved Books: {user.reserve_books}</h3>
            </div>
            <div><Link to ='/search'>Back to Search</Link></div>
            </div>
            </div>
        </div>
        </div>
     );
}
 
export default StatusUserDetails;