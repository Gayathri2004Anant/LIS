import {Link} from 'react-router-dom';

const BookDetails = ({book}) => {

    return ( 
        <div className="fullpage">
            <div className="leftpage">
            </div>
        <div className="book">
            <div className="bookWrapper">
                <div className="bookContent">
            <h2>{book.title}</h2>
            <div>
                <h3>Author: {book.author}</h3>
                <h3>Publisher: {book.publisher}</h3>
                <h3>Edition: {book.edition}</h3>
                <h3>Year: {book.year}</h3>
                <h3>Category: {book.category}</h3>
                <h3>Last Issue Date: {book.last_issue_date}</h3>
                <h3>Available: {book.available}</h3>
                <h3 className='break-here'>Reserved: {book.reserved}</h3>
            </div>
            <div><Link to ='/search'>Back to Search</Link></div>
            </div>
            </div>
        </div>
        </div>
     );
}
 
export default BookDetails;