import { getDigestaStats } from "../../../api/api";
import { useQuery } from "@tanstack/react-query";
import BooksShareChart from "../../../components/charts/BooksShareChart/BooksShareChart";
import Spinner from "../../../components/UI/spinner/Spinner";
import classes from "./DigestaStatsDigesta.module.css";

const getDigestaStatsQuery = () => {
  return {
    queryKey: ["stats", "digesta", "books"],
    queryFn: getDigestaStats,
  };
};
const DigestaStatsDigesta = () => {
  const { data: stats, isFetching } = useQuery(getDigestaStatsQuery());
  if (isFetching) {
    return <Spinner />;
  }
  return (
    <>
      <h1 className={classes.digesta_stats__title}>Digesta seu Pandecta</h1>
      <h2 className={classes.digesta_stats__info}>
        Digesta składają się z 50 ksiąg o różnej długości.
      </h2>
      <h3 className={classes.digesta_stats__info}>
        Wybierz księgę, dla której chcesz poznać dalsze statystyki.
      </h3>
      <div className={classes.digesta_stats__chart}>
        {stats && <BooksShareChart books={stats} />}
      </div>
    </>
  );
};

export default DigestaStatsDigesta;

export const loader = (queryClient) => async () => {
  const query = getDigestaStatsQuery();
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};
