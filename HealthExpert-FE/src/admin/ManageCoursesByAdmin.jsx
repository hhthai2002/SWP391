import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import AdminMenu from "../components/AdminMenu";
import AdminHeader from "../components/AdminHeader";
import ModalDeleteCourse from "../components/ModalDeleteCourse";
import UpdateCourse from "../components/ModalUpdateCourse";
import { Link } from "react-router-dom";
import { format } from 'date-fns';

export default function ManageCourseByAdmin() {
    const [courses, setCourses] = useState([]);
    const [admin, setAdmin] = useState('');
    const navigate = useNavigate();
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        const roleId = parseInt(localStorage.getItem("roleId"), 10);
        if (!user) {
            console.error("Không có người dùng trong localStorage!");
            return;
        }
        if (roleId === 1) {
            setAdmin(user);
        } else {
            console.error("Bạn không phải là admin!");
            navigate('/home');
        }

    }, []);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`https://localhost:7158/api/course`);
                const courseList = response.data;
                setCourses(courseList);
            } catch (error) {
                console.error("Error fetching courses: ", error);
            }
        };
        if (admin) {
            fetchCourses();
        }
    }, [admin]);

    const columns = [
        {
            title: "Mã Khóa Học",
            dataIndex: "courseId",
            key: "courseId",
            render: (text, record) => (
                <a onClick={() => navigate(`/admin/course/${record.courseId}`)}>{record.courseId}</a>
            ),
        },
        {
            title: "Tên Khóa Học",
            dataIndex: "courseName",
            key: "courseName",
        },
        {
            title: "Giá tiền",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Số Lượng Học Viên",
            dataIndex: "studentNumber",
            key: "studentNumber",
        },
        {
            title: "Tạo Bởi",
            dataIndex: "createBy",
            key: "createBy",

        },
        {
            title: "Ngày Tạo",
            dataIndex: "dateUpdate",
            key: "dateUpdate",
            render: (text) => format(new Date(text), 'dd/MM/yyyy'),
        },
        {
            title: "Mã Thể Loại",
            dataIndex: "typeId",
            key: "typeId",
        },
        {
            title: "Thao tác",
            dataIndex: "name",
            render: (_, record) => (
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
                    {/* <div className="bg-orange-400 w-[100px] py-1 rounded-xl ml-10 flex justify-center items-center">
                        <Link

                            to={`/admin/course/update/${record.courseId}`}
                        >
                            Chỉnh sửa
                        </Link>
                    </div> */}

                </div>
            ),
            width: "30%",
        },
    ];

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
            <div className="w-full">
                <AdminHeader />
            </div>
            <div className="w-full flex">
                <div className="w-[20%] h-full">
                    <div className="home-page">
                        <AdminMenu />
                    </div>
                </div>
                <div className="w-[80%] mt-3">
                    <h2 className="font-bold text-2xl">WELCOME {admin}</h2>
                    <div className="mt-10">
                        <Table
                            columns={columns}
                            dataSource={courses}
                            rowKey={(record) => record.courseId}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
