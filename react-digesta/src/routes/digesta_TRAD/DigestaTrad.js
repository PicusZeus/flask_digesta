import classes from "./DigestaTrad.module.css";
import DigestaToc from "../../components/DigestaToc/DigestaToc";


const DigestaTrad = () => {

    return (
        <>
            <h1 className={classes.main_digesta}>Digesta - po spisie treści</h1>
            <DigestaToc/>

        </>
    )
}

export default DigestaTrad