import DigestaTocMobileOpus from "../DigestaTocMobileOpus/DigestaTocMobileOpus";
import {useState} from "react";
import TocMobile from "../../../UI/TocMobile/TocMobile";

const DigestaTocMobileOpera = ({opera, lexPath}) => {

    const [opusId, setOpusId] = useState(false)

    const opus = opera.filter((opus)=>opus.id === opusId).find(e=>true)
    const onOptionChangeHandler = (event) => {

        setOpusId(parseInt(event.target.value))

    }
    return (
        <>
            <TocMobile onOption={onOptionChangeHandler}>

                <option value={''}>Wybierz dzieło</option>
                {opera && opera.map(opus => {
                    return (<option key={opus.id} value={opus.id}>
                        Libri {opus.title_lat} - {opus.author.name}
                    </option>)
                })}

            </TocMobile>
            {opus && <DigestaTocMobileOpus opusId={opusId} opus={opus} lexPath={lexPath}/>}

        </>
    )
}

export default DigestaTocMobileOpera