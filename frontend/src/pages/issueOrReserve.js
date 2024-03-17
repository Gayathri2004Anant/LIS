import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const IssueOrReservePage = () => {
    const [userData, setUserData] = useState([]);
    const [bookData, setBookData] = useState([]);
    const [code, setCode] = useState("");
    const [bookId, setBookId] = useState("");
    const [userId, setUserId] = useState(0);

    const retrieveUser = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/users/code/${code}`);
            if (response.ok) {
                const userData = await response.json();
                setUserData(userData);
                if(userData.length > 0) {
                    setUserId(userData[0].id); // Assuming user ID is the first element in userData array
                }
            } else {
                console.error('Failed to retrieve user data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const retrieveBookInfo = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/books/${bookId}`);
            if (response.ok) {
                const bookData = await response.json();
                setBookData(bookData);
                if(userData.length > 0) {
                    setUserId(userData[0].id); // Assuming user ID is the first element in userData array
                }
            } else {
                console.error('Failed to retrieve book data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const returnBook = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/adm/return/${bookId}/${userId}`);
            if (response.ok) {
                console.log('Book returned successfully');
            } else {
                console.error('Failed to return book');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const issueBook = async () => {
        
        try {
            
            const response = await fetch(`http://localhost:8000/api/adm/issue/${bookId}/${userId}`, {
                method: 'POST',
            });
            if (response.ok) {
                console.log('Book issued successfully');
            } else {
                console.error('Failed to issue book');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const reserveBook = async () => {
       
        try {
            const response = await fetch(`http://localhost:8000/api/adm/reserve/${bookId}/${userId}`, {
                method: 'POST',
            });
            if (response.ok) {
                console.log('Book reserved successfully');
            } else {
                console.error('Failed to reserve book');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    return (
        <div className='fullPage'>
            <div className="leftSection">
                
                    <label>Enter User Code:</label>
                    <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
                    <button className='retrieve' onClick={retrieveUser}>Retrieve User</button>
           
                    <label>Enter Book ID:</label>
                    <input type="text" value={bookId} onChange={(e) => setBookId(e.target.value)} />
                    <button className='retrieve' onClick={retrieveBookInfo}>Retrieve Book Info</button>

                    <button className='retrieve' onClick={()=>issueBook()}>Issue</button>

                    <button className='retrieve' onClick={()=>reserveBook()}>Reserve</button>

                    <button className='retrieve' onClick={()=>returnBook()}>Return</button>
      
            </div>
            <div className="rightSection">
                <div className="l">
                {userData.map((user, index) => (
                    <div key={index}>
                        <h3>User Info</h3>
                        <p>Name: {user.name}</p>
                        <p>Code: {user.code}</p>
                        <p>Email: {user.email}</p>
                        <p>Type: {(user.type === 1 && "UG") || (user.type === 2 && "PG" || (user.type === 3) && "RS" || (user.type === 4) && "Faculty")}</p>
                        <p>Max Books: {user.max_books}</p>
                        <p>Active No: {user.active_no}</p>
                        <p>Reserve No: {user.reserve_no}</p>
                        <p>Valid Till: {user.valid_till}</p>
                        <p>Active Books:</p>
                        <div className="active_books">
                            {user.active_books.map(id => (
                                <Link to={"book/" + id} key={id}>
                                    <p>{id}</p>
                                </Link>
                            ))}
                        </div>
                        <p>Reserved Books:</p>
                        <div className='active_books'>
                            {user.reserved_books.map(id => (
                                <Link to={"book/" + id} key={id}>
                                    <p>{id}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
                </div>
                <div className="r">
                {bookData && Object.keys(bookData).length > 0 && (
                    <div>
                        <h3>Book Info</h3>
                        <p>Title: {bookData.title}</p>
                        <p>Author: {bookData.author}</p>
                        <p>Available: {bookData.available ? 'Yes' : 'No'}</p>
                        <p>Reserved: {bookData.reserved ? 'Yes' : 'No'}</p>
                        <p>Code of issued user: {bookData.issued_code}</p>
                        <p>Code of reserved user: {bookData.reserved_code}</p>
                    </div>
                )}
                </div>
            </div>
        </div>
    );
}

export default IssueOrReservePage;



