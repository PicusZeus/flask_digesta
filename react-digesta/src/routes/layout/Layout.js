import classes from "./Layout.module.css"
import Footer from "../../components/UI/footer/Footer.js";
import MenuBar from "../../components/UI/menuBar/MenuBar.js";
import {Outlet} from "react-router-dom";
import Notification from "../../components/UI/Notification/Notification";
import {useSelector} from "react-redux";


const Layout = (props) => {

    return (
        <>

            <MenuBar/>

            <Outlet/>

            <Footer/>
        </>

    )
}
export default Layout