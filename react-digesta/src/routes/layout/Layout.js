import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../../components/UI/footer/Footer.js";
import MenuBar from "../../components/UI/menuBar/MenuBar.js";
import classes from "./Layout.module.css";
import tokenService from "../../services/token.service";
import { logout } from "../../store/auth-actions";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";


const Layout = () => {
  const token = tokenService.getLocalAccessToken();
  const username = tokenService.getUsername();
  const user_id = tokenService.getUserId();
  const paragraphi = tokenService.getCommentedParagraphi();
  const tokenDuration = tokenService.getTokenDuration();
  const dispatch = useDispatch();
  useEffect(() => {
    if (token === "EXPIRED") {
      logout(token);
    } else if (token) {
      setTimeout(() => {
        logout(token);
      }, tokenDuration);
      dispatch(authActions.setUserData({ username, user_id, paragraphi }));
    }
  }, [dispatch, tokenDuration, token, paragraphi, user_id, username]);

  return (
    <>
      <MenuBar />
      <main className={classes.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
export default Layout;
