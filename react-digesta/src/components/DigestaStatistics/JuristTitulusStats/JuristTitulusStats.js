import {getJuristTitulusStats} from "../../../api/api";

const getJuristTitulusStatsQuery = (jurysta_id, book_id, titulus_id) => {
    return {
        queryKey: [],
        queryFn: getJuristTitulusStats(jurysta_id, book_id, titulus_id)
    }
}
const JuristTitulusStats = () => {

    return <div>TITULIS JURIST</div>
}

export default JuristTitulusStats