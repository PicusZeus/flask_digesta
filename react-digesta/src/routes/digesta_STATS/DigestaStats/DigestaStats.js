import classes from "./DigestaStats.module.css"
import {Link, Outlet} from "react-router-dom";

const DigestaStats = () => {


    return (
        <div className={classes.main}>

            <h1 className={classes.main_title}>Ta część strony poświęcona jest statystykom dotyczącym Digestów i autorów oraz ich prac cytowanych w tym
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

            <p>Tekst oryginalny to w przeważającej części łacina, jednak 20 ustaw jest w całości po grecku</p>
            <ul>
                <li>D.1.4.4</li>
                <li>D.14.2.9</li>
                <li>D.19.2.49</li>

                <li>D.26.3.1</li>
                <li>D.26.5.21</li>

                <li>D.26.5.22</li>
                <li>D.27.1.1</li>

                <li>D.27.1.2</li>

                <li>D.27.1.4</li>
                <li>D.27.1.6</li>

                <li>D.27.1.8</li>

                <li>D.27.1.10</li>

                <li>D.27.1.12</li>
                <li>D.27.1.13</li>

                <li>D.27.1.14</li>
                <li>D.27.1.15</li>

                <li>D.36.1.15</li>
                <li>D.43.10.1</li>

                <li>D.50.1.35</li>
                <li>D.50.16.104</li>


            </ul>
            <p>Natomiast w 166 greka występuje</p>
            <h4>W Digestach cytowanych jest 54 jurystów</h4>
            <p> Należy jednak nadmienić, że niektóre imiona pomniejszych Jurystów mogą odnosić się do tego samego
                Jurysty</p>

            <h4>W digestach zacytowano 384 prace jurystów</h4>
            <p>Tutaj jeszcze bardziej prawdopodobne jest, że wiele prac o podobnych tytułach mogą odnosić się do tego
                samego dzieła. Co więcej wydaje się, że wiele cytowań pochodzi nie bezpośrednio z danych prac, ale
                zostały przeniesione z kilku głównych wcześniejszych kompilacji.</p>





            Jeśli chcesz poznać szczegółowe statystyki dotyczące udziału poszczególnych ksiąg, tytułów, jurystów i ich
            dzieł w Digestach, w księgach i tytułach, przejdź do odpowiedniej sekcji.
            <button><Link to="digesta">Digesta</Link></button>


            <button><Link to="jurysci">Juryści</Link></button>
            <button><Link to="opera">Opera</Link></button>

            <Outlet/>

        </div>
    )
}

export default DigestaStats