import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const StatusUserDetails = ({ user }) => {
    const [trans, setTrans] = useState({});

    useEffect(() => {
        const fetchTransaction = async (isbn, code, cat) => {
            try {
                const url = `http://localhost:8000/api/adm/custom_trans/${isbn}/${code}/${cat}`;
                const response = await fetch(url);
                const data = await response.json();
                setTrans(prevTrans => ({ ...prevTrans, [isbn]: data }));
            } catch (error) {
                console.error("Error fetching transaction:", error);
            }
        };

        // Fetch transaction for each active book
        user.active_books.forEach(isbn => {
            fetchTransaction(isbn, user.code, 1);
        });

        // Fetch transaction for each reserved book
        user.reserved_books.forEach(isbn => {
            fetchTransaction(isbn, user.code, 3); // Assuming category 3 is for reserved books
        });
    }, [user.active_books, user.reserved_books, user.code]); // Fetch transaction when active_books, reserved_books, or code changes

    return (
        <div className="userfullpage">
            <div className="notifications">
                <button className='notification'><p className='textnote'>Notifications</p></button>
                <h2 className='texts'> {user.notification}</h2>
            </div>
            <div className="userstatusdetailspage">
                <div className="userstatusleftpage">
                    <div className="userstatus">
                        <div className="userstatusWrapper">
                            <div className="userstatusContent">
                                <h2>{user.name}</h2>
                                <p>User Type: {(user.type === 1 && "UG") || (user.type === 2 && "PG") || (user.type === 3 && "RS") || (user.type === 4 && "Faculty")}</p>
                                <p>Maximum books that can be issued/reserved: {user.max_books}</p>
                            </div>
                            <p>Number of Active Books: {user.active_no}</p>
                            <div className="books-liststatus">
                                <p>Active Books: </p>
                                {user.active_books.map(isbn => (
                                    <button className='searchbutton' key={isbn}>
                                        <Link to={"/book/" + isbn} className='underline'>
                                            <div className="bookItemstatus">
                                                <p>ISBN: {isbn}</p>
                                                <p>Due Date: {trans[isbn]?.due_date}</p>
                                            </div>
                                        </Link>
                                    </button>
                                ))}
                                <p>Number of Reserved Books: {user.reserve_no}</p>
                                <p>Reserved Books: </p>
                                
                                {user.reserved_books.map(isbn => (
                                    <button className='searchbutton' key={isbn}>
                                        <Link to={"/book/" + isbn} className='underline'>
                                            <div className="bookItemstatus">
                                                <p>ISBN: {isbn}</p>
                                                <p>Max date of reserve: {trans[isbn]?.max_date_of_reserve}</p>
                                            </div>
                                        </Link>
                                    </button>
                                ))}
                            </div>
                            <p>Dues remaining: {user.fine}</p>
                        </div>
                        <button className='searchbutton'><Link to ={'/userlogin/'+user.code} className='underline'>Back</Link></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StatusUserDetails;

