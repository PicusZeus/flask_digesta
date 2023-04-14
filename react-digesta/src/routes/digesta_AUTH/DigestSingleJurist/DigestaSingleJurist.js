import {useLocation} from "react-router-dom";


const DigestaSingleJurist = () => {
    const location = useLocation()

    const jurist_name = location.pathname.split('/').pop()
    return (
        <div>
            <button>w digestach</button>
            <button>według cytowanych w digestach prac</button>
            {jurist_name}
        </div>
    )
}

export default DigestaSingleJurist