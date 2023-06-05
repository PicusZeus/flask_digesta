import Modal from "../modal/Modal";
import classes from "./Confirmation.module.css";

const Confirmation = ({cancelAction, confirmAction, message, title}) => {
  return (
    <Modal onClose={cancelAction}>
      <section className={classes.confirmation_main}>
        <h1 className={classes.confirmation_main__title}>{title}</h1>
        <p>{message}</p>
        <p className={classes.actions}>
          <button
            className={classes.action_cancel}
            onClick={cancelAction}
          >
            Anuluj
          </button>
          <button
            className={classes.action_confirm}
            onClick={confirmAction}
          >
            Potwierdzam
          </button>
        </p>
      </section>
    </Modal>
  );
};

export default Confirmation;
