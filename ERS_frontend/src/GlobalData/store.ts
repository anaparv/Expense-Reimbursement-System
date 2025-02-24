const user = localStorage.getItem("user");
export const store = {
  //Let's store the info of the logged-in user (filled after successful login)
  loggedInUser: JSON.parse(user || ""),
};
