import React, { useEffect, useState } from "react";
import splash from '../img/bg.png';
import pfp from '../img/pfp.png';
import cover from '../img/course_cover.png';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {
    useNavigate
} from "react-router-dom";
import { DatePicker } from 'antd';
import axios from "axios";
import { Link } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";


function AdminProfile() {
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

    dayjs.extend(customParseFormat);

    const { RangePicker } = DatePicker;

    const dateFormat = 'YYYY/MM/DD';
    const weekFormat = 'MM/DD';
    const monthFormat = 'YYYY/MM';

    /** Manually entering any of the following formats will perform date parsing */
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

    const customFormat: DatePickerProps['format'] = (value) =>
        `custom format: ${value.format(dateFormat)}`;

    const customWeekStartEndFormat: DatePickerProps['format'] = (value) =>
        `${dayjs(value).startOf('week').format(weekFormat)} ~ ${dayjs(value)
            .endOf('week')
            .format(weekFormat)}`;


    useEffect(() => {
        // Check if user is logged in using your preferred method (e.g., checking local storage)
        const username = localStorage.getItem("user");
        if (username) {
            getProfile(username);
        }
    }, []);

    const navigateToRegistered = () => {
        navigate('/registeredCourse');
    };

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
                        setEmail(foundUser.email);
                        setGender(foundUser.gender);
                        setPhone(foundUser.phone);
                        setBirthDate(new Date(foundUser.birthDate));
                        setFormattedDate(formatDate(foundUser.birthDate));
                        if (foundUser.gender) {
                            setGender("Nam")
                        } else {
                            setGender("Nu")
                        }
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

    function updateAccount() {
        const accountId = localStorage.getItem("accountId"); // Get the account ID from localStorage or any source you store it
        const updateData = {
            fullName: fullName,
            email: email,
            phone: phone,
            gender: gender,
            birthDate: birthDate
        };

        fetch(`https://localhost:7158/api/Account/UpdateAccount/${accountId}`, {
            method: "PUT", // or "PATCH" depending on your API
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
                // Optionally, handle success response
                console.log("Thông tin tài khoản đã được cập nhật!");
            })
            .catch(error => {
                console.error("Lỗi cập nhật dữ liệu!", error);
            });
    }

    useEffect(() => {
        // Sau khi birthDate được cập nhật, định dạng lại ngày tháng và lưu vào state formattedDate
        setFormattedDate(formatDate(birthDate));
    }, [birthDate]);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        // Ensure leading zero for single-digit days and months
        const formattedDay = day < 10 ? '0' + day : day;
        const formattedMonth = month < 10 ? '0' + month : month;

        return `${formattedDay}/${formattedMonth}/${year}`;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Step 1: Call API to get list of courses based on accountId
                const enrollmentsResponse = await axios.get(`https://localhost:7158/api/Course/enrollments`);
                const enrollments = enrollmentsResponse.data;

                const matchingCourse = enrollments.filter(course => course.accountId === accountId);
                const matchingCourseId = matchingCourse.map(course => course.courseId);
                //console.log(matchingCourseId);

                // Step 2: Call API to get details of courses using the courseIds
                const courseDetailsResponse = await axios.get(`https://localhost:7158/api/Course`);
                const courseResponse = courseDetailsResponse.data;
                const courseDetails = courseResponse.filter(course => matchingCourseId.includes(course.courseId));

                setCourses(courseDetails);
                console.log(courseDetails);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        if (accountId) {
            fetchData();
        }
    }, [accountId]);

    return (
        <>
            <base href="./" />
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            {/* Main styles for this application*/}
            {/* idk */}
            <div className="home-page">
                <AdminHeader />
            </div>
            <div className="grid gap-4 ml-16 mr-16">
                {/* banner and pfp hijinx */}
                <div className="">
                    <img src={splash} alt="" className="relative object-cover w-full h-96 z-0" />
                    <div className="flex">
                        <div className="flex ml-5 -mt-28 z-10 px-2">
                            <img src={pfp} alt="" className="z-10 object-scale-down w-48" />
                            {/* <p className='text-xl font-bold ml-8 mt-32'></p> */}
                            <p className="ml-3 text-center">{fullName}</p>
                        </div>
                    </div>
                </div>
                {/* two columns */}
                <div className="flex flex-col w-full"> {/* Sử dụng flex-direction: column */}
                    <div className="flex flex-auto border rounded shadow-2xl mb-4 mx-auto w-full"> {/* Sử dụng flex-auto để cả 2 cột co giãn */}
                        {/* left column: about */}
                        <div className="flex-auto border rounded shadow-2xl w-full"> {/* Sử dụng w-3/12 để chia thành 3 phần */}
                            <br />
                            <hr />
                            <div className="ml-3">
                                <label className="block">Họ và tên:</label>
                                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="border rounded px-2 py-1 mb-2" />
                                <label className="block">Email:</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border rounded px-2 py-1 mb-2" />
                                <label className="block">Số điện thoại:</label>
                                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="border rounded px-2 py-1 mb-2" />
                                <label className="block">Giới tính:</label>
                                <select value={gender} onChange={(e) => setGender(e.target.value)} className="border rounded px-2 py-1 mb-2">
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                </select>
                                <label className="block">Ngày sinh:</label>
                                <input type="text" value={formattedDate} onChange={(e) => setBirthDate(e.target.value)} className="border rounded px-2 py-1 mb-2" />
                                {/* <DatePicker defaultValue={dayjs(formattedDate, dateFormat)} selected={birthDate} onChange={date => setBirthDate(date)} className="border rounded px-2 py-1 mb-2" /> */}
                            </div>
                            <br />
                            <hr />
                            <button onClick={updateAccount} className="bg-orange-500 text-white py-2 px-4 rounded transition-opacity hover:bg-opacity-80 ml-4">Cập nhật</button>
                        </div>
                        {/* right column: joined courses */}
                        <div className="flex-auto border rounded shadow-2xl w-0/12"> {/* Sử dụng w-9/12 để chia thành 7 phần */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-auto">
                <footer className="bg-white">
                    <br />
                    <hr />
                    <br />
                    <div>Healt45 © 2024</div>
                </footer>
            </div>
            {/* FOOTER */}
        </>

    );
};

export default AdminProfile;