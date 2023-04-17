import {Outlet} from "react-router-dom";
import Footer from "../../components/UI/footer/Footer.js";
import MenuBar from "../../components/UI/menuBar/MenuBar.js";
import classes from "./Layout.module.css"

const Layout = () => {

    return (
        <>
            <MenuBar/>
            <main className={classes}>
                <Outlet/>
            </main>
            <Footer/>
        </>

    )
}
export default Layout