import "./App.css";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Switch } from 'react-router-dom';
import Home from "./page/Home/home";
import SignIn from "./page/Auth/SignIn";

import { useRoutes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import SignUp from "./page/Auth/SignUp";
import Yoga from "./page/Services/yoga";
import Dance from "./page/Services/dance";
import Boxing from "./page/Services/boxing";
import Gym from "./page/Services/gym";
import Center from "./page/center/center";
import LearningCourse from "./page/Course/LearningCourse";
import DetailCourse from "./page/DescriptionCourse/DetailCourse";
import Tranformation from "./page/Tranformation/tranfor";
//import CreatCourse from "./page/Center_Admin/CreatCourse";
import Verify from "./page/Auth/Verify";
import YourProfile from "./page/User/profile";
import EditProfile from "./page/User/edit_profile";
//import CreateCourse from "./page/Course/CreateCourse";
import Bmi from './page/Services/bmi';
import BmiCoursePage from "./page/Services/BmiCoursePage";
import ManageCourse from "./page/Manage_Admin/ManageCourse";
import ManageSession from "./page/Manage_Admin/ManageSession";
import ManageLesson from "./page/Manage_Admin/ManageLession";
import ManageAllCourse from "./page/Manage_Admin/ManageAllCourse";
import ManageCourseAdmin from "./admin/ManageCourseAdmin";
import ManageCourseManager from "./admin/ManageCourseManager";
import ManageLearner from "./admin/ManagerLearner";
import AdminProfile from "./admin/AdminProfile";
import ManageCourseByAdmin from "./admin/ManageCoursesByAdmin";
import ManageCourseDetail from "./admin/ManageCourseDetail";
import ManagePostByAdmin from "./admin/ManagePostByAdmin";
import UpdateCourse from "./components/ModalUpdateCourse";
import UpdateAccount from "./components/ModelUpdateAccount";
import ManageBillByAdmin from "./admin/ManageBills";
import ManageOrderByIdByAdmin from "./admin/ManageOrderById";
import ResetPassword from "./page/Auth/ResetPassword";
import Forgotpassword from "./page/Auth/ForgotPassword";
import SignUpCourseAdmin from "./page/Auth/RegisterCourseAdmin";
import CourseAdminUpdateCourse from "./page/Manage_Admin/CourseAdminUpdateCourse";
import UpdateSession from "./page/Manage_Admin/ModelUpdateSession";
import CourseAdminManageCourse from "./page/Manage_Admin/CourseAdminManageCourse";
import CreatePost from "./page/Post/CreatPost";
import ListPost from "./page/Post/post";
import DetailPost from "./page/Post/DetailPost";
import ManageAllCourseByAdmin from "./admin/ManagerCourseByCourseAdmin";
import UpdateCourseByCourseAdmin from "./page/Manage_Admin/CourseAdminUpdateCourse";



export default function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Layout />}> */}
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/yoga" element={<Yoga />} />
      <Route path="/dance" element={<Dance />} />
      <Route path="/boxing" element={<Boxing />} />
      <Route path="/gym" element={<Gym />} />
      <Route path="/center" element={<Center />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/forgotPassword" element={<Forgotpassword />} />
      <Route path="/registerCourseAdmin" element={<SignUpCourseAdmin />} />
      <Route path="/learningCourse" element={<LearningCourse />} />
      <Route path="/detailCourse/:id" element={<DetailCourse />} />
      <Route path="/tranformation" element={<Tranformation />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      {/* <Route path="/creatcourse" element={<CreatCourse />} /> */}
      <Route path="/profile" element={<YourProfile />} />
      <Route path="/editProfile" element={<EditProfile />} />
      {/* <Route path="/createCourse" element={<CreateCourse />} /> */}
      <Route path="/displayByBmi" element={<BmiCoursePage />} />
      <Route path="/learningCourse/:id/:sessionId?/:lessonId?" element={<LearningCourse />} />
      <Route path="/manageCourse/:courseId" element={<ManageCourse />} />
      <Route path="/manageCourse" element={<ManageAllCourse />} />
      <Route path="/manageCourse/update/:courseId" element={<UpdateCourseByCourseAdmin />} />
      <Route path="/manageSession" element={<ManageSession />} />
      <Route path="/manageSession/:id" element={<ManageSession />} />
      <Route path="/updateSession/:id" element={<UpdateSession />} />
      <Route path="/manageLesson/:id" element={<ManageLesson />} />
      <Route path="/manageManager" element={<CourseAdminManageCourse />} />
      <Route path="/createPost" element={<CreatePost />} />
      <Route path="/listPost" element={<ListPost />} />
      <Route path="/postDetail/:postId" element={<DetailPost />} />

      {/* <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NoPage />} /> */}
      {/* </Route> */}
      <Route path="/admin" element={<ManageCourseAdmin />} />
      <Route path="/admin/courseAdmin" element={<ManageCourseAdmin />} />
      <Route path="/admin/courseAdmin/:id" element={<ManageAllCourseByAdmin />} />
      <Route path="/admin/courseManager" element={<ManageCourseManager />} />
      <Route path="/admin/courseLearner" element={<ManageLearner />} />
      <Route path="/admin/profile" element={<AdminProfile />} />
      <Route path="/admin/post" element={<ManagePostByAdmin />} />
      <Route path="/admin/course" element={<ManageCourseByAdmin />} />
      <Route path="/admin/bill" element={<ManageBillByAdmin />} />
      <Route path="/admin/course/:courseId" element={<ManageCourseDetail />} />
      <Route path="/admin/course/update/:courseId" element={<UpdateCourse />} />
      <Route path="/admin/account/update/:accountId" element={<UpdateAccount />} />
      <Route path="/admin/manageOrder/:orderId" element={<ManageOrderByIdByAdmin />} />
      <Route path="/admin/resetPassword" element={<ResetPassword />} />
    </Routes>
  );
}
