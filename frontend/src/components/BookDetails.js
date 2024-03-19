// import {Link} from 'react-router-dom';

// const BookDetails = ({book}) => {

//     return ( 
//         <div className="fullpage">
//             <div className="leftpage">
//             </div>
//         <div className="book">
//             <div className="bookWrapper">
//                 <div className="bookContent">
//             <h2>{book.title}</h2>
//             <div>
//                 <h3>Author: {book.author}</h3>
//                 <h3>Publisher: {book.publisher}</h3>
//                 <h3>Edition: {book.edition}</h3>
//                 <h3>Year: {book.year}</h3>
//                 <h3>Category: {book.category}</h3>
//                 <h3>Last Issue Date: {book.last_issue_date}</h3>
//                 <h3>Available: {book.available}</h3>
//                 <h3 className='break-here'>Reserved: {book.reserved}</h3>
//             </div>
//             <div><Link to ='/search'>Back to Search</Link></div>
//             </div>
//             </div>
//         </div>
//         </div>
//      );
// }
 
// export default BookDetails;

import { Link } from 'react-router-dom';

// Define category mappings
const CATEGORY_MAPPING = {
    1: 'Adventure',
    2: 'Fantasy',
    3: 'Crime',
    4: 'Classics',
    5: 'History',
    6: 'Romance',
    7: 'Biography',
    8: 'Mathematics',
    9: 'Computer Science',
    10: 'Science',
    11: 'Mechanics'
};

const BookDetails = ({ book }) => {
    // Function to get text based on category value
    const getCategoryText = (category) => {
        return CATEGORY_MAPPING[category] || 'Unknown';
    };

    return (
        <div className="fullpage">
            <div className="leftpage">
            </div>
            <div className="book">
                <div className="bookWrapper">
                    <div className="bookContent">
                        <h2>{book.title}</h2>
                        <div>
                            <h3>ISBN: {book.ISBN}</h3>
                            <h3>Author: {book.author}</h3>
                            <h3>Publisher: {book.publisher}</h3>
                            <h3>Edition: {book.edition}</h3>
                            <h3>Year: {book.year}</h3>
                            <h3>Category: {getCategoryText(book.category)}</h3>
                            <h3>Last Issue Date: {book.last_issue_date}</h3>
                            <h3>Available: {(book.available===true && "Yes")||(book.available===false && "No")}</h3>
                            <h3>Cupboard no.: </h3>
                            <h3>Rack no.: </h3>
                            <h3>Position no.: </h3>
                            <h3 className='break-here'>Reserved: {(book.reserved===true && "Yes")||(book.reserved===false && "No")}</h3>
                        </div>
                        <div><Link to='/search'>Back to Search</Link></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookDetails;
