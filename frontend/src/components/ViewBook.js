// import React, { useState } from 'react';

// const ViewBook = () => {
//     const [searchKey, setSearchKey] = useState('');
//     const [bookData, setBookData] = useState(null);

//     const handleSearch = async () => {
//         try {
//             const response = await fetch(`http://localhost:8000/api/books/${searchKey}`);
//             if (!response.ok) {
//                 throw new Error('Failed to fetch book data');
//             }
//             const data = await response.json();
//             setBookData(data);
//         } catch (error) {
//             console.error('Error fetching book data:', error);
//         }
//     };

//     // let deleteBook = async (id) => {
//     //     try {
//     //         const response = await fetch("http://localhost:8000/api/adm/books/delete/"+id, {
//     //             method: 'DELETE',
//     //         });
//     //         if (!response.ok) {
//     //             throw new Error('Failed to delete book');
//     //         }
//     //         console.log('Book deleted successfully');
//     //     } catch (error) {
//     //         console.error('Error deleting book:', error);
//     //     }
//     // };

//     let deleteBook = async(id) =>{
//         fetch("http://localhost:8000/api/adm/books/delete/"+id, {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         })
//     }

//     return (
//         <div>
//             <input
//                 type="text"
//                 placeholder="Enter book ID"
//                 value={searchKey}
//                 onChange={(e) => setSearchKey(e.target.value)}
//             />
//             <button onClick={handleSearch}>Search</button>
//             {bookData && (
//                 <div className="wrapper">
//                 <div>
//                     <h2>Book Data</h2>
//                     <pre>{JSON.stringify(bookData, null, 2)}</pre>
//                 </div>
//                 <button className="delete" onClick={deleteBook(bookData.id)}>Delete</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ViewBook;

import React, { useState } from 'react';

const ViewBook = () => {
    const [searchKey, setSearchKey] = useState('');
    const [bookData, setBookData] = useState(null);

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/books/${searchKey}`);
            if (!response.ok) {
                throw new Error('Failed to fetch book data');
            }
            const data = await response.json();
            setBookData(data);
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
        <div>
            <input
                type="text"
                placeholder="Enter book ID"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            {bookData && (
                <div className="wrapper">
                    <div>
                        <h2>Book Data</h2>
                        <pre>{JSON.stringify(bookData, null, 2)}</pre>
                    </div>
                    <button className="delete" onClick={() => deleteBook(bookData.id)}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default ViewBook;

