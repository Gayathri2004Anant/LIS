import './homepage.css';
import { useState } from "react";
function TypeBooks() {
    const [selectedOption, setSelectedOption] = useState('Title');
  
    const handleSelectChange = (event) => {
      setSelectedOption(event.target.value);
    };
  
    return (
      <div className="type">
        <h2>Select By: </h2>
        <select value={selectedOption} onChange={handleSelectChange}>
          <option value="Title">Title</option>
          <option value="Author">Author</option>
          <option value="Category">Category</option>
        </select>
      </div>
    );
  }
  function TypeLogIn() {
    const [selectedId, setSelectedId] = useState('User');
  
    const handleSelectChange = (event) => {
      setSelectedId(event.target.value);
    };
  
    return (
      <div className="idtype">
        <h2>Login As: </h2>
        <select value={selectedId} onChange={handleSelectChange}>
          <option value="User">User</option>
          <option value="Administrator">Administrator</option>
        </select>
      </div>
    );
  }
const Home = () => {
    return ( 
        <div>
            <TypeBooks/>

            <form>
            <label>
                Search for books:
                <input type="text" name="name" />
            </label>
            <button>Search</button>
            </form>
            <TypeLogIn/>
        </div>
     );
}
 
export default Home;