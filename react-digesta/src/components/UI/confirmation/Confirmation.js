import Modal from "../modal/Modal";
import classes from "./Confirmation.module.css";

const Confirmation = (props) => {
  return (
    <Modal onClose={props.cancelAction}>
      <section className={classes.confirmation_main}>
        <h1 className={classes.confirmation_main__title}>{props.title}</h1>
        <p>{props.message}</p>
        <p className={classes.actions}>
          <button
            className={classes.action_cancel}
            onClick={props.cancelAction}
          >
            Anuluj
          </button>
          <button
            className={classes.action_confirm}
            onClick={props.confirmAction}
          >
            Potwierdzam
          </button>
        </p>
      </section>
    </Modal>
  );
};

export default Confirmation;
