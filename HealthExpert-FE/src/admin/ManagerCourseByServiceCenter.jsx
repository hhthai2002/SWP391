import React, { useEffect, useState } from "react";
import { Table, Modal, Button } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import AdminMenu from "../components/AdminMenu";
import AdminHeader from "../components/AdminHeader";
//import Autosuggest from 'react-autosuggest';

export default function ManageAllCourseByAdmin() {
    const [courses, setCourses] = useState([]);
    const [centerName, setCenterName] = useState('');
    const [admin, setAdmin] = useState('');
    const { id } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUserAndRoleId = () => {
            const user = localStorage.getItem("user");
            const roleId = localStorage.getItem("roleId");
            if (!user) {
                console.error("Không có người dùng trong localStorage!");
                return;
            }
            if (roleId === '1') {
                setAdmin(user);
            } else {
                console.error("Bạn không phải là admin!");
                navigate('/home');
            }
        };

        // Đợi 3 giây trước khi kiểm tra roleId
        const timeout = setTimeout(() => {
            fetchUserAndRoleId();
        }, 1000);

        // Xóa bộ đếm ngược khi component unmount
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        const fetchServiceCenter = async () => {
            try {
                const response = await axios.get(`https://localhost:7158/api/Account/GetListAccount`);
                const accountList = response.data;
                const filteredAccounts = accountList.filter((account) => account.userName === id);
                setCenterName(filteredAccounts[0].userName);
            } catch (error) {
                console.error("Error fetching courses: ", error);
            }
        };
        if (id) {
            fetchServiceCenter();
        }
    }, [id]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`https://localhost:7158/api/Course/`);
                const filteredCourses = response.data.filter(data => data.createBy === id);
                setCourses(filteredCourses);
            } catch (error) {
                console.error("Error fetching courses: ", error);
            }
        };
        if (id) {
            fetchCourses();
        }
    }, [id]);

    // useEffect(() => {
    //     if (!email) {
    //         console.error("Lỗi load dữ liệu");
    //         return;
    //     }
    //     const fetchCoursesByManager = async () => {
    //         try {
    //             const response1 = await axios.get(`https://localhost:7158/api/Course/managers/email/${email}`);
    //             if (response1.data.length > 0) {
    //                 const currentProgress = response1.data[0];
    //                 setCoursesByManager(currentProgress.courseId);
    //                 console.log(coursesByManager);
    //                 const response2 = await axios.get(`https://localhost:7158/api/Course/`);
    //                 const filteredCourses = response2.data.filter(data => data.courseId === coursesByManager);
    //                 setCourses(filteredCourses);
    //             }
    //         } catch (error) {
    //             console.error("Error fetching courses: ", error);
    //         }
    //     };
    //     if (email) {
    //         fetchCoursesByManager();
    //     }
    // }, [email]);



    // useEffect(() => {
    //     // Tính tổng doanh thu
    //     const totalRevenue = courses.reduce((acc, course) => {
    //         return acc + (course.studentNumber * course.price);
    //     }, 0);
    //     setRevenue(totalRevenue);
    // }, [courses]);

    // const formattedRevenue = new Intl.NumberFormat("vi-VN", {
    //     style: "currency",
    //     currency: "VND",
    // }).format(revenue);

    const columns = [
        {
            title: "ID",
            dataIndex: "courseId",
            key: "courseId",
            render: (text, record) => (
                <a onClick={() => navigate(`/admin/course/${record.courseId}`)}>{record.courseId}</a>
            ),

        },
        {
            title: "Tên khóa học",
            dataIndex: "courseName",
            key: "courseName",
        },
        {
            title: "Số lượng học viên",
            dataIndex: "studentNumber",
            key: "studentNumber",
        },
        {
            title: "Giá tiền",
            dataIndex: "price",
            key: "price",
            render: (text) => (
                <span>{new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(text)}</span>
            ),
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
        },

    ];

    return (
        <>
            <div className="w-full" >
                <AdminHeader />
            </div>
            <div className="w-full flex">
                {/* Side bar */}
                <div className="w-[20%]">
                    <div className="home-page">
                        <AdminMenu />
                    </div>
                </div>
                <div className="">
                    <h2 className="font-bold text-2xl">WELCOME {admin}</h2>
                    <div className="w-[80%] mt-3">
                        <h2 className="font-bold text-2xl">Trung tâm {centerName}</h2>

                        <div className="mt-10">
                            <Table
                                columns={columns}
                                dataSource={courses}
                                rowKey={(record) => record.courseId}

                            />
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}
