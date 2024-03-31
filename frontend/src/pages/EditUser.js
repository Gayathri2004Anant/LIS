import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const EditUser = () => {
  const { id } = useParams();
  console.log('hello', id);
  const history = useHistory();

  const [user, setUser] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/users/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch user with id ${id}`);
        }
        const data = await response.json();
        console.log(data);
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
        // Handle error (e.g., show an error message, redirect)
        // For example, you can redirect to an error page:
        // history.push('/error');
      }
    };

    getUser();
  }, [id, history]); // Include id and history as dependencies

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
  };

  const handleBack = () => {
    history.goBack(); // Go back to the previous page
  };

  return (
    <div className='editBook'>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={user.name} onChange={handleInputChange} />
        <br />
        <p>Code: {user.code}</p>
        <br />
        <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleInputChange} />
        <br />
        <p>Username: {user.username}</p>
        <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleInputChange} />
        <br />
        <textarea className='ta' name="notification" placeholder="Notification" value={user.notification} onChange={handleInputChange} />
        <br />
        <div className="custom-select">
          <select name="type" value={user.type} onChange={handleInputChange}>
            <option value={1}>Undergraduate Student</option>
            <option value={2}>Postgraduate Student</option>
            <option value={3}>Research Scholar</option>
            <option value={4}>Faculty Member</option>
          </select>
        </div>
        <p>Type: {user.type===1&&"Undergraduate Student"||user.type===2&&"Postgraduate Student"||user.type===3&&"Research Scholar"||user.type===4&&"Faculty Member"}</p>
        <br />
        <p>Membership Valid Till: </p>
        <input type="date" name="valid_till" placeholder="Membership validity" value={user.valid_till} onChange={handleInputChange} />
        <br />
        <button type="submit">Update User</button>
        <button type="button" onClick={handleBack}>Back</button>
      </form>
    </div>
  );
};

export default EditUser;
