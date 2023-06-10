import { getOpusBookStats } from "../../../api/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import TituliCoverage from "../../charts/TituliCoverage/TituliCoverage";
import Spinner from "../../UI/spinner/Spinner";
import classes from "./OpusBookStats.module.css";
import { createGenJuristName } from "../../../services/helpers";

const getOpusBookStatsQuery = (opus_id, book_id) => {
  return {
    queryKey: ["stats", "digesta", "opera", opus_id, book_id],
    queryFn: () => getOpusBookStats(opus_id, book_id),
  };
};
const OpusBookStats = () => {
  const params = useParams();

  const { data: stats, isFetching } = useQuery(
    getOpusBookStatsQuery(params.opus_id, params.book_id)
  );
  if (isFetching) {
    return <Spinner />;
  }
  const genJuristName = createGenJuristName(stats.opus.author.name);

  return (
    <>
      <h1 className={classes.opus_book_stats__title}>
        {stats.opus.title_lat} {genJuristName} w księdze {stats.book.book_nr}
      </h1>
      <h3 className={classes.opus_book_stats__info}>
        Wybierz tytuł i zobacz jego zawartość dla {genJuristName}
      </h3>
      {stats && (
        <TituliCoverage
          tituli={stats.tituli}
          book_id={stats.book.id}
          jurysta_id={stats.opus.author.id}
        />
      )}
    </>
  );
};

export default OpusBookStats;

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const query = getOpusBookStatsQuery(params.opus_id, params.book_id);
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
