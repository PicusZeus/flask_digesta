// import {useDispatch} from "react-redux";
// import {digestaActions} from "../../../../store/digesta-slice";
// import {useNavigate} from "react-router-dom";
import DigestaTocDesktopBook from "../DigestaTocDesktopBook/DigestaTocDesktopBook";
import classes from "./DigestaTocDesktopBooks.module.css"

const DigestaTocDesktopBooks = (props) => {
    const toc = props.toc


    return (
        <div className={classes.main_toc}>
            <h4 className={classes.main_toc__title}>Digesta Iustiniani</h4>
            <ul className={classes.main_toc__items}>

                {toc && toc.map((book) => (
                    <DigestaTocDesktopBook key={book.id} book={book}/>

                    ))}
            </ul>


        </div>

    )
}

export default DigestaTocDesktopBooks