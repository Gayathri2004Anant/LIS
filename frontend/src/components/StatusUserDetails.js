import {Link} from 'react-router-dom';
import "../styles/UserDetails.css";
const StatusUserDetails = ({user}) => {
    console.log(user.active_books, "user");
    return ( 
        <div className="userfullpage">
            <div className="notification">
                <button className='notifications'><p className='textnote'>Notifications</p></button>
                <p className='texts'> {user.notification}</p>
            </div>
        <div className="userstatusdetailspage">
            <div className="userstatusleftpage">
            <div>
        <div className="userstatus">
            <div className="userstatusWrapper">
                <div className="userstatusContent">
            <p>{user.name}</p>
            </div>
                <p>Number of Active Books: {user.active_no}</p>
                <div className="books-liststatus">
                    <p>Active Books: </p>
                    {user.active_books.map(id => (
                        <button className='searchbutton'>
                        <Link to = {"/book/"+id} key={id} className='underline'><div className="bookItemstatus">
                            <p>{id}</p>
                            </div>
                        </Link>
                        </button>
                    ))}
                </div>
                <p>Number of Reserved Books: {user.reserve_no}</p>
                <div className="books-liststatus">
                    <p>Reserved Books: </p>
                    {user.reserved_books.map(id => (
                        <button className='searchbutton'>
                        <Link to = {"/book/"+id} key={id} className='underline'><div className="bookItemstatus">
                            <p>{id}</p>
                            </div>
                        </Link>
                        </button>
                    ))}
                </div>
            </div>
            <div><button className='searchbutton'><Link to ='/search' className='underline'>Back to Search</Link></button></div>
            </div>
            </div>
        </div>
        </div>
        </div>
     );
}
 
export default StatusUserDetails;