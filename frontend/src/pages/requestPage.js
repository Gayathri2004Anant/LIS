import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const RequestPage = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [formData, setFormData] = useState({
        isbn: '',
        title: '',
        author: '',
        link: ''
    });

    const history = useHistory(); // Access to the history object

    const handleOptionChange = (option) => {
        setSelectedOption(option);
        // Reset form data when option changes
        setFormData({
            isbn: '',
            title: '',
            author: '',
            link: ''
        });
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const goBack = () => {
        history.goBack(); // Navigate back
    }

    return (
        <div className='requestPage'>
            <div className="topRequest">
                <h1>Request Page</h1>
                <h3 onClick={goBack}>Back</h3> {/* Added onClick event */}
            </div>
            <div className='requestOptions'>
                <label>
                    <input type="radio" name="option" value="bookNotInShelf" onChange={() => handleOptionChange('bookNotInShelf')} checked={selectedOption === 'bookNotInShelf'} />
                    Book Not in Shelf
                </label>
                <label>
                    <input type="radio" name="option" value="requestForProcuring" onChange={() => handleOptionChange('requestForProcuring')} checked={selectedOption === 'requestForProcuring'} />
                    Request for Procuring
                </label>
            </div>

            {selectedOption === 'bookNotInShelf' && (
                <div className='requestData'>
                    <h2>Enter Book ISBN:</h2>
                    <input type="text" name="isbn" value={formData.isbn} onChange={handleInputChange} />
                </div>
            )}

            {selectedOption === 'requestForProcuring' && (
                <div className='requestData'>
                    <h2>Enter Book Details:</h2>
                    <div>
                        <label>Title:</label>
                        <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label>Author:</label>
                        <input type="text" name="author" value={formData.author} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label>Link to Official Book Website:</label>
                        <input type="text" name="link" value={formData.link} onChange={handleInputChange} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default RequestPage;
