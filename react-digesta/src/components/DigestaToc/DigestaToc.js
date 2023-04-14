import DigestaTitulus from "./DigestaTitulus/DigestaTitulus";


const DigestaToc = (props) => {
    const toc = props.toc


    return (
        <ul>
            {toc &&
                toc.tituli.map((titulus) => {
                    return <DigestaTitulus title_pl={titulus.title_pl}
                                           title_lat={titulus.title_lat}
                                           leges={titulus.leges}
                                           numerus={titulus.number}
                                           key={titulus.id}/>
                })
            }


        </ul>
    )
}

export default DigestaToc