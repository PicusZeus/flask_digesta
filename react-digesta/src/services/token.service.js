class TokenService {
  getLocalRefreshToken() {
    return JSON.parse(localStorage.getItem("refresh_token"));
  }

  getLocalAccessToken() {
    const token = JSON.parse(localStorage.getItem("access_token"));
    const tokenDuration = this.getTokenDuration();

    if (!tokenDuration) {
      return null;
    } else if (tokenDuration < 0) {
      return "EXPIRED";
    } else {
      return token;
    }
  }

  updateLocalAccessToken(token) {
    localStorage.setItem("access_token", JSON.stringify(token));
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 6);
    localStorage.setItem("expiration", expiration.toISOString());
  }

  updateCommentedParagraphi(newParagraphi) {
    if (newParagraphi) {
      console.log("UPDATED");
      localStorage.setItem(
        "commented_paragraphi",
        JSON.stringify(newParagraphi)
      );
    } else {
      localStorage.setItem("commented_paragraphi", JSON.stringify([]));
    }
  }

  getCommentedParagraphi() {
    return JSON.parse(localStorage.getItem("commented_paragraphi"));
  }

  getUserId() {
    return localStorage.getItem("user_id");
  }

  getUsername() {
    return JSON.parse(localStorage.getItem("username"));
  }

  getTokenDuration() {
    const storedExpirationDate = localStorage.getItem("expiration");
    if (!storedExpirationDate) {
      return null;
    }
    const now = new Date();
    const expirationDate = new Date(storedExpirationDate);
    return expirationDate.getTime() - now.getTime();
  }

  setUser(userData) {
    localStorage.setItem("user_id", JSON.stringify(userData.user_id));
    localStorage.setItem("username", JSON.stringify(userData.username));
    localStorage.setItem("access_token", JSON.stringify(userData.access_token));
    localStorage.setItem(
      "refresh_token",
      JSON.stringify(userData.refresh_token)
    );
    localStorage.setItem(
      "commented_paragraphi",
      JSON.stringify(userData.paragraphi)
    );
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 6);
    localStorage.setItem("expiration", expiration.toISOString());
  }

  removeUser() {
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("commented_paragraphi");
    localStorage.removeItem("expiration");
  }
}

const tokenService = new TokenService();
export default tokenService;
