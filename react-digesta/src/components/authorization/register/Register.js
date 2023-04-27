import classes from "./Register.module.css"
import Modal from "../../UI/modal/Modal";
import {useDispatch} from "react-redux";
import {uiActions} from "../../../store/ui-slice";
import {useState} from "react";
import {register} from "../../../store/auth-actions";

const Register = (props) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [passwordTest, setPasswordTest] = useState('')

    let classes_password = []
    let classes_email = []
    const checkPassword = (password, passwordTest) => {
        return password.length > 6 && password === passwordTest;
    }
    if (!checkPassword(password, passwordTest)) {classes_password.push(classes.error)}

    const checkEmail = (email) => {
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return !!email.match(validRegex);
    }
    if (!checkEmail(email)) {classes_email.push(classes.error)}
    const dispatch = useDispatch()
    const closeModalHandler = (event) => {
        event.preventDefault()
        dispatch(uiActions.registeringToggle())

    }

    const registerHandler = (event) => {

        event.preventDefault()
        if (checkEmail(email) && checkPassword(
            password, passwordTest
        )) {
            dispatch(register(
                username, password, email
            ))
        }

    }

    return (
        <Modal onClose={props.onClose}>
            <form method='post' onSubmit={registerHandler} className={classes.form}>
                <p>
                    <label htmlFor="username">Nazwa użytkownika</label>
                    <input id="username"
                           name="username"
                           onInput={(event) => setUsername(event.target.value)}
                           required/>
                </p>
                <p>
                    <label htmlFor="email">Twój adres email</label>
                    <input type="email"
                           id="email"
                           name="email"
                           className={classes_email.join(" ")}
                           onInput={(event) => setEmail(event.target.value)}
                           required/>
                </p>
                <p>
                    <label htmlFor="password">Stwórz hasło</label>
                    <input type="password"
                           id="password"
                           name="password"
                           className={classes_password.join(' ')}
                           onInput={(event) => setPassword(event.target.value)}
                           required/>
                </p>
                <p>
                    <label htmlFor="password_2">Powtórz hasło</label>
                    <input type="password"
                           id="password_2"
                           className={classes_password.join(' ')}
                           onInput={(event) => setPasswordTest(event.target.value)}
                           required/>
                </p>
                <p className={classes.actions}>
                    <button type="button" className={classes.button} onClick={closeModalHandler}>
                        Zamknij
                    </button>
                    <button type="submit">Submit</button>
                </p>
            </form>
        </Modal>

    )
}

export default Register