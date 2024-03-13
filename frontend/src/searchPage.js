import React, { useState } from 'react';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState('name');
  const [selectedCategory, setSelectedCategory] = useState(1); // Default to Adventure

  const handleSearch = (e) => {
    e.preventDefault();
    // Use the selectedOption, searchTerm, and selectedCategory as needed
    console.log(`Searching for ${searchTerm} in ${selectedOption} - Category: ${selectedCategory}`);
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
        </select>

        {renderAdditionalField()}

        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Search;
