import classes from "./Login.module.css"
import {useRef, useEffect} from "react";
import Modal from "../../UI/modal/Modal";
import {useDispatch} from "react-redux";
import {loggingIn} from "../../../store/auth-actions";

const Login = ({onClose}) => {

    const password =useRef()
    const username = useRef()

    useEffect(() => {
        username.current.focus()
    },[])


    const dispatch = useDispatch()



    const loginHandler = (event) => {
        event.preventDefault()
        dispatch(loggingIn(username.current.value, password.current.value))
    }


    return (
        <Modal onClose={onClose}>
            <form onSubmit={loginHandler} method="post" className={classes.form}>
                <p>
                    <label htmlFor="username">Podaj nazwę użytkownika</label>
                    <input id="username" ref={username} name="username" required/>
                </p>
                <p>
                    <label htmlFor="password">Podaj hasło</label>
                    <input  ref={password} type="password" id="password" name="password" required/>
                </p>

                <p className={classes.actions}>
                    <button type="button" className={classes.button} onClick={onClose}>
                        Zamknij
                    </button>
                    <button type="submit">Prześlij</button>
                </p>
            </form>
        </Modal>
    )
}

export default Login