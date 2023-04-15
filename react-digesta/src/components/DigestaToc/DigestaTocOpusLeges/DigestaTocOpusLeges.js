import DigestaTocOpusLex from "./DigestaTocOpusLex/DigestaTocOpusLex";


const DigestaTocOpusLeges = (props) => {


    return (
        <ul>
            {props.leges.map((lex)=>{return <DigestaTocOpusLex key={lex.id} lex_id={lex.id}/>})}
        </ul>
    )
}

export default DigestaTocOpusLeges