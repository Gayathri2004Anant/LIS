import React, { useState } from 'react';
import Books from '../components/BookList';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState('name');
  const [selectedCategory, setSelectedCategory] = useState(1); // Default to Adventure
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    // Construct the URL based on the selected option
    let url;
    if (selectedOption === 'category') {
      url = `http://localhost:8000/api/books/category/${selectedCategory}`;
    } else if (selectedOption === 'author') {
      url = `http://localhost:8000/api/books/author/${searchTerm}`;
    } else {
      url = `http://localhost:8000/api/books/${searchTerm}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

    const renderAdditionalField = () => {
    if (selectedOption === 'category') {
      // Render another dropdown for categories
      return (
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(parseInt(e.target.value))}
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
      );
    } else {
      // Render a text field for author or title
      return (
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      );
    }
  };

  return (
    <div className="search">
      <form onSubmit={handleSearch}>
        <select
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e.target.value);
            setSelectedCategory(1); // Reset to Adventure
          }}
        >
          <option value="name">Name</option>
          <option value="title">Title</option>
          <option value="category">Category</option>
          <option value="author">Author</option>
        </select>

        {renderAdditionalField()}

        <button type="submit">Search</button>
      </form>

      <div>
        <Books books={searchResults} />
      </div>
    </div>
  );
};

export default Search;

