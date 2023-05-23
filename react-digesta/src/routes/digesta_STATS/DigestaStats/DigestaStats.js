
import classes from "./DigestaStats.module.css"
import {Link, Outlet} from "react-router-dom";
const DigestaStats = () => {



    return (
        <div className={classes.main}>
            <div>Digesta składają się z 50 ksiąg</div>
            <div>z 432 tytułów</div>
            <div>z 9142 ustaw</div>
            <div>z 21084 paragrafów</div>

            <div>wykorzystano prace 54 (do zmiany) jurystów</div>
            <div>zacytowano 384 prace prawnicze (choć z pewnością kilka tytułów odnosi się do tych samych prac)</div>

            <div>Łaciński tekst digestów (bez adresów) składa się z około 5588000 znaków</div>
            <div>z 8394355 słów</div>

            Poniżej znajdują się szczegółowe statystyki mówiące o objętościowym udziale ksiąg, tytułów, jurystów i ich dzieł w Digestach, w księgach i tytułach
            <button><Link to="digesta">Digesta</Link></button>



            <button><Link to="jurysci">Juryści</Link></button>
            <button><Link to="opera">Opera</Link></button>

            <Outlet/>

        </div>
    )
}

export default DigestaStats