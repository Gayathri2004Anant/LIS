import {Link} from 'react-router-dom';
import "../styles/UserDetails.css";
const StatusUserDetails = ({user}) => {
    console.log(user.active_books, "user");
    const url=`/userlogin/${user.code}`;
    return ( 
        <div className="userfullpage">
            <div className="notifications">
                <button className='notification'><p className='textnote'>Notifications</p></button>
                <p className='texts'> {user.notification}</p>
            </div>
            <div className="userstatusdetailspage">
                <div className="userstatusleftpage"> <div>
                <div className="userstatus">
                    <div className="userstatusWrapper">
                        <div className="userstatusContent">
                            <h2>{user.name}</h2>
                            <p>User Type: {(user.type===1 && "UG")||(user.type===2 && "PG")||(user.type===3 && "RS")||(user.type===4 && "Faculty")}</p>
                            <p>Maximum books that can be issued/reserved: {user.max_books}</p>
                        </div>
                        <p>Number of Active Books: {user.active_no}</p>
                        <div className="books-liststatus">
                            <p>Active Books: </p>
                            {user.active_books.map(id => (
                                <button className='searchbutton'>
                                <Link to = {"/book/"+id} key={id} className='underline'>
                                    <div className="bookItemstatus">
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
                    <div><button className='searchbutton'><Link to ={url} className='underline'>Return</Link></button></div>
                    <div><button className='searchbutton'><Link to ='/' className='underline'>Back to Home</Link></button></div>
                </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default StatusUserDetails;