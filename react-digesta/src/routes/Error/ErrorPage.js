import {useRouteError} from "react-router-dom";
import MenuBar from "../../components/UI/menuBar/MenuBar";
import Footer from "../../components/UI/footer/Footer";

const ErrorPage = () => {
    const error = useRouteError()
    const errorCode = error.status
    let message
    if (error.message) {
        message = error.message
    }

    return (
        <>
            <MenuBar/>
            <section>
                <h2>Coś poszło nie tak</h2>
                <h1>{errorCode}</h1>
                <h2>{message}</h2>

            </section>

            <Footer/>
        </>


    )
}

export default ErrorPage