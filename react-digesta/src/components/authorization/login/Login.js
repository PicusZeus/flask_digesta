import classes from "./Login.module.css"

import Modal from "../../UI/modal/Modal";
import {Form} from "react-router-dom";

const Login = (props) => {
    return (
        <Modal onClose={props.onClose}>
            <Form method='post' className={classes.form}>
                <p>
                    <label htmlFor="username">Nazwa użytkownika</label>
                    <input id="username" name="username" required/>
                </p>
                <p>
                    <label htmlFor="password">Stwórz hasło</label>
                    <input type="password" id="password" name="password" required/>
                </p>

                <p className={classes.actions}>
                    <div className={classes.button} onClick={props.onClose}>
                        Zamknij
                    </div>
                    <button>Submit</button>
                </p>
            </Form>
        </Modal>
    )
}

export default Login