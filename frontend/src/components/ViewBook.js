// import React, { useState } from 'react';
// // import {Link} from 'react-router-dom';
// import EditBook from '../components/EditBook';

// const ViewBook = () => {

//     // Define category mappings
// const CATEGORY_MAPPING = {
//     1: 'Adventure',
//     2: 'Fantasy',
//     3: 'Crime',
//     4: 'Classics',
//     5: 'History',
//     6: 'Romance',
//     7: 'Biography',
//     8: 'Mathematics',
//     9: 'Computer Science',
//     10: 'Science',
//     11: 'Mechanics'
// };
// const getCategoryText = (category) => {
//     return CATEGORY_MAPPING[category] || 'Unknown';
// };

//     const [searchKey, setSearchKey] = useState('');
//     const [bookData, setBookData] = useState([]);
    

//     const handleSearch = async () => {
//         try {
//             const response = await fetch(`http://localhost:8000/api/books/ISBN/${searchKey}`);
//             if (!response.ok) {
//                 throw new Error('Failed to fetch book data');
//             }
//             const bookData = await response.json();
//             setBookData(bookData);
//         } catch (error) {
//             console.error('Error fetching book data:', error);
//         }
//         console.log(bookData)
//     };

//     const editBook= async () =>{
//         return (
//             <div>
//                  <EditBook bookData={bookData}/>
//             </div>
//         );  
//     };

//     const deleteBook = async (id) => {
//         window.alert('Are you sure you want to delete this book?');
//         try {
//             const response = await fetch(`http://localhost:8000/api/adm/books/delete/${id}`, {
//                 method: 'DELETE',
//             });
//             if (!response.ok) {
//                 throw new Error('Failed to delete book');
//             }
//             else if(response==='Book is not available to delete')
//             {
//                 console.log('Book was not deleted');
//                 // window.alert(response);
//             }
//             else {
//                 console.log('Book deleted successfully');
//                 // window.alert(response);
//                 setBookData(null);
//             }
//         } catch (error) {
//             console.error('Error deleting book:', error);
//         }
//     };

//     return (
//         <div className='viewBook'>
//             <h2>Search/ Delete</h2>
//             <div className="searchWrapperLight">
//             <input
//                 type="text"
//                 placeholder="Enter book ISBN"
//                 value={searchKey}
//                 onChange={(e) => setSearchKey(e.target.value)}
                
//             />
//             <button onClick={handleSearch}>Search</button>
//             </div>
            
//             {bookData&&
//                 <div className="viewBookContent">
//                     <h3>Book Info</h3>
//                     <p>ISBN: {bookData.ISBN}</p>
//                     <p>Title: {bookData.title}</p>
//                     <p>Author: {bookData.author}</p>
//                     <p>Publisher: {bookData.publisher}</p>
//                     <p>Edition: {bookData.edition}</p>
//                     <p>Year: {bookData.year}</p>
//                     <p>Category: {getCategoryText(bookData.category)}</p>
//                     <p>Cupboard No.: {bookData.cupboard}</p>
//                     <p>Rack No.: {bookData.rack}</p>
//                     <p>Position No.: {bookData.position}</p>
//                     <p>Available: {bookData.available ? 'Yes' : 'No'}</p>
//                     <p>Reserved: {bookData.reserved ? 'Yes' : 'No'}</p>
//                     <p>Code of issued user: {bookData.issued_code}</p>
//                     <p>Code of reserved user: {bookData.reserved_code}</p>
//                     <button onClick={() => deleteBook(bookData.id)}>Delete</button>
//                     <button onClick={() => editBook(bookData.id)}>Edit</button>
//                 </div>
                
//             } 
            
//         </div>
//     );
// };

// export default ViewBook;

import React, { useState } from 'react';
import EditBook from '../components/EditBook';

