import {uiActions} from "./ui-slice";
import {authActions} from "./auth-slice";


export const logout = (token) => {
    return async (dispatch) => {

        const loggingOut = async () => {
            const response = await fetch("http://127.0.0.1:5001/logout", {
                headers: {Authorization: "Bearer " + token, "Content-Type": "application-json" }
            })

            if (!response.ok) {
                throw new Error('Nie powiodło się')
            }

        };

        try {
            await loggingOut()
            dispatch(authActions.resetToken())
        } catch (error) {
            dispatch(uiActions.setNotification({
                        status: "error",
                        title: "Coś poszło nie tak",
                        message: "Błąd przy wylogowywaniu"
                    }
                )
            )
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
            console.log(tokens, 'try clause')
            dispatch(uiActions.setNotification({
                status: "success",
                title: "Zalogowano",
                message: "Udane logowanie"
            }))
            dispatch(uiActions.logingToggle())
            dispatch(authActions.setToken(tokens))


        } catch (error) {
            console.log(error)
            dispatch(uiActions.setNotification({
                status: "error",
                title: "Wystąpił błąd",
                message: "logowanie się nie powiodło"
            }))
            dispatch(uiActions.logingToggle())
        }
    }
}