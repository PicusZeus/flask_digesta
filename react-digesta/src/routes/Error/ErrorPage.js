import { useRouteError } from "react-router-dom";
import MenuBar from "../../components/UI/menuBar/MenuBar";
import Footer from "../../components/UI/footer/Footer";
import classes from "./ErrorPage.module.css";
const ErrorPage = () => {
  const error = useRouteError();
  const errorCode = error.status;
  let message;

  if (error.data) {
    message = error.data.message;
  }

  return (
    <>
      <MenuBar />
      <section className={classes.main_error}>
        <h1 className={classes.main_error__title}>Coś poszło nie tak</h1>
        <h2>BŁĄD SIECI</h2>
        <h2>{message}</h2>
        <h3>Kod błędu {errorCode}</h3>
      </section>

      <Footer />
    </>
  );
};

export default ErrorPage;
