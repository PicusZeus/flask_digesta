import classes from "./DigestaLookUp.module.css";
import {json} from "react-router-dom";
import DigestaSearch from "../../components/DigestaSearch/DigestaSearch";
import {useActionData} from "react-router-dom";
import DigestaTocSearchParagraphs from "../../components/DigestaToc/DigestaTocSearchParagraphs/DigestaTocSearchParagraphs";

const DigestaLookUp = () => {
    const data = useActionData()
    console.log(data, 'DATA')
    // const paragraphi = data.paragraphi
    // const searched_term = data.searched_term


    return (
        <>
            <h1 className={classes.main_lookup}>Digesta Wyszukaj</h1>
            <DigestaSearch language="oryginalnym" lang="lat"></DigestaSearch>
            <DigestaSearch language="polskim" lang="pl"></DigestaSearch>
            {data && <DigestaTocSearchParagraphs paragraphi={data.paragraphi} lang={data.lang} searchedTerm={data.searched_term}/>}
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
        const data = await response.json()
        console.log(lang, 'inside')
        return {paragraphi: data, searched_term:searched_term, lang:lang}
    }


}