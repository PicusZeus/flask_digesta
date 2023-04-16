import Footer from "../../components/UI/footer/Footer.js";
import MenuBar from "../../components/UI/menuBar/MenuBar.js";
import {Outlet} from "react-router-dom";


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