
import classes from "./DigestaStats.module.css"
import {Link, Outlet} from "react-router-dom";
const DigestaStats = () => {



    return (
        <div className={classes.main}>stats

            <button><Link to="digesta">Digesta</Link></button>



            <button><Link to="jurysci">Juryści</Link></button>
            <button><Link to="opera">Opera</Link></button>

            <Outlet/>

        </div>
    )
}

export default DigestaStats