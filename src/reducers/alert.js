const alertReducer = (initial = defaultALert, action) => {
  switch (action.type) {
    case "SHOW_ALERT":
      return { show: true, msg: action.msg };
    case "HIDE_ALERT":
      return { show: false, msg: "" };
    default:
      return initial;
  }
};

const defaultALert = { show: false, msg: "" };

export default alertReducer;
