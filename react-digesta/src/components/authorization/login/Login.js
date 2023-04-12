import classes from "./Login.module.css"

import Modal from "../../UI/modal/Modal";
import {Form} from "react-router-dom";

const Login = (props) => {

    const registerHandler = (event) => {
        event.preventDefault()
        console.log('registering')
        console.log(event)
    }
    return (
        <Modal onClose={props.onClose}>
            <form className={classes.form}>
                <p>
                    <label htmlFor="username">Nazwa użytkownika</label>
                    <input id="username" name="username" required/>
                </p>
                <p>
                    <label htmlFor="password">Stwórz hasło</label>
                    <input type="password" id="password" name="password" required/>
                </p>

                <p className={classes.actions}>
                    <button className={classes.button} onClick={props.onClose}>
                        Zamknij
                    </button>
                    <button onClick={(event) => registerHandler(event)}>Submit</button>
                </p>
            </form>
        </Modal>
    )
}

export default Login