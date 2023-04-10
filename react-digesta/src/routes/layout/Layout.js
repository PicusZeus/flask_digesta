import classes from "./Layout.module.css"
import Footer from "../../components/UI/footer/Footer.js";
import MenuBar from "../../components/UI/menuBar/MenuBar.js";
import { Outlet } from "react-router-dom";

const Layout = (props) => {
    return (
        <>
            <div>HELLO</div>
            <MenuBar/>
            <main className={classes.main}>
                <Outlet/>
            </main>
            <Footer/>
        </>

    )
}
export default Layout