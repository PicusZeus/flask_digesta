import {Outlet, useParams} from "react-router-dom";
import {Link} from "react-router-dom";
const DigestaSingleJurist = () => {
    const param = useParams()

    const juristId = param.jurysta_id

    const pathDigestaJurist = "digesta/" + juristId
    const pathOperaJurist = "opera/" + juristId

    return (
        <div>
            <h1>
                {juristId}
            </h1>

            <Link to={pathDigestaJurist}><button>w digestach</button></Link>

            <Link to={pathOperaJurist}><button>według cytowanych w digestach prac</button></Link>

            <Outlet/>

        </div>
    )
}

export default DigestaSingleJurist