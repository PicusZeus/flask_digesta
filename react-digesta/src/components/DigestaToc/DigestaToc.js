import {useSelector} from "react-redux";
import DigestaTitulus from "./DigestaTitulus/DigestaTitulus";


const DigestaToc = () => {
    const toc = useSelector((state) => state.digesta.TOC)
    console.log(toc, 'TOC')

    const tituli = toc.tituli.map((titulus) => {
        return <DigestaTitulus title_pl={titulus.title_pl}
                               title_lat={titulus.title_lat}
                               leges={titulus.leges}
                                numerus={titulus.number}
                                key={titulus.id}/>
    })

    return (
        <ul>
            {toc.book_latin_name}
            {tituli}

        </ul>
    )
}

export default DigestaToc