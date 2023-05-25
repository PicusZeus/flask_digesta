import DigestaParagraphusViewer from "../DigestaParagraphusViewer";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getParagraph} from "../../../api/api";
import Spinner from "../../UI/spinner/Spinner";


const getParagraphQuery = (id) => {
    return {
        queryKey: ["digesta", "paragraphi", id],
        queryFn: () => getParagraph(id),
        staleTime: Infinity
    }
}


const DigestaParagraphusViewerRouterWrapper = () => {

    const params = useParams()
    const paragraphId = params.paragraphus_id
    const {data: paragraphus, isFetching} = useQuery(getParagraphQuery(paragraphId))
    if (isFetching) {
        return <Spinner/>
    }

    return (
        <DigestaParagraphusViewer paragraphus={paragraphus}/>
    )
}

export default DigestaParagraphusViewerRouterWrapper

export const loader = (queryClient) => async ({params}) => {
    const query = getParagraphQuery(params.paragraphus_id)
    return (
        queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))
    )
}