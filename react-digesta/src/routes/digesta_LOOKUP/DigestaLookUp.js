import classes from "./DigestaLookUp.module.css";
import {json} from "react-router-dom";
import DigestaSearch from "../../components/DigestaSearch/DigestaSearch";
import {useActionData} from "react-router-dom";
import DigestaTocSearchLeges from "../../components/DigestaToc/DigestaTocSearchLeges/DigestaTocSearchLeges";

const DigestaLookUp = () => {
    const paragraphi = useActionData()

    return (
        <>
            <h1 className={classes.main_lookup}>Digesta Wyszukaj</h1>
            <DigestaSearch language="oryginalnym" lang="lat"></DigestaSearch>
            <DigestaSearch language="polskim" lang="pl"></DigestaSearch>
            {paragraphi && <DigestaTocSearchLeges paragraphi={paragraphi}/>}
        </>
    )
}

export default DigestaLookUp


export const action = async ({request, params}) => {
    const data = await request.formData()
    const searched_term = data.get("searched_term")
    const eventData = { searched_term: searched_term }
    const lang = data.get("language")
    const response = await fetch("http://127.0.0.1:5001/digesta/" + lang, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"

        },
        body: JSON.stringify(eventData)
    })
    if (!response.ok) {
        throw json({message: "sth get wrong"},
            {status: 500}
            )
    } else {
        const data = await response
        return data.json()
    }


}