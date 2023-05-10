import {uiActions} from "./ui-slice";
import {authActions} from "./auth-slice";
import TokenService from "../services/token.service";
import tokenService from "../services/token.service";
import NotificationService from "../services/notification.service";

export const logout = (token) => {
    return async (dispatch) => {
        const notificationSetter = new NotificationService(dispatch)

        const loggingOut = async () => {
            const response = await fetch(process.env.REACT_APP_BASE_API_URL + "logout", {
                headers: {Authorization: "Bearer " + token, "Content-Type": "application-json"}
            })

            if (response.status !== 401 && !response.ok) {

                throw new Error('błąd serwera')
            }
        };

        try {
            await loggingOut()
            notificationSetter.setNotificationSuccess("wylogowane", "Wylogowanie się powiodło")

            tokenService.removeUser()

            dispatch(authActions.resetToken())
            setTimeout(() => dispatch(uiActions.resetNotification()), 2000)
        } catch (error) {
            notificationSetter.setNotificationError("Coś poszło nie tak", "Błąd przy wylogowaniu")
        }
    }
}

export const refreshToken = (refresh_token) => {
    return async (dispatch) => {
        const sendRequest = async () => {
            const response = await fetch(process.env.REACT_APP_BASE_API_URL + "refresh", {
                method: "post",
                headers: {
                    "Content-Type": "application-json",
                    Authorization: "Bearer " + refresh_token
                }
            })
            const data = await response.json()
            return data

        }

        try {

            const data = await sendRequest()
            const access_token = data.access_token
            dispatch(authActions.setToken(access_token))
            tokenService.updateLocalAccessToken(access_token)
        } catch (e) {
        }


    }
}

export const loggingIn = (username, password) => {

    return async (dispatch) => {
        const notificationSetter = new NotificationService(dispatch)

        notificationSetter.setNotificationPending("wysyłam...", "Wysyłam dane do logowania")


        const sendRequest = async () => {
            const response = await fetch(process.env.REACT_APP_BASE_API_URL + "login",
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
            const data = await sendRequest()
            if (data.code === 401) {
                notificationSetter.setNotificationError("Niepoprawne dane", "nieudane logowanie")

                dispatch(uiActions.logingToggle())
            } else {
                notificationSetter.setNotificationSuccess("Zalogowane", "Udane logowanie")

                dispatch(uiActions.logingToggle())
                TokenService.setUser(data)
                console.log('DISPATCH', data)
                dispatch(authActions.setUserData(data))
            }
        } catch
            (error) {
            notificationSetter.setNotificationError("Wystąpił błąd na serwerze", "Logowanie się nie powiodło")

        }
    }
}


export const register = (username, password, email) => {

    return async (dispatch) => {

        const notificationSetter = new NotificationService(dispatch)

        notificationSetter.setNotificationPending("Rejestracja przebiega...", "Wysyłam dane do rejestracji")

        const sendRequest = async () => {
            const response = await fetch(process.env.REACT_APP_BASE_API_URL + "register",
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},

                    body: JSON.stringify({
                        username: username,
                        password: password,
                        email: email
                    }),
                })

            return response;

        }

        try {
            const response = await sendRequest()
            if (response.status === 409) {
                notificationSetter.setNotificationError("Rejestracja się nie powiodła", "podany mail lub login są już zarejstrowane")
            } else {
                notificationSetter.setNotificationSuccess("Udało się", "Rejestracja się powiodła")

            }

            dispatch(uiActions.registeringToggle())


        } catch (error) {
            notificationSetter.setNotificationError("Rejestracja się nie powiodła", "Błąd serwera")

            dispatch(uiActions.registeringToggle())

        }
    }
}