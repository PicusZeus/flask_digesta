import {useLocation} from "react-router-dom";
import DigestaToc from "../../../components/DigestaToc/DigestaToc";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import DigestaTocOpera from "../../../components/DigestaToc/DigestaTocOpera/DigestaTocOpera";

const DigestaSingleJurist = () => {
    const location = useLocation()

    const toc = useSelector(state => state.digesta.TOC)


    const juristId = parseInt(location.pathname.split('/').pop())
    let juristToc
    const prepareToc = (id, toc) => {
        const newToc = {
            ...toc,
            "tituli": []
        }

        for (const titulus_ind in toc.tituli) {
            const newTitulus = {...toc.tituli[titulus_ind], 'leges': []}
            const newLeges = toc.tituli[titulus_ind].leges.filter((lex)=>{return lex.author_id === id})
            if (newLeges.length > 0) {
                newTitulus.leges = newLeges
                newToc.tituli.push(newTitulus)
            }
        }
        return newToc
    }
    if (toc) {
            juristToc = prepareToc(juristId, toc)
    }


    return (
        <div>
            <h1>
                {juristId}
            </h1>

            <button>w digestach</button>
            {juristToc && <DigestaToc toc={juristToc}/>}

            <button>według cytowanych w digestach prac</button>
            <DigestaTocOpera juristId={juristId}/>

        </div>
    )
}

export default DigestaSingleJurist