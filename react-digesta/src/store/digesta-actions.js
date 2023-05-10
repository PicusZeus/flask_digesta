import {digestaActions} from "./digesta-slice";
import NotificationService from "../services/notification.service";

//
// export const loadJurists = () => {
//     return async (dispatch) => {
//         const notificationSetter = new NotificationService(dispatch)
//         const loadingJurists = async () => {
//             const response = await fetch(process.env.REACT_APP_BASE_API_URL + "authors")
//
//             if (!response.ok) {
//                 throw new Error('sth went wrong')
//
//             }
//
//             const data = await response
//             return data.json()
//         }
//
//         try {
//             const jurists = await loadingJurists();
//             dispatch(digestaActions.setJurists(jurists))
//         } catch (error) {
//             notificationSetter.setNotificationError('Spis Jurystów', "nie udało się załadować spisu Jurystów")
//
//         }
//     }
// }
//
//


