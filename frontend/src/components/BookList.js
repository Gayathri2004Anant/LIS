import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
const Books = ({books}) => {
    // let [books, setBooks] = useState([]);
    // useEffect(()=>{
    //     getbooks()
    // },[])

    // let getbooks = async() =>{
    //     let response = await fetch('http://localhost:8000/api/books/');
    //     let data = await response.json();
    //     setBooks(data);
    // }

    return (
        <div className="book">
            <div className="books-list">
                {books.map(book => (
                    <Link to = {"book/"+book.id}><div className="bookItem">
                        <h2>{book.title}</h2>
                        <p>{book.author}</p>
                    </div></Link>
                ))}
            </div>
        </div>
      );
}
 
export default Books;

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// const Books = () => {
//     let [books, setBooks] = useState([]);
//     useEffect(() => {
//         getBooks();
//     }, []);

//     let getBooks = async () => {
//         let response = await fetch('http://localhost:8000/api/books/');
//         let data = await response.json();
//         setBooks(data);
//     }

//     useEffect(() => {
//         console.log("Number of available books:", books.filter(book => book.available === true).length);
//     }, [books]);

//     return (
//         <div className="book">
//             <div className="books-list">
//                 {books.map(book => (
//                     <Link key={book.id} to={"book/" + book.id}>
//                         <div className="bookItem">
//                             <h2>{book.title}</h2>
//                             <p>{book.author}</p>
//                         </div>
//                     </Link>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default Books;
