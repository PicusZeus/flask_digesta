import {uiActions} from "./ui-slice";
import {authActions} from "./auth-slice";


export const logout = (token) => {
    return async (dispatch) => {

        const loggingOut = async () => {
            const response = await fetch("http://127.0.0.1:5001/logout", {
                headers: {Authorization: "Bearer " + token, "Content-Type": "application-json"}
            })

            if (!response.ok) {
                throw new Error('Nie powiodło się')
            }

        };

        try {
            await loggingOut()
            dispatch(uiActions.setNotification({
                status: "success",
                title: "Wylogowano",
                message: "Wylogowanie powiodło się"
            }))

            dispatch(authActions.resetToken())
            setTimeout(() => dispatch(uiActions.resetNotification()), 2000)
        } catch (error) {
            dispatch(uiActions.setNotification({
                        status: "error",
                        title: "Coś poszło nie tak",
                        message: "Błąd przy wylogowywaniu"
                    }
                )
            )
            setTimeout(() => dispatch(uiActions.resetNotification()), 2000)

        }


    }
}

export const loggingIn = (username, password) => {

    return async (dispatch) => {


        dispatch(uiActions.setNotification({
            status: "pending",
            title: "wysyłam...",
            message: "Wysyłam dane do logowania"
        }))
        setTimeout(() => dispatch(uiActions.resetNotification()), 2000)


        const sendRequest = async () => {
            const response = await fetch("http://127.0.0.1:5001/login",
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},

                    body: JSON.stringify({
                        username: username,
                        password: password,
                    }),
                })

            const data = await response.json()
            return data

        }

        try {
            const tokens = await sendRequest()
            dispatch(uiActions.setNotification({
                status: "success",
                title: "Zalogowano",
                message: "Udane logowanie"
            }))
            dispatch(uiActions.logingToggle())
            dispatch(authActions.setToken(tokens))
            setTimeout(() => dispatch(uiActions.resetNotification()), 2000)


        } catch (error) {
            dispatch(uiActions.setNotification({
                status: "error",
                title: "Wystąpił błąd",
                message: "logowanie się nie powiodło"
            }))
            dispatch(uiActions.logingToggle())
            setTimeout(() => dispatch(uiActions.resetNotification()), 2000)

        }
    }
}



export const register = (username, password, email) => {

    return async (dispatch) => {

        dispatch(uiActions.setNotification({
            status: "pending",
            title: "Rejestracja...",
            message: "Wysyłam dane do rejestracji"
        }))
        setTimeout(() => dispatch(uiActions.resetNotification()), 2000)

        const sendRequest = async () => {
            await fetch("http://127.0.0.1:5001/register",
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},

                    body: JSON.stringify({
                        username: username,
                        password: password,
                        email: email
                    }),
                })

        }

        try {
            await sendRequest()
            dispatch(uiActions.setNotification({
                status: "success",
                title: "Rejestracja",
                message: "Rejestracja się powiodła"
            }))
            dispatch(uiActions.registeringToggle())
            setTimeout(() => dispatch(uiActions.resetNotification()), 2000)


        } catch (error) {
            dispatch(uiActions.setNotification({
                status: "error",
                title: "Wystąpił błąd",
                message: "Rejestracja się nie powiodła"
            }))
            dispatch(uiActions.registeringToggle())
            setTimeout(() => dispatch(uiActions.resetNotification()), 2000)

        }
    }
}