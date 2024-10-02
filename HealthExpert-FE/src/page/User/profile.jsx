import React, { useEffect, useState } from "react";
import splash from '../../img/bg.png';
import pfp from '../../img/pfp.png';
import center from '../../img/center.png';
import cover from '../../img/course_cover.png';
import Header from "../../components/Header";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {
  useNavigate
} from "react-router-dom";
import { DatePicker } from 'antd';
import axios from "axios";
import { Link } from "react-router-dom";
import avatarwoman from "../../img/avatarwoman.jpg"
import avatarman from "../../img/avatarman.jpg"
import yogaicon from "../../img/Yoga_icon.png";
import gymicon from "../../img/Gym_icon.png";
import boxingicon from "../../img/Boxing_icon.png";
import danceicon from "../../img/Dance_icon.png";
import avt1 from '../../img/avt1.jpg';
import { notification } from 'antd';

function YourProfile() {
  const [courses, setCourses] = useState([]);
  const accountId = localStorage.getItem("accountId");
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [avatarName, setAvatarName] = useState("");
  const avatar = {};
  dayjs.extend(customParseFormat);

  const { RangePicker } = DatePicker;

  const dateFormat = 'YYYY/MM/DD';
  const weekFormat = 'MM/DD';
  const monthFormat = 'YYYY/MM';

  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

  useEffect(() => {
    const username = localStorage.getItem("user");
    if (username) {
      getProfile(username);
    }
  }, []);

  function getProfile(username) {
    fetch(`https://localhost:7158/api/Account/GetListAccount`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer YOUR_ACCESS_TOKEN",
      }
    })
      .then(response => {
        if (!response.ok) {
          console.error(`Lỗi load dữ liệu!`);
          alert("Lỗi load dữ liệu!");
          throw new Error("Lỗi load dữ liệu!");
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          const foundUser = data.find(accountList => accountList.userName === username);
          if (foundUser) {
            localStorage.setItem("accountId", foundUser.accountId);
            setFullName(foundUser.fullName);
            setAvatarName(foundUser.fullName);
            setEmail(foundUser.email);
            setPhone(foundUser.phone);
            setBirthDate(dayjs(foundUser.birthDate)); // Cập nhật kiểu ngày
            setGender(foundUser.gender ? "Nam" : "Nu");
          } else {
            console.error("Lỗi load dữ liệu!");
          }
        } else {
          console.error("Lỗi load dữ liệu!");
        }
      })
      .catch(error => {
        console.error("Lỗi load dữ liệu!", error);
      });
  }

  if (gender === "Nam") {
    avatar.img = avatarman;
  } else {
    avatar.img = avatarwoman;
  }

  function updateAccount() {
    const accountId = localStorage.getItem("accountId");
    const updateData = {
      fullName: fullName,
      email: email,
      phone: phone,
      gender: gender === "Nam" ? true : false,
      birthDate: birthDate ? birthDate.format('YYYY-MM-DD') : null,  // Định dạng lại ngày sinh
    };

    fetch(`https://localhost:7158/api/Account/UpdateAccount/${accountId}`, {
      method: "PUT",
      headers: {
        "Authorization": "Bearer YOUR_ACCESS_TOKEN",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateData)
    })
      .then(response => {
        if (!response.ok) {
          console.error(`Lỗi cập nhật dữ liệu!`);
          alert("Lỗi cập nhật dữ liệu!");
          throw new Error("Lỗi cập nhật dữ liệu!");
        }
        notification.success({
          message: 'Cập nhật thành công',
          description: 'Thông tin tài khoản của bạn đã được cập nhật thành công.',
        });
        console.log("Thông tin tài khoản đã được cập nhật!");
      })
      .catch(error => {
        console.error("Lỗi cập nhật dữ liệu!", error);
        notification.error({
          message: 'Cập nhật thất bại',
          description: 'Đã xảy ra lỗi khi cập nhật tài khoản của bạn. Vui lòng thử lại.',
        });
      });
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const enrollmentsResponse = await axios.get(`https://localhost:7158/api/Course/enrollments`);
        const enrollments = enrollmentsResponse.data;

        const matchingCourse = enrollments.filter(course => course.accountId === accountId);
        const matchingCourseId = matchingCourse.map(course => course.courseId.toLowerCase());

        const courseDetailsResponse = await axios.get(`https://localhost:7158/api/Course`);
        const courseResponse = courseDetailsResponse.data;
        const courseDetails = courseResponse.filter(course => matchingCourseId.includes(course.courseId.toLowerCase()));

        setCourses(courseDetails);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    if (accountId) {
      fetchData();
    }
  }, [accountId]);

  const getImageForType = (typeId) => {
    switch (typeId) {
      case 1:
        return yogaicon;
      case 2:
        return boxingicon;
      case 3:
        return danceicon;
      case 4:
        return gymicon;
    }
  };

  return (
    <>
      <base href="./" />
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

      <div className="home-page">
        <Header />
      </div>

      <div className="grid gap-4 ml-16 mr-16">
        <div className="">
          <img src={center} alt="" className="relative object-cover w-full h-96 z-0" />
          <div className="flex">
            <div className="flex ml-5 -mt-28 z-10 px-2 border border-orange-400 border-[3px] w-48 relative">
              <img src={avatar.img} alt="" className="z-10 w-full h-full absolute inset-0 rounded-lg shadow-lg" />
            </div>
            <p className="font-sans text-3xl font-bold bg-gradient-to-r from-orange-400 to-yellow-300 text-transparent bg-clip-text flex justify-center items-center ml-20 drop-shadow-lg shadow-orange-500">
              {fullName}
            </p>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <div className="flex flex-auto border rounded-lg shadow-2xl mb-4 mx-auto w-full">
            <div className="flex-auto border rounded-lg shadow-2xl w-3/12 bg-gray-50 p-5">
              <p className="font-bold text-gray-800 text-2xl">Thông tin cá nhân</p>
              <div className="mt-5 space-y-4">
                <label className="block text-sm text-gray-700">Họ và tên:</label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300" />

                <label className="block text-sm text-gray-700">Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300" />

                <label className="block text-sm text-gray-700">Số điện thoại:</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300" />

                <label className="block text-sm text-gray-700">Giới tính:</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300">
                  <option value="Nam">Nam</option>
                  <option value="Nu">Nữ</option>
                </select>

                <label className="block text-sm text-gray-700">Ngày sinh:</label>
                <DatePicker
                  value={birthDate ? dayjs(birthDate) : null}
                  onChange={(date) => setBirthDate(date)}
                  format="YYYY/MM/DD"
                  className="w-full"
                />
              </div>
              <button onClick={updateAccount} className="bg-orange-500 text-white py-2 px-4 mt-4 rounded transition duration-200 hover:bg-orange-400">
                Cập nhật
              </button>
            </div>

            <div className="w-9/12 px-5 py-5 bg-gray-50 rounded-lg shadow-lg">
              <p className="text-2xl text-gray-800 font-bold">Các khóa học của bạn</p>
              <div className="grid grid-cols-3 gap-5 mt-5 animate-fade-in-up">
                {courses.map(course => (
                  <div key={course.courseId} className="hover:shadow-md transition-shadow duration-300">
                    <Link to={`/detailCourse/${course.courseId}`}>
                      <div className="rounded-lg shadow-lg overflow-hidden">
                        <img src={avt1} alt="" className="rounded-lg object-cover w-full h-40" />
                        <div className="p-4">
                          <img src={getImageForType(course.typeId)} alt="" className="w-12 h-12 mb-2" />
                          <p className="text-lg font-bold text-gray-800">{course.courseName}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default YourProfile;
