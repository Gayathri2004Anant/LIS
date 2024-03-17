// import React, { useState } from 'react';
// import { Link, useHistory } from 'react-router-dom';

// const IssueOrReservePage = () => {
//     const [userData, setUserData] = useState([]);
//     const [bookData, setBookData] = useState([]);
//     const [code, setCode] = useState("");
//     const [bookId, setBookId] = useState("");
//     const [userId, setUserId] = useState(0);
//     const history = useHistory();

//     const retrieveUser = async () => {
//         try {
//             const response = await fetch(`http://localhost:8000/api/users/code/${code}`);
//             if (response.ok) {
//                 const userData = await response.json();
//                 setUserData(userData);
//                 if (userData.length > 0) {
//                     setUserId(userData[0].id); // Assuming user ID is the first element in userData array
//                 }
//             } else {
//                 console.error('Failed to retrieve user data');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     const retrieveBookInfo = async () => {
//         try {
//             const response = await fetch(`http://localhost:8000/api/books/${bookId}`);
//             if (response.ok) {
//                 const bookData = await response.json();
//                 setBookData(bookData);
//                 if (userData.length > 0) {
//                     setUserId(userData[0].id); // Assuming user ID is the first element in userData array
//                 }
//             } else {
//                 console.error('Failed to retrieve book data');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     const returnBook = async () => {
//         try {
//             const response = await fetch(`http://localhost:8000/api/adm/return/${bookId}/${userId}`);
//             if (response.ok) {
//                 console.log('Book returned successfully');
//             } else {
//                 console.error('Failed to return book');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     const issueBook = async () => {
//         try {
//             const response = await fetch(`http://localhost:8000/api/adm/issue/${bookId}/${userId}`, {
//                 method: 'POST',
//             });
//             if (response.ok) {
//                 console.log('Book issued successfully');
//             } else {
//                 console.error('Failed to issue book');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     const reserveBook = async () => {
//         try {
//             const response = await fetch(`http://localhost:8000/api/adm/reserve/${bookId}/${userId}`, {
//                 method: 'POST',
//             });
//             if (response.ok) {
//                 console.log('Book reserved successfully');
//             } else {
//                 console.error('Failed to reserve book');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     const handleClickTransaction = () => {
//         const lastTransactionId = userData[0].transactions.slice(-1)[0];
//         history.replace(`/transactions/${lastTransactionId}`);
//     };

//     return (
//         <div className='fullPage'>
//             <div className="leftSection">
//                 <label>Enter User Code:</label>
//                 <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
//                 <button className='retrieve' onClick={retrieveUser}>Retrieve User</button>

//                 <label>Enter Book ID:</label>
//                 <input type="text" value={bookId} onChange={(e) => setBookId(e.target.value)} />
//                 <button className='retrieve' onClick={retrieveBookInfo}>Retrieve Book Info</button>

//                 <button className='retrieve' onClick={issueBook}>Issue</button>
//                 <button className='retrieve' onClick={reserveBook}>Reserve</button>
//                 <button className='retrieve' onClick={returnBook}>Return</button>

//                 {userData.length > 0 && (
//                     <button onClick={handleClickTransaction}>Transaction Details</button>
//                 )}
//             </div>
//             <div className="rightSection">
//                 <div className="l">
//                     {userData.map((user, index) => (
//                         <div key={index}>
//                             <h3>User Info</h3>
//                             <p>Name: {user.name}</p>
//                             <p>Code: {user.code}</p>
//                             <p>Email: {user.email}</p>
//                             <p>Type: {(user.type === 1 && "UG") || (user.type === 2 && "PG" || (user.type === 3) && "RS" || (user.type === 4) && "Faculty")}</p>
//                             <p>Max Books: {user.max_books}</p>
//                             <p>Active No: {user.active_no}</p>
//                             <p>Reserve No: {user.reserve_no}</p>
//                             <p>Valid Till: {user.valid_till}</p>
//                             <p>Active Books:</p>
//                             <div className="active_books">
//                                 {user.active_books.map(id => (
//                                     <Link to={"book/" + id} key={id}>
//                                         <p>{id}</p>
//                                     </Link>
//                                 ))}
//                             </div>
//                             <p>Reserved Books:</p>
//                             <div className='active_books'>
//                                 {user.reserved_books.map(id => (
//                                     <Link to={"book/" + id} key={id}>
//                                         <p>{id}</p>
//                                     </Link>
//                                 ))}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//                 <div className="r">
//                     {bookData && Object.keys(bookData).length > 0 && (
//                         <div>
//                             <h3>Book Info</h3>
//                             <p>Title: {bookData.title}</p>
//                             <p>Author: {bookData.author}</p>
//                             <p>Available: {bookData.available ? 'Yes' : 'No'}</p>
//                             <p>Reserved: {bookData.reserved ? 'Yes' : 'No'}</p>
//                             <p>Code of issued user: {bookData.issued_code}</p>
//                             <p>Code of reserved user: {bookData.reserved_code}</p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default IssueOrReservePage;

import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const IssueOrReservePage = () => {
    const [userData, setUserData] = useState([]);
    const [bookData, setBookData] = useState([]);
    const [code, setCode] = useState("");
    const [bookId, setBookId] = useState("");
    const [userId, setUserId] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const history = useHistory();

    const retrieveUser = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/users/code/${code}`);
            if (response.ok) {
                const userData = await response.json();
                setUserData(userData);
                if (userData.length > 0) {
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
            } else {
                console.error('Failed to retrieve book data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const returnBook = async () => {
    
        if (userData.length > 0 && userData[0].active_books.includes(bookId)) {
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
        } else {
            window.alert("Cannot return the book. The book is not issued to this user.");
        }
    };
    

    const issueBook = async () => {
        console.log(bookData.available, bookData.reserved, bookData.reserved_code, userData[0].code, (bookData.reserved_code === userData[0].code));
        if ((((userData[0].max_books>userData[0].active_no+userData[0].reserve_no)&&(bookData.available === true) && (bookData.reserved === false))||(userData && ((bookData.available === false) && (bookData.reserved_code === userData[0].code))))) {
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
        } else {
            window.alert("Cannot issue the book. Please check availability and reservation status.");
        }
    };

    const reserveBook = async () => {
        if (bookData.available === 0 && bookData.reserved === 0) {
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
        } else {
            window.alert("Cannot reserve the book. Please check availability and reservation status.");
        }
    };

    const handleClickTransaction = () => {
        const lastTransactionId = userData[0].transactions.slice(-1)[0];
        history.replace(`/transactions/${lastTransactionId}`);
    };

    return (
        <div className='fullPage'>
            <div className="leftSection">
                <label>Enter User Code:</label>
                <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
                <button className='retrieve' onClick={retrieveUser}>Retrieve User</button>

                <label>Enter Book ID:</label>
                <input type="text" value={bookId} onChange={(e) => setBookId(e.target.value)} />
                <button className='retrieve' onClick={retrieveBookInfo}>Retrieve Book Info</button>

                <button className='retrieve' onClick={issueBook}>Issue</button>
                <button className='retrieve' onClick={reserveBook}>Reserve</button>
                <button className='retrieve' onClick={returnBook}>Return</button>

                {errorMessage && (
                    <p className="error">{errorMessage}</p>
                )}

                {userData.length > 0 && (
                    <button onClick={handleClickTransaction}>Transaction Details</button>
                )}
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


