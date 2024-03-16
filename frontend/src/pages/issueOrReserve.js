import React, { useState } from 'react';

const IssueOrReservePage = () => {
    const [userData, setUserData] = useState([]);
    const [bookData, setBookData] = useState([]);
    const [code, setCode] = useState("");
    const [bookId, setBookId] = useState("");

    const retrieveUser = async () => {
        // Fetch user data using the code
        try {
            const response = await fetch(`http://localhost:8000/api/users/code/${code}`);
            if (response.ok) {
                const userData = await response.json();
                setUserData(userData);
            } else {
                // Handle error if needed
                console.error('Failed to retrieve user data');
            }
        } catch (error) {
            // Handle error if needed
            console.error('Error:', error);
        }
    };

    const retrieveBookInfo = async () => {
        // Fetch book data using the bookId
        try {
            const response = await fetch(`http://localhost:8000/api/books/${bookId}`);
            if (response.ok) {
                const bookData = await response.json();
                setBookData(bookData);
            } else {
                // Handle error if needed
                console.error('Failed to retrieve book data');
            }
        } catch (error) {
            // Handle error if needed
            console.error('Error:', error);
        }
    };

    const handleIssue = () => {
        // Handle issuing or reserving logic
        console.log('Issuing:', userData);
        console.log('Book info:', bookData);
        // Implement your logic here
    };

    const handleReserve = () => {
        // Handle issuing or reserving logic
        console.log('Reserving:', userData);
        console.log('Book info:', bookData);
        // Implement your logic here
    }

    return (
        <div>
        <div className='fullPage'>
            {/* <h2>Issue or Reserve Page</h2> */}
            <div className="userHalf">
            <label>Enter User Code:</label>
            <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
            <button onClick={retrieveUser}>Retrieve User</button>
            
            {userData.map((user, index) => (
                <div key={index}>
                    
                    <h3>User Info</h3>
                    <p>Name: {user.name}</p>
                    <p>Code: {user.code}</p>
                    <p>Email: {user.email}</p>
                    <p>Username: {user.username}</p>
                    <p>Password: {user.password}</p>
                    <p>Notification: {user.notification}</p>
                    <p>Type: {(user.type === 1 && "UG") || (user.type === 2 && "PG" || (user.type === 3) && "RS" || (user.type === 4) && "Faculty")}</p>
                    <p>Max Books: {user.max_books}</p>
                    <p>Active No: {user.active_no}</p>
                    <p>Reserve No: {user.reserve_no}</p>
                    <p>Fine: {user.fine}</p>
                    <p>Valid Till: {user.valid_till}</p>
                    <p>Active Books: {user.active_books}</p>
                    <p>Reserved Books: {user.reserved_books}</p>
                    </div>
                    
                
                ))}
                </div>
            <div className="bookHalf">
            <label>Enter Book ID:</label>
            <input type="text" value={bookId} onChange={(e) => setBookId(e.target.value)} />
            <button onClick={retrieveBookInfo}>Retrieve Book Info</button>
            <div>
            <h3>Book Info</h3>
                    <p>Title: {bookData.title}</p>
                    <p>Author: {bookData.author}</p>
                    <p>Publisher: {bookData.publisher}</p>
                    <p>Edition: {bookData.edition}</p>
                    <p>Year: {bookData.year}</p>
                    <p>Last Issue Date: {bookData.last_issue_date}</p>
                    <p>Available: {bookData.available ? 'Yes' : 'No'}</p>
                    <p>Reserved: {bookData.reserved ? 'Yes' : 'No'}</p>
            </div>
            {/* <button onClick={handleIssue}>Issue</button>
            <button onClick={handleReserve}>Reserve</button> */}
        </div>
        </div>
        </div>
    );
}

export default IssueOrReservePage;
