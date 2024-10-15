import "./App.css";
import { Routes, Route } from "react-router-dom"; // Thêm BrowserRouter
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Home from "./page/Home/home";
import SignIn from "./page/Auth/SignIn";

import Schedule from "./components/schedules/schedule";

import SignUp from "./page/Auth/SignUp";
import Yoga from "./page/Services/yoga";
import Dance from "./page/Services/dance";
import Boxing from "./page/Services/boxing";
import Gym from "./page/Services/gym";
import Center from "./page/center/center";
import LearningCourse from "./page/Course/LearningCourse";
import DetailCourse from "./page/DescriptionCourse/DetailCourse";
import Tranformation from "./page/Tranformation/tranfor";
import Verify from "./page/Auth/Verify";
import YourProfile from "./page/User/profile";
import EditProfile from "./page/User/edit_profile";
import Bmi from './page/Services/bmi';
import BmiCoursePage from "./page/Services/BmiCoursePage";
import ManageCourse from "./page/Manage_Admin/ManageCourse";
import ManageSession from "./page/Manage_Admin/ManageSession";
import ManageLesson from "./page/Manage_Admin/ManageLession";
import ManageAllCourse from "./page/Manage_Admin/ManageAllCourse";
import ManageServiceCenter from "./admin/ManageServiceCenter";
import ManageTeacher from "./admin/ManageTeacher";
import ManageLearner from "./admin/ManagerLearner";
import AdminProfile from "./admin/AdminProfile";
import ManageCoursesByAdmin from "./admin/ManageCoursesByAdmin";
import ManageCourseDetail from "./admin/ManageCourseDetail";
import ManagePostByAdmin from "./admin/ManagePostByAdmin";
import UpdateCourse from "./components/ModalUpdateCourse";
import UpdateAccount from "./components/ModelUpdateAccount";
import ManageBillByAdmin from "./admin/ManageBills";
import ManageOrderByIdByAdmin from "./admin/ManageOrderById";
import ResetPassword from "./page/Auth/ResetPassword";
import Forgotpassword from "./page/Auth/ForgotPassword";
import SignUpServiceCenter from "./page/Auth/RegisterServiceCenter";
import ServiceCenterUpdateCourse from "./page/Manage_Admin/ServiceCenterUpdateCourse";
import UpdateSession from "./page/Manage_Admin/ModelUpdateSession";
import ServiceCenterManageCourse from "./page/Manage_Admin/ServiceCenterManageCourse";
import CreatePost from "./page/Post/CreatPost";
import ListPost from "./page/Post/post";
import DetailPost from "./page/Post/DetailPost";
import ManageAllCourseByAdmin from "./admin/ManagerCourseByServiceCenter";
import UpdateCourseByServiceCenter from "./page/Manage_Admin/ServiceCenterUpdateCourse";
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ResetForgotPassword from "./page/Auth/ResetForgotPassword";

export default function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
  
    
    <DndProvider backend={HTML5Backend}>
        <Routes>

          <Route path="/serviceCenterUpdateCourse" element={<ServiceCenterUpdateCourse/>}/>
          <Route path="/bmi" element={<Bmi/>}/>

          <Route path="/schedule" element={<Schedule />} />

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
          <Route path="/reset-password" element={<ResetForgotPassword />} />
          <Route path="/registerServiceCenter" element={<SignUpServiceCenter />} />
          <Route path="/learningCourse" element={<LearningCourse />} />
          <Route path="/detailCourse/:id" element={<DetailCourse />} />
          <Route path="/tranformation" element={<Tranformation />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/profile" element={<YourProfile />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/displayByBmi" element={<BmiCoursePage />} />
          <Route path="/learningCourse/:id/:sessionId?/:lessonId?" element={<LearningCourse />} />
          <Route path="/manageCourse/:courseId" element={<ManageCourse />} />
          <Route path="/manageCourse" element={<ManageAllCourse />} />
          <Route path="/manageCourse/update/:courseId" element={<UpdateCourseByServiceCenter />} />
          <Route path="/manageSession" element={<ManageSession />} />
          <Route path="/manageSession/:id" element={<ManageSession />} />
          <Route path="/updateSession/:id" element={<UpdateSession />} />
          <Route path="/manageLesson/:id" element={<ManageLesson />} />
          <Route path="/manageManager" element={<ServiceCenterManageCourse />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/listPost" element={<ListPost />} />
          <Route path="/postDetail/:postId" element={<DetailPost />} />
          <Route path="/admin" element={<ManageServiceCenter />} />
          <Route path="/admin/serviceCenter" element={<ManageServiceCenter />} />
          <Route path="/admin/serviceCenter/:id" element={<ManageAllCourseByAdmin />} />
          <Route path="/admin/teacher" element={<ManageTeacher />} />
          <Route path="/admin/courseLearner" element={<ManageLearner />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin/post" element={<ManagePostByAdmin />} />
          <Route path="/admin/course" element={<ManageCoursesByAdmin />} />
          <Route path="/admin/bill" element={<ManageBillByAdmin />} />
          <Route path="/admin/course/:courseId" element={<ManageCourseDetail />} />
          <Route path="/admin/course/update/:courseId" element={<UpdateCourse />} />
          <Route path="/admin/account/update/:accountId" element={<UpdateAccount />} />
          <Route path="/admin/manageOrder/:orderId" element={<ManageOrderByIdByAdmin />} />
          <Route path="/admin/resetPassword" element={<ResetPassword />} />
        </Routes>
      </DndProvider>

 
  );
}
