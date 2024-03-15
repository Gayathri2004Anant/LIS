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

    const handleIssueOrReserve = () => {
        // Handle issuing or reserving logic
        console.log('Issuing or reserving the book for user:', userData);
        console.log('Book info:', bookData);
        // Implement your logic here
    };

    return (
        <div>
            <h2>Issue or Reserve Page</h2>
            <label>Enter User Code:</label>
            <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
            <button onClick={retrieveUser}>Retrieve User</button>
            {userData.map((user, index) => (
                <div key={index}>
                    <h3>User Info</h3>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Username: {user.username}</p>
                    <p>Password: {user.password}</p>
                    <p>Notification: {user.notification}</p>
                    <p>Active Number of Books: {user.active_no}</p>
                    <p>Reserved Number of Books: {user.reserve_no}</p>
                    <p>Maximum Books Allowed: {user.max_books}</p>
                </div>
                ))}
            <br />
            <label>Enter Book ID:</label>
            <input type="text" value={bookId} onChange={(e) => setBookId(e.target.value)} />
            <button onClick={retrieveBookInfo}>Retrieve Book Info</button>
            
            {bookData&
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
            } 
               
        
            <br />
            <button onClick={handleIssueOrReserve}>Issue or Reserve</button>
        </div>
    );
}

export default IssueOrReservePage;
