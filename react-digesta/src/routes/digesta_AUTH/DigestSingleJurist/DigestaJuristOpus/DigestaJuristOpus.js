import {Outlet, useLoaderData} from "react-router-dom";
import {json} from "react-router-dom"
import DigestaTocOpusLeges from "../../../../components/DigestaToc/DigestaTocOpusLeges/DigestaTocOpusLeges";

const DigestaJuristOpus = () => {
    const opus = useLoaderData()

    return (
        <>
        <div> {opus && opus.title_lat} </div>
            <DigestaTocOpusLeges leges={opus.leges}/>
            <Outlet/>

        </>

    )
}

export default DigestaJuristOpus



export async function loader({ params, request }) {
  const id = params.opus_id;
  const response = await fetch("http://127.0.0.1:5001/opera/" + id, {
    method: request.method,
  });

  if (!response.ok) {
    throw json(
      { message: 'could not load.' },
      {
        status: 500,
      }
    );
  } else {
      const data = await response
      return data.json()
  }

}