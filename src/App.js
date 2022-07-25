import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddJob from "./pages/admin/addJob";
import AddWorker from "./pages/admin/addWorker";
import CreateJob from "./pages/admin/createJob";
import CreateWorker from "./pages/admin/createWorker";
import HomeAdmin from "./pages/admin/homeAdmin";
import JobSites from "./pages/admin/jobSites";
import UpdateJob from "./pages/admin/updateJob";
import UpdateJobsiteWorker from "./pages/admin/updateJobsiteWorker";
import UpdateWorker from "./pages/admin/updateWorker";
import UpdateWorkerJob from "./pages/admin/updateWorkerJob";
import ViewJob from "./pages/admin/viewJob";
import ViewWorker from "./pages/admin/viewWorker";
import Workers from "./pages/admin/workers";
import ForgetPassword from "./pages/forgetPassword";
import Login from "./pages/login";
import ResetPassword from "./pages/resetPassword";
import Home from "./pages/worker/homePage";
import Profile from "./pages/worker/profile";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/homeAdmin" element={<HomeAdmin />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users" element={<Workers />} />
          <Route path="/jobsites" element={<JobSites />} />
          <Route path="/addworker" element={<AddWorker />} />
          <Route path="/viewworker" element={<ViewWorker />} />
          <Route path="/addJob" element={<AddJob />} />
          <Route path="/viewJob" element={<ViewJob />} />
          <Route path="/createJob" element={<CreateJob />} />
          <Route path="/createWorker" element={<CreateWorker />} />
          <Route path="/updateWorker" element={<UpdateWorker />} />
          <Route path="/updateJob" element={<UpdateJob />} />
          <Route path="/updateWorkerJob" element={<UpdateWorkerJob />} />
          <Route
            path="/updateJobsiteWorker"
            element={<UpdateJobsiteWorker />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
