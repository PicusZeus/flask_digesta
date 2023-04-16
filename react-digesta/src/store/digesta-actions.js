import {digestaActions} from "./digesta-slice";

export const loadTOC = () => {
    return async (dispatch) => {

        const loadingToc = async () => {
            const response = await fetch("http://127.0.0.1:5001/digesta/book/1")

            if (!response.ok) {
                throw new Error('nie powiodło się')
            }

            const data = await response

            return data.json()
        };

        try {
            const data = await loadingToc()
            dispatch(digestaActions.setTOC(data))

        } catch (error) {
            console.log(error)
        }
    };

}


export const loadJurists = () => {
    return async (dispatch) => {
        const loadingJurists = async () => {
            const response = await fetch("http://127.0.0.1:5001/authors")

            if (!response.ok) {
                throw new Error('sth went wrong')
            }

            const data = await response
            return data.json()
        }

        try {
            const jurists = await loadingJurists();
            dispatch(digestaActions.setJurists(jurists))
        } catch (error) {
            console.log(error)
        }
    }
}

