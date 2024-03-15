import React, { useState } from 'react';

const ViewBook = () => {
    const [searchKey, setSearchKey] = useState('');
    const [bookData, setBookData] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/books/${searchKey}`);
            if (!response.ok) {
                throw new Error('Failed to fetch book data');
            }
            const bookData = await response.json();
            setBookData(bookData);
        } catch (error) {
            console.error('Error fetching book data:', error);
        }
    };

    const deleteBook = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/adm/books/delete/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete book');
            }
            console.log('Book deleted successfully');
            setBookData(null); // Clear bookData after deletion
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    return (
        <div className='viewBook'>
            <h2>Search/ Delete</h2>
            <div className="searchWrapperLight">
            <input
                type="text"
                placeholder="Enter book ID"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                
            />
            <button onClick={handleSearch}>Search</button>
            </div>
            
            {bookData&&
                <div className="viewBookContent">
                    <h3>Book Info</h3>
                    <p>Title: {bookData.title}</p>
                    <p>Author: {bookData.author}</p>
                    <p>Publisher: {bookData.publisher}</p>
                    <p>Edition: {bookData.edition}</p>
                    <p>Year: {bookData.year}</p>
                    <p>Last Issue Date: {bookData.last_issue_date}</p>
                    <p>Available: {bookData.available ? 'Yes' : 'No'}</p>
                    <p>Reserved: {bookData.reserved ? 'Yes' : 'No'}</p>
                    <button onClick={() => deleteBook(bookData.id)}>Delete</button>
                </div>
                
            } 
            
        </div>
    );
};

export default ViewBook;

