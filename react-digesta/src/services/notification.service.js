import {uiActions} from "../store/ui-slice";


class NotificationService {
    constructor(dispatch) {
        this.dispatch = dispatch
    }
    setNotificationSuccess(title, message) {
        this.dispatch(uiActions.setNotification({
            status: "success",
            title: title,
            message: message,

        }))
        setTimeout(() => this.dispatch(uiActions.resetNotification()), 2000)

    }

    setNotificationPending(title, message) {
        this.dispatch(uiActions.setNotification({
            status: "pending",
            title: title,
            message: message,
        }))
        setTimeout(() => this.dispatch(uiActions.resetNotification()), 2000)

    }

    setNotificationError(title, message) {
        this.dispatch(uiActions.setNotification({
            status: "error",
            title: title,
            message: message,
        }))
        setTimeout(() => this.dispatch(uiActions.resetNotification()), 2000)

    }
}

export default NotificationService