import {Link} from 'react-router-dom';
const StatusUserDetails = ({user}) => {
    console.log(user.active_books, "user");
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
                {/* <h3>Active Books: {user.active_books}</h3> */}
                <div className="books-list">
                    <h1>Active Books: </h1>
                    {user.active_books.map(id => (
                        <Link to = {"/book/"+id} key={id}><div className="bookItem">
                            <h2>{id}</h2>
                            </div>
                        </Link>
                    ))}
                </div>
                <h3>Number of Reserved Books: {user.reserve_no}</h3>
                <div className="books-list">
                    <h1>Reserved Books: </h1>
                    {user.active_books.map(id => (
                        <Link to = {"/book/"+id} key={id}><div className="bookItem">
                            <h2>{id}</h2>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div><Link to ='/search'>Back to Search</Link></div>
            </div>
            </div>
        </div>
        </div>
     );
}
 
export default StatusUserDetails;