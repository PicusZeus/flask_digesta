import PageContent from "../../components/PageContent/PageContent";
import {Link, useRouteError} from "react-router-dom";
import MenuBar from "../../components/UI/menuBar/MenuBar";
import Footer from "../../components/UI/footer/Footer";

const ErrorPage = () => {
    const error = useRouteError()
    const errorCode = error.status
    let message
    if (error.data.message) {
        message = error.data.message
    }

    return (
        <>
            <MenuBar/>
            <PageContent title="nie udało się">
                <div>ERROR</div>
                <h1>{errorCode}</h1>
                <h2>{message}</h2>

            </PageContent>
            <Footer/>
        </>


    )
}

export default ErrorPage