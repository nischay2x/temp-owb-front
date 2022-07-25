const jobList = (initial = [], action) => {
  switch (action.type) {
    case "JOB_SITES":
      return action.payload;
    case "JOB_DETAILS":
      return action.payload;
    default:
      return initial;
  }
};

export default jobList;
