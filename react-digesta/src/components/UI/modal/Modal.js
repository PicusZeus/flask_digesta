import classes from "./Modal.module.css";

function Modal({onClose, children}) {
  return (
    <>
      <div data-testid="backdrop" className={classes.backdrop} onClick={onClose} />
      <dialog open className={classes.modal}>
        {children}
      </dialog>
    </>
  );
}

export default Modal;
