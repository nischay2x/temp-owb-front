const userReducer = (initiallogin = {}, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return action.payload;
    case "LOGOUT":
      return action.payload;
    default:
      return initiallogin;
  }
};

export default userReducer;
