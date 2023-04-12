import classes from "./Login.module.css"
import {useState} from "react";
import Modal from "../../UI/modal/Modal";
import {useDispatch} from "react-redux";
import {uiActions} from "../../../store/ui-slice";
import {loggingIn} from "../../../store/auth-actions";

const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const usernameHandler = (event) => {
        console.log(event.target.value)
        setUsername(event.target.value)
    }

    const passwordHandler = (event) => {
        setPassword(event.target.value)
    }
    const dispatch = useDispatch()

    const closeModalHandler = (event) => {
        console.log('closing')
        event.preventDefault()
        dispatch(uiActions.logingToggle())
    }

    const loginHandler = (event) => {
        console.log('loging')
        event.preventDefault()

        dispatch(loggingIn(username, password))

    }


    return (
        <Modal onClose={props.onClose}>
            <form onSubmit={loginHandler} method="post" className={classes.form}>
                <p>
                    <label htmlFor="username">Nazwa użytkownika</label>
                    <input id="username" onChange={usernameHandler} name="username" required/>
                </p>
                <p>
                    <label htmlFor="password">Podaj hasło</label>
                    <input onChange={passwordHandler} type="password" id="password" name="password" required/>
                </p>

                <p className={classes.actions}>
                    <button type="button" className={classes.button} onClick={event => closeModalHandler(event)}>
                        Zamknij
                    </button>
                    <button type="submit">Submit</button>
                </p>
            </form>
        </Modal>
    )
}

export default Login