import classes from "./Main.module.css"
import {Link} from "react-router-dom";

const Main = () => {

    return (


        <ul className={classes.main_items}>
            <li className={classes.main_item}>
                <section className={classes.main_item__container}>
                    <h1 className={classes.main_item__title}>DIGESTA</h1>
                    <p className={classes.main_item__description}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A cumque doloribus dolorum illum ipsam
                        magnam maiores molestias, mollitia nihil repellendus! Illum optio ratione sit ut? Alias aperiam
                        distinctio minima odio?
                    </p>
                    <Link className={classes.main_item_link} to="digesta">Przejdź</Link>
                </section>

            </li>
            <li className={classes.main_item}>
                <section className={classes.main_item__container}>
                    <h1 className={classes.main_item__title}>JURYŚCI</h1>

                    <p className={classes.main_item__description}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet earum incidunt necessitatibus
                        obcaecati officiis placeat quas reprehenderit velit voluptate. Accusamus esse excepturi facere
                        iure nobis officia perferendis placeat ut velit.
                    </p>

                    <Link className={classes.main_item_link} to="jurysci">Przejdź</Link>
                </section>
            </li>
            <li className={classes.main_item}>
                <section className={classes.main_item__container}>
                    <h1 className={classes.main_item__title}>WYSZUKAJ</h1>

                    <p className={classes.main_item__description}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi culpa doloribus dolorum ex
                        excepturi fugit illum ipsum, iure laboriosam maiores nobis qui quo quos recusandae repellat
                        soluta velit vero voluptate!
                    </p>
                    <Link className={classes.main_item_link} to="Wyszukaj">Przejdź</Link>
                </section>
            </li>

        </ul>


    )
}

export default Main