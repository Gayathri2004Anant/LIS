import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const EditBook = () => {
  const { id } = useParams();
  console.log('hello', id);
  const history = useHistory();

  const [book, setBook] = useState({
    title: "",
    author: "",
    publisher: "",
    edition: "",
    year: "",
    category: "",
    last_issue_date: "",
    available: "",
    reserved: "",
  });

  useEffect(() => {
    const getBook = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/books/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch book with id ${id}`);
        }
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching book:", error);
        // Handle error (e.g., show an error message, redirect)
        // For example, you can redirect to an error page:
        // history.push('/error');
      }
    };

    getBook();
  }, [id, history]); // Include id and history as dependencies

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(book);
  };

  const handleBack = () => {
    history.goBack(); // Go back to the previous page
  };

  return (
    <div className='editBook'>
      <h2>Edit Book</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" value={book.title} onChange={handleInputChange} />
        <br />
        <input type="text" name="author" placeholder="Author" value={book.author} onChange={handleInputChange} />
        <br />
        <input type="text" name="publisher" placeholder="Publisher" value={book.publisher} onChange={handleInputChange} />
        <br />
        <input type="text" name="edition" placeholder="Edition" value={book.edition} onChange={handleInputChange} />
        <br />
        <input type="text" name="year" placeholder="Year" value={book.year} onChange={handleInputChange} />
        <br />
        <div className="custom-select">
          <select name="category" value={book.category} onChange={handleInputChange}>
            <option value="Adventure">Adventure</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Crime">Crime</option>
            <option value="Classics">Classics</option>
            <option value="History">History</option>
            <option value="Romance">Romance</option>
            <option value="Biography">Biography</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Science">Science</option>
            <option value="Mechanics">Mechanics</option>
          </select>
        </div>
        <br />
        <button type="submit">Update Book</button>
        <button type="button" onClick={handleBack}>Back</button> {/* Back button */}
      </form>
    </div>
  );
};

export default EditBook;
