import classes from "./Register.module.css"
import Modal from "../../UI/modal/Modal";
import {useDispatch} from "react-redux";
import {uiActions} from "../../../store/ui-slice";

const Register = (props) => {
    const dispatch = useDispatch()
    const closeModalHandler = (event) => {
        event.preventDefault()
        dispatch(uiActions.registeringToggle())

    }
    return (
        <Modal onClose={props.onClose}>
            <form method='post' className={classes.form}>
                <p>
                    <label htmlFor="username">Nazwa użytkownika</label>
                    <input id="username" name="username" required/>
                </p>
                <p>
                    <label htmlFor="email">Twój adres email</label>
                    <input type="email" id="email" name="email" required/>
                </p>
                <p>
                    <label htmlFor="password">Stwórz hasło</label>
                    <input type="password" id="password" name="password" required/>
                </p>
                <p>
                    <label htmlFor="password_2">Powtórz hasło</label>
                    <input type="password" id="password_2" required/>
                </p>
                <p className={classes.actions}>
                    <button className={classes.button} onClick={event=>closeModalHandler(event)}>
                        Zamknij
                    </button>
                    <button onClick={(event) => closeModalHandler(event)}>Submit</button>
                </p>
            </form>
        </Modal>

    )
}

export default Register