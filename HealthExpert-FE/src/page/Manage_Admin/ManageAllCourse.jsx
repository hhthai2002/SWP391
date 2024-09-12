import React, { useEffect, useState } from "react";
import Menuleft from "../../components/MenuLeft";
import Header from "../../components/Header";
import { Table, Modal, Button } from "antd";
import ModalCreatCourse from "../../components/ModalCreatCourse";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ModalDeleteCourse from "../../components/ModalDeleteCourse";
import UpdateCourse from "../../components/ModalUpdateCourse";
import { Link } from "react-router-dom";

//import Autosuggest from 'react-autosuggest';

export default function ManageAllCourse() {
    const [courses, setCourses] = useState([]);
    const [coursesByManager, setCoursesByManager] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [centerName, setCenterName] = useState('');
    const [revenue, setRevenue] = useState(0); // Thêm state để lưu tổng doanh thu
    const navigate = useNavigate(); // Sử dụng useHistory
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const user = localStorage.getItem("user");
    const [roleId, setRoleId] = useState("");
    const [checkRole, setCheckRole] = useState(false);
    const [checkManager, setCheckManager] = useState(false);
    const [email, setEmail] = useState("");

    useEffect(() => {
        const roleIdFromLocalStorage = localStorage.getItem("roleId");
        setRoleId(roleIdFromLocalStorage);
        if (roleIdFromLocalStorage && roleIdFromLocalStorage === "2") {
            setCheckRole(true);
        }
        if (roleIdFromLocalStorage && roleIdFromLocalStorage === "3") {
            setCheckManager(true);
        }
        if (roleIdFromLocalStorage && roleIdFromLocalStorage === "4") {
            navigate('/home');
        }
    }, []);

    useEffect(() => {
        const fetchAccountData = async () => {
            try {
                if (!user) {
                    console.error("Không có người dùng trong localStorage!");
                    return;
                }
                const response = await fetch(`https://localhost:7158/api/Account/GetListAccount`, {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer YOUR_ACCESS_TOKEN",
                    }
                });
                if (!response.ok) {
                    console.error(`Lỗi load dữ liệu!`);
                    alert("Lỗi load dữ liệu!");
                    throw new Error("Lỗi load dữ liệu!");
                }
                const data = await response.json();
                if (Array.isArray(data)) {
                    const foundUser = data.find(accountList => accountList.userName === user);
                    if (foundUser) {
                        setCenterName(foundUser.fullName);
                        const roleIdFromLocalStorage = localStorage.getItem("roleId");
                        setRoleId(roleIdFromLocalStorage);
                        if (roleIdFromLocalStorage && roleIdFromLocalStorage === "3") {
                            setEmail(foundUser.email);
                        }
                    } else {
                        console.error("Lỗi load dữ liệu!");
                    }
                } else {
                    console.error("Lỗi load dữ liệu!");
                }
            } catch (error) {
                console.error("Lỗi load dữ liệu!", error);
            }
        };

        fetchAccountData();
    }, [user]);

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                // Sau khi đã gọi fetch dữ liệu tài khoản và setEmail đã được gọi, tiếp tục gọi fetch dữ liệu khóa học
                if (checkRole) {
                    const response = await axios.get(`https://localhost:7158/api/Course/`);
                    const filteredCourses = response.data.filter(data => data.createBy === user);
                    setCourses(filteredCourses);
                }
                if (checkManager && email) {
                    const response1 = await axios.get(`https://localhost:7158/api/Course/managers/email/${email}`);
                    console.log(response1);
                    if (response1.data.length > 0) {
                        const currentProgress = response1.data[0];
                        setCoursesByManager(currentProgress.courseId);

                        const response2 = await axios.get(`https://localhost:7158/api/Course/${currentProgress.courseId}`);
                        //const filteredCourses = response2.data.filter(data => data.courseId === coursesByManager);
                        setCourses([response2.data]);
                    }
                }
            } catch (error) {
                console.error("Error fetching courses: ", error);
            }
        };

        fetchCourseData();
    }, [user, email, checkRole, checkManager]);


    // useEffect(() => {
    //     if (!user) {
    //         console.error("Không có người dùng trong localStorage!");
    //         return;
    //     }
    //     fetch(`https://localhost:7158/api/Account/GetListAccount`, {
    //         method: "GET",
    //         headers: {
    //             "Authorization": "Bearer YOUR_ACCESS_TOKEN",
    //         }
    //     })
    //         .then(response => {
    //             if (!response.ok) {
    //                 console.error(`Lỗi load dữ liệu!`);
    //                 alert("Lỗi load dữ liệu!");
    //                 throw new Error("Lỗi load dữ liệu!");
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             if (Array.isArray(data)) {
    //                 const foundUser = data.find(accountList => accountList.userName === user);
    //                 if (foundUser) {
    //                     setCenterName(foundUser.fullName);
    //                     const roleIdFromLocalStorage = localStorage.getItem("roleId");
    //                     setRoleId(roleIdFromLocalStorage);
    //                     if (roleIdFromLocalStorage && roleIdFromLocalStorage === "3") {
    //                         setEmail(foundUser.email);
    //                     }

    //                 } else {
    //                     console.error("Lỗi load dữ liệu!");
    //                 }
    //             } else {
    //                 console.error("Lỗi load dữ liệu!");
    //             }
    //         })
    //         .catch(error => {
    //             console.error("Lỗi load dữ liệu!", error);
    //         });
    // }, []);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             if (setCheckRole) {
    //                 const response = await axios.get(`https://localhost:7158/api/Course/`);
    //                 const filteredCourses = response.data.filter(data => data.createBy === user);
    //                 setCourses(filteredCourses);
    //             }
    //             if (setCheckManager) {
    //                 const response1 = await axios.get(`https://localhost:7158/api/Course/managers/email/${email}`);
    //                 console.log(response1);
    //                 if (response1.data.length > 0) {
    //                     const currentProgress = response1.data[0];
    //                     setCoursesByManager(currentProgress.courseId);

    //                     const response2 = await axios.get(`https://localhost:7158/api/Course/`);
    //                     const filteredCourses = response2.data.filter(data => data.courseId === coursesByManager);
    //                     setCourses(filteredCourses);
    //                 }
    //             }
    //         } catch (error) {
    //             console.error("Error fetching courses: ", error);
    //         }
    //     };

    //     if (setCheckRole || setCheckManager) {
    //         fetchData();
    //     }
    // }, [setCheckRole, setCheckManager, user, email]);


    useEffect(() => {
        console.log(courses);
        // Tính tổng doanh thu
        const totalRevenue = courses.reduce((acc, course) => {
            return acc + (course.studentNumber * course.price);
        }, 0);
        setRevenue(totalRevenue);
    }, [courses]);

    const formattedRevenue = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(revenue);

    const columns = [
        {
            title: "ID",
            dataIndex: "courseId",
            key: "courseId",
            render: (text, record) => (
                <a onClick={() => navigate(`/manageCourse/${record.courseId}`)}>{record.courseId}</a>
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
        {
            title: "Thao tác",
            dataIndex: "name",
            render: (_, record) => (
                <div className="flex">
                    {checkManager ? (
                        // Nội dung cho quản lý
                        <div className="bg-orange-400 w-[100px] py-1 rounded-xl ml-10 text-center">
                            <a onClick={() => navigate(`/manageCourse/${record.courseId}`)}>Chi tiết</a>
                        </div>
                    ) : (
                        // Nội dung cho vai trò khác
                        <div className="flex">
                            <button
                                type="primary"
                                onClick={() => {
                                    setSelectedCourseId(record.courseId);
                                    setIsModalDeleteOpen(true);
                                }}
                                className="bg-orange-400 w-[100px] py-1 rounded-xl "
                            >
                                Xóa
                            </button>
                            <ModalDeleteCourse
                                courseId={selectedCourseId}
                                onDelete={handleDelete}
                                isModalOpen={isModalDeleteOpen}
                                setIsModalOpen={setIsModalDeleteOpen}
                            />
                            <div className="bg-orange-400 w-[100px] py-1 rounded-xl ml-10">
                                <Link
                                    to={`/manageCourse/update/${record.courseId}`}
                                >
                                    &nbsp;&nbsp;&nbsp;Chỉnh sửa&nbsp;&nbsp;&nbsp;
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            ),
            width: "30%",
        },
    ];

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleDelete = async (deletedCourseId) => {
        try {
            await axios.delete(`https://localhost:7158/api/course/${deletedCourseId}`);
            setCourses(prevCourses => prevCourses.filter(course => course.courseId !== deletedCourseId));
        } catch (error) {
            console.error("Error deleting course: ", error);
        } finally {
            setIsModalDeleteOpen(false);
            navigate('/admin/course', { replace: true }); // Điều hướng sau khi xóa
        }
    };

    return (
        <>
            <div className="w-full" >
                <Header />
            </div>
            <div className="w-full flex mt-16">
                {/* Side bar */}
                <div className="w-[20%]">
                    <div className="home-page">
                        <Menuleft />
                    </div>
                </div>
                <div className="w-[80%] mt-3">
                    {checkRole ?
                        <h2 className="font-bold text-2xl">Trung tâm {centerName}</h2>
                        :
                        <h2 className="font-bold text-2xl">Quản lí {centerName}</h2>
                    }
                    {checkRole ?
                        <Button
                            type="primary"
                            onClick={showModal}
                            className="flex justify-center items-center w-[250px] mr-[90px] rounded-md bottom-1 right-3 bg-orange-400 text-black font-bold py-3 px-4 rounded opacity-100 hover:opacity-80 transition-opacity mt-3"
                        >
                            Tạo khóa học
                        </Button>
                        :
                        <div></div>
                    }

                    <Modal
                        visible={isModalOpen}
                        onCancel={handleCancel}
                        okText="123456"
                        width={900}
                        footer={null}
                    >
                        <ModalCreatCourse />
                    </Modal>

                    {checkManager ?
                        <div></div>
                        :
                        <div className="absolute top-20 right-0">
                            <p className="box w-[250px] mr-[90px] rounded-md bg-orange-400 text-black font-bold py-3 px-4 rounded opacity-100 transition-opacity mt-3">
                                Tổng doanh thu của bạn: {formattedRevenue}
                            </p>
                        </div>
                    }
                    <div className="mt-10">
                        <Table
                            columns={columns}
                            dataSource={courses ?? []}
                            rowKey={(record) => record.courseId}

                        />
                    </div>
                </div>
            </div>
        </>
    );
}
