import {Link} from "react-router-dom";
import {useState} from "react";
import DigestaLexViewer from "../../DigestaLexViewer/DigestaLexViewer";
const DigestaTocSearchLeges = (props) => {

    const [chosenLex, setChosenLex] = useState(null)
    let toc

    console.log(props.leges, 'inside')
    toc = props.leges.map(lex=>{return <li><button onClick={()=>setChosenLex(lex)}>księga {lex.book.id}
                                                tytuł {lex.titulus.number}
                                                ustawa {lex.lex_nr}</button></li>})

    return (
        <>
        <div>links leges</div>
            <ul>
                {toc}
            </ul>

            {chosenLex && <DigestaLexViewer lex={chosenLex}/>}

            {/*{props.leges.map(lex=>{return (<div>lex</div>)})}*/}
        </>

    )
}

export default DigestaTocSearchLeges