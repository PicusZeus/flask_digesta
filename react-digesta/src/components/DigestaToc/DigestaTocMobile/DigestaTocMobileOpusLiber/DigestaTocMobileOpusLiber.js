import {useEffect, useState} from "react";
import TocMobile from "../../../UI/TocMobile/TocMobile";
import {useNavigate} from "react-router-dom";


const DigestaTocMobileOpusLiber = ({liber, lexPath}) => {
    const [leges, setLeges] = useState([])
    const urlLoadLeges = process.env.REACT_APP_BASE_API_URL + `digesta/opus/leges/${liber.id}`
    const navigate = useNavigate()
    useEffect(() => {
        const sendRequest = async () => {
            const response = await fetch(urlLoadLeges)
            if (!response.ok) {
                throw new Error()
            }
            return await response.json()
        }
        sendRequest().then((response)=>{
            setLeges(response)
        }).catch(e=>(console.log(e)))
    }, [urlLoadLeges])

    const onChoseLexHandler = event => {
        const lex_id = event.target.value
        navigate(lexPath + lex_id.toString())
    }

    return (
        <TocMobile onOption={onChoseLexHandler}>
            <option value={''}>Wybierz fragment</option>
            {leges.map(lex => (
                <option key={lex.id} value={lex.id}>
                    {"D." + lex.titulus.book.book_nr + "." + lex.titulus.number + "." + lex.lex_nr}
                </option>)
            )}
        </TocMobile>
    )
}

export default DigestaTocMobileOpusLiber