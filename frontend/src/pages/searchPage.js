// import React, { useState } from 'react';
// import Books from '../components/BookList';
// import { Link } from 'react-router-dom';

// const Search = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedOption, setSelectedOption] = useState('name');
//   const [selectedCategory, setSelectedCategory] = useState(1); // Default to Adventure
//   const [searchResults, setSearchResults] = useState([]);

//   const handleSearch = async (e) => {
//     e.preventDefault();

//     // Construct the URL based on the selected option
//     let url;
//     if (selectedOption === 'category') {
//       url = `http://localhost:8000/api/books/category/${selectedCategory}`;
//     } else if (selectedOption === 'author') {
//       url = `http://localhost:8000/api/books/author/${searchTerm}`;
//     } else {
//       url = `http://localhost:8000/api/books/${searchTerm}`;
//     }

//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       setSearchResults(data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//     const renderAdditionalField = () => {
//     if (selectedOption === 'category') {
//       // Render another dropdown for categories
//       return (
//         <div className="custom-select">
//         <select
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(parseInt(e.target.value))}
//         >
//           <option value={1}>Adventure</option>
//           <option value={2}>Fantasy</option>
//           <option value={3}>Crime</option>
//           <option value={4}>Classics</option>
//           <option value={5}>History</option>
//           <option value={6}>Romance</option>
//           <option value={7}>Biography</option>
//           <option value={8}>Mathematics</option>
//           <option value={9}>Computer Science</option>
//           <option value={10}>Science</option>
//           <option value={11}>Mechanics</option>
//         </select>
//         </div>
//       );
//     } else {
//       // Render a text field for author or title
//       return (
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       );
//     }
//   };

//   return (
//     <div className="search">
//       <div className="halfScreen">
//         <div className="searchWrapper">
//       <h1>EXPLORE</h1>
//       <h3>We have a wide range of books with 10+ categories. Go ahead and hit the search bar</h3>
//       <form onSubmit={handleSearch}>
//         <div className="custom-select">
//         <select
//           value={selectedOption}
//           onChange={(e) => {
//             setSelectedOption(e.target.value);
//             setSelectedCategory(1); // Reset to Adventure
//           }}
//         >
//           <option value="title">Title</option>
//           <option value="category">Category</option>
//           <option value="author">Author</option>
//         </select>
//         </div>

//         {renderAdditionalField()}

//         <button type="submit">Search</button>
//         <Link to="/"><button>Home</button></Link>
//       </form>
//       </div>
//       </div>
//       <div className="restOfScreen">
//       <h2 className='headerSearch'>Your search results turn up here!</h2>
//       <div className='BookSearchList'>
        
//         <Books books={searchResults} />
//       </div>
//       </div>
//     </div>
//   );
// };

// export default Search;

import React, { useState, useEffect } from 'react';
import Books from '../components/BookList';
import { Link } from 'react-router-dom';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState('title');
  const [selectedCategory, setSelectedCategory] = useState(1); // Default to Adventure
  const [searchResults, setSearchResults] = useState([]);
  const categories = [
    { id: 1, name: 'Adventure' },
    { id: 2, name: 'Fantasy' },
    { id: 3, name: 'Crime' },
    { id: 4, name: 'Classics' },
    { id: 5, name: 'History' },
    { id: 6, name: 'Romance' },
    { id: 7, name: 'Biography' },
    { id: 8, name: 'Mathematics' },
    { id: 9, name: 'Computer Science' },
    { id: 10, name: 'Science' },
    { id: 11, name: 'Mechanics' },
    { id: 12, name: 'Electronics and Electrical Engineering' },
    { id: 13, name: 'Physics' },
    { id: 14, name: 'Chemistry' },
    { id: 15, name: 'Chemical Engineering' },
    { id: 16, name: 'Geology' },
    { id: 17, name: 'Ocean and Naval Engineering' },
    { id: 18, name: 'Metallurgy' },
    { id: 19, name: 'Biotechnology and Biochemistry' },
    { id: 20, name: 'Architecture' },
    { id: 21, name: 'Agriculture and Farming' },
    { id: 22, name: 'Mining' },
    { id: 23, name: 'Civil Engineering' },
  ];

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

  return (
    <div className="search">
      <div className="halfScreen">
        <div className="searchWrapper">
          <h1>EXPLORE</h1>
          <h3>We have a wide range of books with 10+ categories. Go ahead and hit the search bar</h3>
          <form onSubmit={handleSearch}>
            <div className="custom-select">
              <select
                value={selectedOption}
                onChange={(e) => {
                  setSelectedOption(e.target.value);
                  setSelectedCategory(1); // Reset to Adventure
                }}
              >
                <option value="title">Title</option>
                <option value="category">Category</option>
                <option value="author">Author</option>
              </select>
            </div>

            {selectedOption === 'category' ? (
              <div className="custom-select">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(parseInt(e.target.value))}
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
            ) : (
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            )}

            <button type="submit">Search</button>
            <Link to="/"><button>Home</button></Link>
          </form>
        </div>
      </div>
      <div className="restOfScreen">
        <h2 className='headerSearch'>Your search results turn up here!</h2>
        <div className='BookSearchList'>
          <Books books={searchResults} />
        </div>
      </div>
    </div>
  );
};

export default Search;


