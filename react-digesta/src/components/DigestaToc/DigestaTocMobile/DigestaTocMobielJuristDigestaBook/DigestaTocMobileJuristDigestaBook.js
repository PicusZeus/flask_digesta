import TocMobile from "../../../UI/TocMobile/TocMobile";
import {useState} from "react";
import {useEffect} from "react";
import DigestaTocMobileJuristDigestaTitulus
    from "../DigestaTocMobileJuristDigestaTitulus/DigestaTocMobileJuristDigestaTitulus";

const DigestaTocMobileJuristDigestaBook = ({book_id, author_id}) => {
    const [tituli, setTituli] = useState([])
    const [titulusId, setTitulusId] = useState(false)
    const onOptionChangeHandler = (event) => {
        setTitulusId(event.target.value)
    }
    useEffect(() => {
        const urlLoadTituli = process.env.REACT_APP_BASE_API_URL + `digesta/tituli/author/${book_id}/${author_id}`

        const sendRequest = async () => {
            const response = await fetch(urlLoadTituli)
            if (!response.ok) {
                throw new Error()
            }
            return await response.json()
        }
        sendRequest().then((response) => {

            setTituli(response)
        }).catch((e) => (console.log(e)))
    }, [book_id, author_id])

    return (
        <>
            <TocMobile onOption={onOptionChangeHandler}>

                <option value={''}>Wybierz Tytuł</option>

                {tituli && tituli.map(titulus => (
                    <option key={titulus.id} value={titulus.id}>{titulus.number} {titulus.title_lat}</option>))}
                })}
            </TocMobile>
            {titulusId && <DigestaTocMobileJuristDigestaTitulus author_id={author_id} titulus_id={titulusId}/>}
        </>
    )
}
export default DigestaTocMobileJuristDigestaBook

