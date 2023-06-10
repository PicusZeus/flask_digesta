import { getOpusStats } from "../../../api/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import BooksOpusCoverage from "../../charts/BooksOpusCoverage/BooksOpusCoverage";
import Spinner from "../../UI/spinner/Spinner";
import classes from "./OpusStats.module.css";
import { createGenJuristName } from "../../../services/helpers";

const getOpusStatsQuery = (id) => {
  return {
    queryKey: ["stats", "digesta", "opus", id],
    queryFn: () => getOpusStats(id),
  };
};

const OpusStats = () => {
  const params = useParams();
  const { data: stats, isFetching } = useQuery(
    getOpusStatsQuery(params.opus_id)
  );

  if (isFetching) {
    return <Spinner />;
  }
  const genJuristName = createGenJuristName(stats.opus.author.name);
  return (
    <>
      <h1 className={classes.opus_stats__title}>
        {stats.opus.title_lat} {genJuristName}
      </h1>
      <h3 className={classes.opus_stats__info}>
        Wybierz księgę, dla której chcesz zobaczyć udział tej pracy w tytułach
      </h3>
      {stats && <BooksOpusCoverage books={stats.books} />}
    </>
  );
};
export default OpusStats;

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const query = getOpusStatsQuery(params.opus_id);
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
