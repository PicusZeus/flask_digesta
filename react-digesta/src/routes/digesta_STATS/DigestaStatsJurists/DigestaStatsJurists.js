import { getJuristsStats } from "../../../api/api";
import { useQuery } from "@tanstack/react-query";
import BooksAuthorshipChart from "../../../components/charts/BooksAuthorshipChart/BooksAuthorshipChart";
import { useState } from "react";
import Spinner from "../../../components/UI/spinner/Spinner";
import classes from "./DigestaStatsJurists.module.css";
import { Chart as ChartJS } from "chart.js/auto";

const getJuristsStatsQuery = () => {
  return {
    queryKey: ["stats", "digesta", "jurists"],
    queryFn: getJuristsStats,
  };
};
const DigestaStatsJurists = () => {
  const [authorsSetIndex, setAuthorsSetIndex] = useState(0);
  const { data: authors, isFetching } = useQuery(getJuristsStatsQuery());
  if (isFetching) {
    return <Spinner />;
  }

  const authorsMoreOnePercent = authors.filter(
    (author) => author.authorship > 1
  );
  const authorsLessOnePercentMoreOnePromile = authors.filter(
    (author) => author.authorship <= 1 && author.authorship > 0.1
  );
  const authorsLessOnePromile = authors.filter(
    (author) => author.authorship <= 0.1
  );

  const authorsSets = [
    authorsMoreOnePercent,
    authorsLessOnePercentMoreOnePromile,
    authorsLessOnePromile,
  ];

  const onOption = (e) => {
    e.preventDefault();
    const index = parseInt(e.target.value);
    setAuthorsSetIndex(index);
  };

  return (
    <>
      <h1 className={classes.digesta_stats_jurists__title}>
        Juryści cytowani w Digestach
      </h1>
      <h3 className={classes.digesta_stats_jurists__info}>
        Wybierz jurystę, o którym chcesz się dowiedzieć więcej
      </h3>

      <form className={classes.digesta_stats_jurists__form}>
        <label htmlFor="selectJurs">Zobacz jurystów z udziałem</label>
        <select id="selectJurs" onChange={onOption}>
          <option value="0">z udziałem ponad jeden procent</option>
          <option value="1">
            z udziałem poniżej jeden procent a więcej niż jeden promil
          </option>
          <option value="2">z udziałem poniżej jednego promila</option>
        </select>
      </form>

      <div className={classes.jur_stats__chart}>
        {authors && (
          <BooksAuthorshipChart authors={authorsSets[authorsSetIndex]} />
        )}
      </div>
    </>
  );
};
export default DigestaStatsJurists;

export const loader = (queryClient) => async () => {
  const query = getJuristsStatsQuery();
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};
