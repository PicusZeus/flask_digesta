import {Outlet, useParams} from "react-router-dom";
import DigestaToc from "../../../components/DigestaToc/DigestaToc";
import {useSelector} from "react-redux";
import DigestaTocOpera from "../../../components/DigestaToc/DigestaTocOpera/DigestaTocOpera";
import {Link} from "react-router-dom";
const DigestaSingleJurist = () => {
    const param = useParams()

    const toc = useSelector(state => state.digesta.TOC)


    const juristId = param.jurysta_id
    let juristToc
    const prepareToc = (id, toc) => {
        const newToc = {
            ...toc,
            "tituli": []
        }

        for (const titulus_ind in toc.tituli) {
            const newTitulus = {...toc.tituli[titulus_ind], 'leges': []}
            const newLeges = toc.tituli[titulus_ind].leges.filter((lex) => {
                return lex.author_id === id
            })
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

    const path = "digesta/" + juristId

    return (
        <div>
            <h1>
                {juristId}
            </h1>

            <Link to={path}>w digestach</Link>
            {/*{juristToc && <DigestaToc toc={juristToc}/>}*/}

            <button>według cytowanych w digestach prac</button>
            <DigestaTocOpera juristId={juristId}/>
            <Outlet/>

        </div>
    )
}

export default DigestaSingleJurist