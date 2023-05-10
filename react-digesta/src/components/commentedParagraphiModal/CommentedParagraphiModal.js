import Modal from "../UI/modal/Modal";
import classes from './CommentedParagraphiModal.module.css'

import {Link} from "react-router-dom";


const CommentedParagraphiModal = ({commentedParagraphi, onClose, onCloseMobileMenu}) => {
    console.log(commentedParagraphi)

    return (
        <Modal onClose={onClose}>
            <ul className={classes.list}>
                {commentedParagraphi.map(
                    (par) =>
                        (<li>
                            <Link key={par.id} onClick={() => {onClose(); onCloseMobileMenu(true)}} to={
                                par.key !== 'pr' ? "/digesta/" + par.lex.id + '/' +  par.id : "/digesta/" + par.lex.id}>
                                {par.lex.titulus.book.book_nr}.{par.lex.titulus.number}.{par.lex.lex_nr}{par.key !== 'pr' ? "." + par.key : ""}
                            </Link>
                        </li>))
                    }
            </ul>
        </Modal>
    )
}

export default CommentedParagraphiModal