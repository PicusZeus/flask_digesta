import {uiActions} from "./ui-slice";
import {authActions} from "./auth-slice";
import TokenService from "../services/token.service";
import tokenService from "../services/token.service";
import NotificationService from "../services/notification.service";
import api from "../api/api";
import notificationService from "../services/notification.service";

export const logout = (token) => {
    return async (dispatch) => {
        const notificationSetter = new NotificationService(dispatch);

        const sendRequest = async () => {
            return await api.get("logout", {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            });
        };
        sendRequest()
            .then((response) => {
                notificationSetter.setNotificationSuccess(
                    "wylogowano",
                    "Wylogowanie się powiodło"
                );
                tokenService.removeUser();
                dispatch(authActions.resetToken());
            })
            .catch((error) => {
                notificationSetter.setNotificationSuccess(
                    "wylogowano",
                    "Wylogowanie się powiodło"
                );
                tokenService.removeUser();
                dispatch(authActions.resetToken());
            });
    };
};

export const refreshToken = (refresh_token) => {
    return async (dispatch) => {
        const notificationSetter = new notificationService(dispatch);
        const sendRequest = async () => {
            return await api.post(
                "refresh",
                {},
                {
                    headers: {
                        Authorization: "Bearer " + refresh_token,
                        "Content-Type": "application/json",
                    },
                }
            );
        };
        sendRequest()
            .then((response) => {
                const access_token = response.data.access_token;
                tokenService.updateLocalAccessToken(access_token);
            })
            .catch((e) => {
                notificationSetter.setNotificationError("Refreshing", e.message.error);
            });
    };
};

export const loggingIn = (username, password) => {
    return async (dispatch) => {
        const notificationSetter = new NotificationService(dispatch);

        notificationSetter.setNotificationPending(
            "wysyłam...",
            "Wysyłam dane do logowania"
        );

        const sendRequest = async () => {
            return await api.post(
                "login",
                {
                    username: username,
                    password: password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        };

        sendRequest()
            .then((response) => {
                notificationSetter.setNotificationSuccess(
                    "Logowanie",
                    "Logowanie się powiodło"
                );
                dispatch(uiActions.logingToggle());
                TokenService.setUser(response.data);
                dispatch(authActions.setUserData(response.data));
            })
            .catch((e) => {
                if (e.response.status === 401) {
                    notificationSetter.setNotificationError(
                        "Niepoprawne dane",
                        "Nieudane logowanie"
                    );
                } else {
                    notificationSetter.setNotificationError(
                        "Nieudane logowanie",
                        "Błąd serwera"
                    );
                }
                dispatch(uiActions.logingToggle());
            });
    };
};

export const register = (username, password, email) => {
    return async (dispatch) => {
        const notificationSetter = new NotificationService(dispatch);

        notificationSetter.setNotificationPending(
            "Rejestracja rozpoczęta...",
            "Wysyłam dane do rejestracji"
        );

        const sendRequest = async () => {
            return await api.post(
                "register",
                {
                    username: username,
                    password: password,
                    email: email,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        };

        sendRequest()
            .then((response) => {
                notificationSetter.setNotificationSuccess(
                    "Sukces!",
                    "Rejestracja powiodła się"
                );
                dispatch(uiActions.registeringToggle());
            })
            .catch((e) => {
                if (e.response.status === 409) {
                    notificationSetter.setNotificationError(
                        "Błąd",
                        "Nazwa użytkownika lub email są już zarejestrowane"
                    );
                } else {
                    notificationSetter.setNotificationError("Błąd", "Błąd serwera");
                }
                dispatch(uiActions.registeringToggle());
            });
    };
};
