import {Link} from 'react-router-dom';
import "../styles/UserDetails.css";
const UserDetails = ({user}) => {
    const url=`/userloginstatus/${user.code}`;
    console.log(user, "user");
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
                <button className='statusbutton' > <Link to ={url} className='underline'>
                User Status </Link></button>
                <div><button className='searchbutton'><Link to ='/login' className='underline'>Return</Link></button></div>
                <div><button className='searchbutton'><Link to ='/' className='underline'>Back to Home</Link></button></div>
            </div>
            </div>
        </div>
        </div>
     );
}
 
export default UserDetails;