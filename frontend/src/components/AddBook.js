import React, { useState } from 'react';

const AddBook = () => {
    const initialBookState = {
        title: "",
        author: "",
        publisher: "",
        edition: 1,
        year: 1990,
        category: 1,
        last_issue_date: "2000-01-01",
        available: false,
        reserved: false
    };

    const [book, setBook] = useState(initialBookState);
    const [selectedCategory, setSelectedCategory] = useState(1);
    const [isbn, setIsbn] = useState(0);
    const [isbnGenerated, setIsbnGenerated] = useState(false); // Track whether ISBN has been generated
    const [bookAdded, setBookAdded] = useState(false); // Track whether book has been added

    const handleCategoryChange = (e) => {
        setSelectedCategory(parseInt(e.target.value));
        setBook({ ...book, category: parseInt(e.target.value) });
    };

    const addBook = async () => {
        console.log(book);
        fetch("http://localhost:8000/api/adm/books/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(book)
        })
        .then(response => {
            if (response.ok) {
                setBook(initialBookState); // Resetting the book state to initial values
                setBookAdded(true); // Set bookAdded to true after adding book
                setIsbnGenerated(false);
            } else {
                // Handle error if needed
            }
        })
        .catch(error => {
            // Handle error if needed
            console.error('Error:', error);
        });

    }

    const genIsbn = () => {
        fetch("http://localhost:8000/api/adm/genISBN")
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                // Handle error if needed
            }
        })
        .then(data => {
            setIsbn(data.isbn);
        })
        .catch(error => {
            // Handle error if needed
            console.error('Error:', error);
        });
    }

    return (
        <div className='addBook'>
            <h2>Add Book</h2>
            <div className="searchWrapper">
            <input type="text" placeholder="Title" value={book.title} onChange={(e) => setBook({ ...book, title: e.target.value })} />
            <br />
            
            <input type="text" placeholder="Author" value={book.author} onChange={(e) => setBook({ ...book, author: e.target.value })} />
            <br />
            
            <input type="text" placeholder="Publisher" value={book.publisher} onChange={(e) => setBook({ ...book, publisher: e.target.value })} />
            <br />
         
            <label>Edition:</label>
            <br />
            <input type="number" placeholder="Edition" value={book.edition} onChange={(e) => setBook({ ...book, edition: parseInt(e.target.value) })} />
            <br />
            <label>Year:</label>
            <input type="number" placeholder="Year" value={book.year} onChange={(e) => setBook({ ...book, year: parseInt(e.target.value) })} />
            <br />
            
            <div className="custom-select">
            <select
                value={selectedCategory}
                onChange={handleCategoryChange}
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
           
    <br />
    <div style={{ display: 'flex', alignItems: 'center', backgroundColor:'chocolate'}}>
    <label style={{ marginRight: '5px', fontSize:'20px', color:"aliceblue"}}>Available:</label>
    <input type="checkbox" checked={book.available} onChange={(e) => setBook({ ...book, available: e.target.checked })} />
    </div>
    <br />
    <div style={{ display: 'flex', alignItems: 'center', backgroundColor:'chocolate'}}>
        <label style={{ marginRight: '5px', fontSize:'20px', color:"aliceblue" }}>Reserved:</label>
        <input type="checkbox" checked={book.reserved} onChange={(e) => setBook({ ...book, reserved: e.target.checked })} />
    </div>
    <br />
            <div className="buttonWrapper">
            <div><button onClick={addBook}>Add Book</button></div>
            {bookAdded && !isbnGenerated && // Show button only if book is added and ISBN is not generated
                <div><button onClick={()=>{genIsbn();window.alert(book.ISBN);setIsbnGenerated(true);setBookAdded(false)}}>Generate ISBN</button></div>
            }
            </div>
            {/* <p>ISBN of last added book: {book.ISBN}</p> */}

            </div>
        </div>
    );
}

export default AddBook;
