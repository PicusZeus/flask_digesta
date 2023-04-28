import {useState} from "react";
import DigestaTocDesktopTitulus from "../DigestaTocDesktopTitulus/DigestaTocDesktopTitulus";


const DigestaTocDesktopBook = ({book}) => {
    const [bookMenuOpen, setBookMenuOpen] = useState(false)

    return (
        <li>
            <button onClick={()=>setBookMenuOpen(!bookMenuOpen)}>{book.book_latin_name}</button>
            <ul>
                {bookMenuOpen && <h4>Tituli</h4>}
                {bookMenuOpen && book.tituli.map((titulus)=>(<DigestaTocDesktopTitulus titulus={titulus}/>))}
            </ul>
        </li>
    )
}

export default DigestaTocDesktopBook