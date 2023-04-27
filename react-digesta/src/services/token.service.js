class TokenService {
  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.refreshToken;
  }

  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.access_token;
  }

  updateLocalAccessToken(token) {
    let user = JSON.parse(localStorage.getItem("user"));
    user.access_token = token;
    localStorage.setItem("user", JSON.stringify(user));
    return token
  }

  updateCommentedParagraphi(newParagraphi) {
    let user = JSON.parse(localStorage.getItem("user"));
    user.paragraphi = newParagraphi
    localStorage.setItem("user", JSON.stringify(user))
  }
  getCommentedParagraphi() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.paragraphi
  }
  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  setUser(user) {
    // console.log(JSON.stringify(user));
    localStorage.setItem("user", JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem("user");
  }
}


export default new TokenService()