const ViewBook = () => {

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

    const [searchKey, setSearchKey] = useState('');
    const [bookData, setBookData] = useState(null);
    const [editing, setEditing] = useState(false);

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/books/ISBN/${searchKey}`);
            if (!response.ok) {
                throw new Error('Failed to fetch book data');
            }
            const bookData = await response.json();
            setBookData(bookData);
            setEditing(false); // Reset editing state when fetching new book data
        } catch (error) {
            console.error('Error fetching book data:', error);
        }
    };

    const deleteBook = async (id) => {
        window.alert('Are you sure you want to delete this book?');
        try {
            const response = await fetch(`http://localhost:8000/api/adm/books/delete/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete book');
            } else {
                console.log('Book deleted successfully');
                setBookData(null);
            }
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    const handleEdit = () => {
        setEditing(true);
    };

    return (
        <div className='viewBook'>
            <h2>Search/ Delete</h2>
            <div className="searchWrapperLight">
                <input
                    type="text"
                    placeholder="Enter book ISBN"
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            
            {!editing && bookData &&
                <div className="viewBookContent">
                    <h3>Book Info</h3>
                    <p>ISBN: {bookData.ISBN}</p>
                    <p>Title: {bookData.title}</p>
                    <p>Author: {bookData.author}</p>
                    <p>Publisher: {bookData.publisher}</p>
                    <p>Edition: {bookData.edition}</p>
                    <p>Year: {bookData.year}</p>
                    <p>Category: {CATEGORY_MAPPING[bookData.category] || 'Unknown'}</p>
                    <p>Cupboard No.: {bookData.cupboard}</p>
                    <p>Rack No.: {bookData.rack}</p>
                    <p>Position No.: {bookData.position}</p>
                    <p>Available: {bookData.available ? 'Yes' : 'No'}</p>
                    <p>Reserved: {bookData.reserved ? 'Yes' : 'No'}</p>
                    <p>Code of issued user: {bookData.issued_code}</p>
                    <p>Code of reserved user: {bookData.reserved_code}</p>
                    <button onClick={() => deleteBook(bookData.id)}>Delete</button>
                    <button onClick={handleEdit}>Edit</button>
                </div>
            } 

            {editing && bookData &&
                <div className="viewBookContent">
                <h3>Book Info</h3>
                <p>ISBN: {bookData.ISBN}</p>
                <p>Title:</p>
                <input type="text" placeholder="Title" value={bookData.title} onChange={(e) => setBookData({ ...bookData, title: e.target.value })} />
                <p>Author:</p>
                <input type="text" placeholder="Title" value={bookData.author} onChange={(e) => setBookData({ ...bookData, author: e.target.value })} />
                <p>Publisher:</p>
                <input type="text" placeholder="Title" value={bookData.publisher} onChange={(e) => setBookData({ ...bookData, publisher: e.target.value })} />
                <p>Edition:</p>
                <input type="text" placeholder="Title" value={bookData.edition} onChange={(e) => setBookData({ ...bookData, edition: e.target.value })} />
                <p>Year:</p>
                <input type="text" placeholder="Title" value={bookData.year} onChange={(e) => setBookData({ ...bookData, year: e.target.value })} />
                <p>Category:</p>
                <div className="custom-select">
            <select
                placeholder="Title"
                value={bookData.category}
                onChange={(e) => setBookData({ ...bookData, category: e.target.value })}
            >
                <option value={1}>Adventure</option>
                <option value={2}>Fantasy</option>
                <option value={3}>Crime</option>
                <option value={4}>Classics</option>
                <option value={5}>History</option>
                <option value={6}>Romance</option>
                <option value={7}>Biography</option>
                <option value={8}>Mathematics</option>
                <option value={9}>Computer Science</option>
                <option value={10}>Science</option>
                <option value={11}>Mechanics</option>
            </select>
        </div>
                <p>Cupboard No.: {bookData.cupboard}</p>
                <p>Rack No.: {bookData.rack}</p>
                <p>Position No.: {bookData.position}</p>
                <p>Available: {bookData.available ? 'Yes' : 'No'}</p>
                <p>Reserved: {bookData.reserved ? 'Yes' : 'No'}</p>
                <p>Code of issued user: {bookData.issued_code}</p>
                <p>Code of reserved user: {bookData.reserved_code}</p>
                <button onClick={() => deleteBook(bookData.id)}>Delete</button>
                <button onClick={handleEdit}>Edit</button>
            </div>
            }
        </div>
    );
};

export default ViewBook;


