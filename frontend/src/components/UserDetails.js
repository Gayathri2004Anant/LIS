import {Link} from 'react-router-dom';
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
            <div><Link to ='/search'>Back to Search</Link></div>
                <button className='statusbutton' > <Link to ={url}>
                Status of User
                </Link></button>
            </div>
            </div>
        </div>
        </div>
     );
}
 
export default UserDetails;