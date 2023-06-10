import { Outlet, useParams } from "react-router-dom";
import classes from "./DigestaJuristDigesta.module.css";
import DigestaTocDesktopJuristDigestaBooks from "../../../components/DigestaToc/DigestaTocDesktop/DigestaTocDesktopJuristDigestaBooks/DigestaTocDesktopJuristDigestaBooks";
import DigestaTocMobileJuristDigestaBooks from "../../../components/DigestaToc/DigestaTocMobile/DigestaTocMobileJuristDigestaBooks/DigestaTocMobileJuristDigestaBooks";
import { useQuery } from "@tanstack/react-query";
import { getJuristBooks } from "../../../api/api";
import Spinner from "../../../components/UI/spinner/Spinner";

const getJuristBooksQuery = (id) => {
  return {
    queryKey: ["digesta", "books", "author", id],
    queryFn: () => getJuristBooks(id),
  };
};

const DigestaJuristDigesta = () => {
  const params = useParams();
  const author_id = params.jurysta_id;
  const { data: books, isFetching } = useQuery(getJuristBooksQuery(author_id));

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <div className={classes.toc_container}>
      <div className={classes.mobile_toc}>
        {books && (
          <DigestaTocMobileJuristDigestaBooks
            books={books}
            author_id={author_id}
          />
        )}
      </div>
      <div className={classes.desktop_toc}>
        {books && (
          <DigestaTocDesktopJuristDigestaBooks
            books={books}
            author_id={author_id}
          />
        )}
      </div>

      <div className={classes.toc_outlet}>
        <Outlet />
      </div>
    </div>
  );
};

export default DigestaJuristDigesta;

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const query = getJuristBooksQuery(params.jurysta_id);
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
