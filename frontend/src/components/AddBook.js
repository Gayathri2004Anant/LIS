import React, { useState } from 'react';

const AddBook = () => {
    const [book, setBook] = useState({
        title: "",
        author: "",
        publisher: "",
        edition: 1,
        year: 1990,
        category: 1,
        last_issue_date: "2000-01-01",
        available: false,
        reserved: false
    });

    const addBook = async () => {
        console.log(book);
        fetch("http://localhost:8000/api/adm/books/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(book)
        });
    }

    return (
        <div>
            <h2>Add Book</h2>
            <label>Title:</label>
            <input type="text" placeholder="Title" value={book.title} onChange={(e) => setBook({ ...book, title: e.target.value })} />
            <br />
            <label>Author:</label>
            <input type="text" placeholder="Author" value={book.author} onChange={(e) => setBook({ ...book, author: e.target.value })} />
            <br />
            <label>Publisher:</label>
            <input type="text" placeholder="Publisher" value={book.publisher} onChange={(e) => setBook({ ...book, publisher: e.target.value })} />
            <br />
            <label>Edition:</label>
            <input type="number" placeholder="Edition" value={book.edition} onChange={(e) => setBook({ ...book, edition: parseInt(e.target.value) })} />
            <br />
            <label>Year:</label>
            <input type="number" placeholder="Year" value={book.year} onChange={(e) => setBook({ ...book, year: parseInt(e.target.value) })} />
            <br />
            <label>Category:</label>
            <input type="number" placeholder="Category" value={book.category} onChange={(e) => setBook({ ...book, category: parseInt(e.target.value) })} />
            <br />
            <label>Last Issue Date:</label>
            <input type="date" placeholder="Last Issue Date" value={book.last_issue_date} onChange={(e) => setBook({ ...book, last_issue_date: e.target.value })} />
            <br />
            <label>Available:</label>
            <input type="checkbox" checked={book.available} onChange={(e) => setBook({ ...book, available: e.target.checked })} />
            <br />
            <label>Reserved:</label>
            <input type="checkbox" checked={book.reserved} onChange={(e) => setBook({ ...book, reserved: e.target.checked })} />
            <br />
            <button onClick={addBook}>Add Book</button>
        </div>
    );
}

export default AddBook;
