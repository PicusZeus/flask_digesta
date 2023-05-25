import classes from "./DigestaStats.module.css"
import {Link, Outlet} from "react-router-dom";

const DigestaStats = () => {


    return (
        <div className={classes.main}>

            <h1>Ta część strony poświęcona jest statystykom dotyczącym Digestów i autorów oraz ich prac cytowanych w tym
                dziele.</h1>
            <h3>Zaczynając od podstaw</h3>
            <h4>Digesta składają się z:</h4>
            <ul>

                <li>Digesta składają się z 50 ksiąg</li>
                <li>z 432 tytułów</li>
                <li>z 9142 ustaw</li>
                <li>z 21084 paragrafów</li>


            </ul>

            <h4>Oryginalny tekst Digestów obejmuje (bez tytułów i adresów)</h4>
                <ul>
                    <li>z 8394355 słów</li>
                   <li>z około 5588000 znaków</li>
                </ul>

            <h4>W Digestach cytowanych jest 54 jurystów</h4>
            <p> Należy jednak nadmienić, że niektóre imiona pomniejszych Jurystów mogą odnosić się do tego samego Jurysty</p>

            <h4>W digestach zacytowano 384 prace jurystów</h4>
            <p>Tutaj jeszcze bardziej prawdopodobne jest, że wiele prac o podobnych tytułach mogą odnosić się do tego samego dzieła. Co więcej wydaje się, że wiele cytowań pochodzi nie bezpośrednio z danych prac, ale zostały przeniesione z kilku głównych wcześniejszych kompilacji.</p>


            <div>Łaciński tekst digestów (bez adresów) składa się z około 5588000 znaków</div>


            Poniżej znajdują się szczegółowe statystyki mówiące o objętościowym udziale ksiąg, tytułów, jurystów i ich
            dzieł w Digestach, w księgach i tytułach
            <button><Link to="digesta">Digesta</Link></button>


            <button><Link to="jurysci">Juryści</Link></button>
            <button><Link to="opera">Opera</Link></button>

            <Outlet/>

        </div>
    )
}

export default DigestaStats