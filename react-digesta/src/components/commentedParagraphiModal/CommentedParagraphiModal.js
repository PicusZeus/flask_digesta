import Modal from "../UI/modal/Modal";
import classes from "./CommentedParagraphiModal.module.css";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import tokenService from "../../services/token.service";

const CommentedParagraphiModal = ({ onClose, onCloseMobileMenu }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const commentedParagraphi = tokenService.getCommentedParagraphi();

  const onClickHandler = (url) => {
    dispatch(uiActions.setActiveSection("digestaNav"));
    onClose();
    onCloseMobileMenu(false);
    navigate(url);
  };
  return (
    <Modal onClose={onClose}>
      <ul className={classes.list}>
        {commentedParagraphi.map((par) => (
          <li key={par.id}>
            <button
              onClick={() =>
                onClickHandler(
                  par.key !== "pr"
                    ? "/digesta/" + par.lex.id + "/" + par.id
                    : "/digesta/" + par.lex.id
                )
              }
            >
              {par.lex.titulus.book.book_nr}.{par.lex.titulus.number}.
              {par.lex.lex_nr}
              {par.key !== "pr" ? "." + par.key : ""}
            </button>
          </li>
        ))}
      </ul>
    </Modal>
  );
};

export default CommentedParagraphiModal;
