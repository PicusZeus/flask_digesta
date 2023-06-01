import classes from "./DigestaJurists.module.css";
import DigestaTocMobileJurists from "../../../components/DigestaToc/DigestaTocMobile/DigestaTocMobileJurists/DigestaTocMobileJurists";
import { Outlet } from "react-router-dom";
import DigestaTocDesktopJurists from "../../../components/DigestaToc/DigestaTocDesktop/DigestaTocDesktopJurists/DigestaTocDesktopJurists";

import { useQuery } from "@tanstack/react-query";
import { getJurists } from "../../../api/api";
import Spinner from "../../../components/UI/spinner/Spinner";

const getJuristsQuery = () => {
  return {
    queryKey: ["jurists"],
    queryFn: getJurists,
  };
};

const DigestaJurists = () => {
  const { data: jurists, isFetching } = useQuery(getJuristsQuery());
  if (isFetching) {
    return <Spinner />;
  }

  return (
    <div className={classes.jurists_main}>
      <h1 className={classes.jurists_main__title}>Digesta - po autorze</h1>
      <div className={classes.jurists_main__container}>
        <div className={classes.jurists_main__mobile_toc}>
          <DigestaTocMobileJurists jurists={jurists} />
        </div>
        <div className={classes.jurists_main__desktop_toc}>
          <DigestaTocDesktopJurists jurists={jurists} />
        </div>
        <div className={classes.jurists_main__outlet}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DigestaJurists;

export const loader = (queryClient) => async () => {
  const query = getJuristsQuery();
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};
