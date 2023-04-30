import classes from "./Main.module.css"
import {Link} from "react-router-dom";

const Main = () => {

    return (


        <ul className={classes.main_items}>
            <li className={classes.main_item}>
                <section className={classes.main_item__container}>
                    <h1 className={classes.main_item__title}>DIGESTA</h1>
                    <p className={classes.main_item__description}>
                        Digesta Justyniańskie zorganizowane według tradycyjnego podziału na księgi, tytuły, ustawy.
                        Jeśli wiesz czego konkretnie potrzebujesz, lub chcesz się po prostu przeglądać treść digestów, wejdź tutaj.
                        Znajdziesz tutaj pod każdą ustawą odnośniki do autorów poszczególnych ustaw, oraz do ich dzieł.
                    </p>
                    <Link className={classes.main_item_link} to="digesta">Przejdź</Link>
                </section>

            </li>
            <li className={classes.main_item}>
                <section className={classes.main_item__container}>
                    <h1 className={classes.main_item__title}>JURYŚCI</h1>

                    <p className={classes.main_item__description}>
                        Spis jurystów, których prace zawarte są w digestach. Dla każdego z jurystów dostępna jest lista cytowanych
                        w digestach ich prac, jak również spis ustaw zawartych w Digestach, w których je wykorzystano.
                    </p>

                    <Link className={classes.main_item_link} to="jurysci">Przejdź</Link>
                </section>
            </li>
            <li className={classes.main_item}>
                <section className={classes.main_item__container}>
                    <h1 className={classes.main_item__title}>DZIAŁA JURYSTÓW</h1>

                    <p className={classes.main_item__description}>
                        Spis wszystkich dzieł prawniczych, które posłużyły do kompilacji Digestów Justyniana.
                    </p>
                    <Link className={classes.main_item_link} to="opera">Przejdź</Link>
                </section>
            </li>

            <li className={classes.main_item}>
                <section className={classes.main_item__container}>
                    <h1 className={classes.main_item__title}>WYSZUKAJ</h1>

                    <p className={classes.main_item__description}>
                        Tutaj wyszukasz w tekście digestów interesujących cię terminów lub fraz.
                    </p>
                    <Link className={classes.main_item_link} to="Wyszukaj">Przejdź</Link>
                </section>
            </li>

        </ul>


    )
}

export default Main