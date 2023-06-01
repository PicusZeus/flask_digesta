import { getJuristTitulusStats } from "../../../api/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import OperaCoverageChart from "../../charts/OperaCoverageChart/OperaCoverageChart";
import Spinner from "../../UI/spinner/Spinner";
import classes from "./JuristTitulusStats.module.css";

const getJuristTitulusStatsQuery = (jurysta_id, book_id, titulus_id) => {
  return {
    queryKey: ["statystyki", "jurysci", jurysta_id, book_id, titulus_id],
    queryFn: () => getJuristTitulusStats(jurysta_id, book_id, titulus_id),
  };
};
const JuristTitulusStats = () => {
  const params = useParams();

  const { data: stats, isFetching } = useQuery(
    getJuristTitulusStatsQuery(
      params.jurysta_id,
      params.book_id,
      params.titulus_id
    )
  );
  if (isFetching) {
    return <Spinner />;
  }

  return (
    <>
      {stats && (
        <>
          <h1 className={classes.jurist_titulus_stats__title}>
            {stats.author.name}
          </h1>
          <h3 className={classes.jurist_titulus_stats__info}>
            w księdze {stats.titulus.titulus.book.book_nr}
          </h3>
          <h3 className={classes.jurist_titulus_stats__info}>
            w tytule {stats.titulus.titulus.number}
          </h3>
          <h3 className={classes.jurist_titulus_stats__info}>
            {stats.titulus.titulus.title_lat}
          </h3>
          <h4 className={classes.jurist_titulus_stats__info}>
            Wybierz pracę, dla której chcesz poznać statystyki dla całych
            Digestów
          </h4>
          <OperaCoverageChart
            opera={stats.opera}
            book_id={stats.titulus.titulus.book.id}
          />
        </>
      )}
    </>
  );
};

export default JuristTitulusStats;

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const query = getJuristTitulusStatsQuery(
      params.jurysta_id,
      params.book_id,
      params.titulus_id
    );
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
