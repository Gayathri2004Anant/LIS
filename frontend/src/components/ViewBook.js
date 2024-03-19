import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const ViewBook = () => {

    // Define category mappings
const CATEGORY_MAPPING = {
    1: 'Adventure',
    2: 'Fantasy',
    3: 'Crime',
    4: 'Classics',
    5: 'History',
    6: 'Romance',
    7: 'Biography',
    8: 'Mathematics',
    9: 'Computer Science',
    10: 'Science',
    11: 'Mechanics'
};
const getCategoryText = (category) => {
    return CATEGORY_MAPPING[category] || 'Unknown';
};

    const [searchKey, setSearchKey] = useState('');
    const [bookData, setBookData] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/books/ISBN/${searchKey}`);
            if (!response.ok) {
                throw new Error('Failed to fetch book data');
            }
            const bookData = await response.json();
            setBookData(bookData);
        } catch (error) {
            console.error('Error fetching book data:', error);
        }
        console.log(bookData)
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
                    <p>ISBN: {bookData.ISBN}</p>
                    <p>Title: {bookData.title}</p>
                    <p>Author: {bookData.author}</p>
                    <p>Publisher: {bookData.publisher}</p>
                    <p>Edition: {bookData.edition}</p>
                    <p>Year: {bookData.year}</p>
                    <p>Category: {getCategoryText(bookData.category)}</p>
                    <p>Cupboard No.: </p>
                    <p>Rack No.: </p>
                    <p>Position No.: </p>
                    <p>Available: {bookData.available ? 'Yes' : 'No'}</p>
                    <p>Reserved: {bookData.reserved ? 'Yes' : 'No'}</p>
                    <p>Code of issued user: {bookData.issued_code}</p>
                    <p>Code of reserved user: {bookData.reserved_code}</p>
                    <button onClick={() => deleteBook(bookData.id)}>Delete</button>
                    <button onClick={() => window.location.href = '/'}>Home</button>
                    <button onClick={() => window.location.href = '/'}>Home</button>
                </div>
                
            } 
        </div>
    );
};

export default ViewBook;

