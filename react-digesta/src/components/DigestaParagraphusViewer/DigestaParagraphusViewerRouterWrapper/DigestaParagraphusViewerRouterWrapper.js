import DigestaParagraphusViewer from "../DigestaParagraphusViewer";
import {json, useParams} from "react-router-dom";
import api from "../../../api/api";
import {useQuery} from "@tanstack/react-query";



const getParagraph = (id) => {
    return api.get("digesta/paragraphi/" + id)
        .then(response => {return response.data}
    ).catch(()=>{
        throw json(
            {message: "Nie udało się załadować danych dla tego paragrafu"},
            {status: 500}
        )
        })
}

const getParagraphQuery = (id) => {
    return {
        queryKey: ["digesta", "paragraphi", id],
        queryFn: ()=>getParagraph(id),
        staleTime: Infinity
    }
}



const DigestaParagraphusViewerRouterWrapper = () => {

    const params = useParams()
    const paragraphId = params.paragraphus_id
    const { data: paragraphus } = useQuery(getParagraphQuery(paragraphId))
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