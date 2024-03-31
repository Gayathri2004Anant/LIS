// import React, { useState } from 'react';


// const EditUser = ({userData}) =>  {

//     const [User, setUser] = useState(userData);
//     const [selectedCategory, setSelectedCategory] = useState(1);
//     const [userEdited, setUserEdited] = useState(false); // Track whether book has been added

//     const initialUserState = {
//         title: `${bookData.title}`,
//         author: `${bookData.author}`,
//         publisher: `${bookData.publisher}`,
//         edition: `${bookData.edition}`,
//         year: `${bookData.year}`,
//         category: `${bookData.category}`,
//         last_issue_date: `${bookData.last_issue_date}`,
//         available: `${bookData.available}`,
//         reserved: `${bookData.reserved}`
//     };

//     const handleCategoryChange = (e) => {
//         setSelectedCategory(parseInt(e.target.value));
//         setUser({ ...user, category: parseInt(e.target.value) });
//     };

//     const editUser = async () => {
//         console.log(book);
//         fetch(`http://localhost:8000/api/adm/users/edit_user/${userEdited.id}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(user)
//         })
//         .then(response => {
//             if (response.ok) {
//                 setUser(initialUserState); // Resetting the book state to initial values
//                 setUserEdited(true); // Set bookAdded to true after adding book
//             } else {
//                 // Handle error if needed
//             }
//         })
//         .catch(error => {
//             // Handle error if needed
//             console.error('Error:', error);
//         });

//     }


//     return (
//         <div className='addBook'>
//             <h2>Edit User</h2>
//             <div className="searchWrapper">
//             <input type="text" placeholder="Title" value={book.title} onChange={(e) => setBook({ ...book, title: e.target.value })} />
//             <br />
            
//             <input type="text" placeholder="Author" value={book.author} onChange={(e) => setBook({ ...book, author: e.target.value })} />
//             <br />
            
//             <input type="text" placeholder="Publisher" value={book.publisher} onChange={(e) => setBook({ ...book, publisher: e.target.value })} />
//             <br />
         
//             <label>Edition:</label>
//             <br />
//             <input type="number" placeholder="Edition" value={book.edition} onChange={(e) => setBook({ ...book, edition: parseInt(e.target.value) })} />
//             <br />
//             <label>Year:</label>
//             <input type="number" placeholder="Year" value={book.year} onChange={(e) => setBook({ ...book, year: parseInt(e.target.value) })} />
//             <br />
            
//             <div className="custom-select">
//             <select
//                 value={selectedCategory}
//                 onChange={handleCategoryChange}
//             >
//                 <option value={1}>Adventure</option>
//                 <option value={2}>Fantasy</option>
//                 <option value={3}>Crime</option>
//                 <option value={4}>Classics</option>
//                 <option value={5}>History</option>
//                 <option value={6}>Romance</option>
//                 <option value={7}>Biography</option>
//                 <option value={8}>Mathematics</option>
//                 <option value={9}>Computer Science</option>
//                 <option value={10}>Science</option>
//                 <option value={11}>Mechanics</option>
//             </select>
//         </div>
           
//     <br />
//     <div style={{ display: 'flex', alignItems: 'center', backgroundColor:'chocolate'}}>
//     <label style={{ marginRight: '5px', fontSize:'20px', color:"aliceblue"}}>Available:</label>
//     <input type="checkbox" checked={book.available} onChange={(e) => setUser({ ...user, available: e.target.checked })} />
//     </div>
//     <br />
//     <div style={{ display: 'flex', alignItems: 'center', backgroundColor:'chocolate'}}>
//         <label style={{ marginRight: '5px', fontSize:'20px', color:"aliceblue" }}>Reserved:</label>
//         <input type="checkbox" checked={book.reserved} onChange={(e) => setUser({ ...user, reserved: e.target.checked })} />
//     </div>
//     <br />
//             <div className="buttonWrapper">
//             <div><button onClick={editUser}>Edit User</button></div>
//             </div>
//             </div>
//         </div>
//     );
// }

// export default EditUser;