import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/userstatus.css";
const UserStatus = () => {
    const [issuedBooks, setIssuedBooks] = useState([]);
    const [reservedBooks, setReservedBooks] = useState([]);

    useEffect(() => {
        // Replace with your actual API endpoints
        axios.get('/api/issuedBooks')
            .then(response => {
                setIssuedBooks(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

        axios.get('/api/reservedBooks')
            .then(response => {
                setReservedBooks(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    return (
        <div className='statuspage'>
            <h1 className='issuedtitle'>Issued Books</h1>
            {issuedBooks.map(book => (
                <div className='issued' key={book.id}>
                    <h2>{book.title}</h2>
                    <p>Issue Date: {book.issueDate}</p>
                    <p>Due Date: {book.dueDate}</p>
                </div>
            ))}

            <h1 className='reservedtitle'>Reserved Books</h1>
            {reservedBooks.map(book => (
                <div className='reserved' key={book.id}>
                    <h2>{book.title}</h2>
                    <p>Availability: {book.isAvailable ? 'Available' : 'Not Available'}</p>
                </div>
            ))}
        </div>
    );
};

export default UserStatus;