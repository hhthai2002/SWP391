import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table } from "antd";
import axios from "axios";
import AdminMenu from "../components/AdminMenu";
import AdminHeader from "../components/AdminHeader";
import { useNavigate } from "react-router-dom";

export default function ManageCourseDetail() {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [revenue, setRevenue] = useState(null);
    const [admin, setAdmin] = useState('');
    const [learners, setLearners] = useState([]);
    const navigate = useNavigate();

    //Thêm một state mới để lưu trữ danh sách các khoản doanh thu theo tháng:
    const [revenueByMonth, setRevenueByMonth] = useState([]);
    //Thêm trạng thái mới để lưu giữ tháng được chọn:
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    //Thêm một state mới để lưu trữ năm được chọn:
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    useEffect(() => {
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

    }, []);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`https://localhost:7158/api/Course/${courseId}`);
                setCourse(response.data);
            } catch (error) {
                console.error("Error fetching course details: ", error);
            }
        };
        fetchCourse();
    }, [courseId]);

    useEffect(() => {
        const fetchLearners = async () => {
            try {
                const learnersRes = await axios.get(`https://localhost:7158/api/course/${courseId}/users`);
                setLearners(learnersRes.data);
            } catch (error) {
                console.error("Error fetching learners: ", error);
            }
        };
        fetchLearners();
    }, [courseId]);

    useEffect(() => {
        if (course) {
            const courseRevenue = course.studentNumber * course.price;
            setRevenue(courseRevenue);
        }
    }, [course]);

    //Gọi hàm calculateRevenueByMonth trong useEffect
    useEffect(() => {
        calculateRevenueByMonth(learners);
    }, [learners]);

    //Thay đổi useEffect để gọi hàm calculateRevenueByMonthAndYear khi có sự thay đổi trong selectedMonth và selectedYear:
    useEffect(() => {
        calculateRevenueByMonthAndYear(learners, selectedMonth, selectedYear);
    }, [learners, selectedMonth, selectedYear]);

    const formattedRevenue = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(revenue);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    //hàm để tính tổng doanh thu theo tháng dựa trên danh sách học viên:
    const calculateRevenueByMonth = (learners) => {
        const revenueByMonth = {};

        for (const learner of learners) {
            const enrollDate = new Date(learner.enrollDate);
            const month = enrollDate.getMonth();
            const year = enrollDate.getFullYear();

            // Kiểm tra nếu năm của enrollDate khớp với năm được chọn
            if (year === selectedYear) {
                const key = `${month}-${year}`;

                if (revenueByMonth[key]) {
                    revenueByMonth[key] += course.price;
                } else {
                    revenueByMonth[key] = course.price;
                }
            }
        }

        setRevenueByMonth(revenueByMonth);
    };

    //Tạo một hàm mới để tính tổng doanh thu theo tháng và năm được chọn:
    const calculateRevenueByMonthAndYear = (learners, selectedMonth, selectedYear) => {
        const revenueByMonth = {};

        for (const learner of learners) {
            const enrollDate = new Date(learner.enrollDate);
            const month = enrollDate.getMonth();
            const year = enrollDate.getFullYear();

            // Kiểm tra nếu năm và tháng của enrollDate khớp với năm và tháng được chọn
            if (year === selectedYear && month === selectedMonth) {
                const key = `${month}-${year}`;

                if (revenueByMonth[key]) {
                    revenueByMonth[key] += course.price;
                } else {
                    revenueByMonth[key] = course.price;
                }
            }
        }

        setRevenueByMonth(revenueByMonth);
    };

    //Thêm một phần tử giao diện người dùng cho phép người dùng chọn tháng:
    const handleMonthChange = (event) => {
        setSelectedMonth(parseInt(event.target.value));
    };
    //Tạo một hàm xử lý sự kiện khi người dùng thay đổi năm:
    const handleYearChange = (event) => {
        setSelectedYear(parseInt(event.target.value));
    };

    //Tạo một hàm để hiển thị danh sách các năm cho người dùng chọn:
    const renderYearOptions = () => {
        const currentYear = new Date().getFullYear();
        const years = [currentYear + 2, currentYear + 1, currentYear, currentYear - 1, currentYear - 2]; // Chọn 3 năm gần nhất

        return (
            <select value={selectedYear} onChange={handleYearChange}>
                {years.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
        );
    };
    //</>
    const renderMonthOptions = () => {
        const currentYear = new Date().getFullYear();
        const months = [
            "Tháng 1",
            "Tháng 2",
            "Tháng 3",
            "Tháng 4",
            "Tháng 5",
            "Tháng 6",
            "Tháng 7",
            "Tháng 8",
            "Tháng 9",
            "Tháng 10",
            "Tháng 11",
            "Tháng 12",
        ];

        return (
            <select value={selectedMonth} onChange={handleMonthChange}>
                {months.map((month, index) => (
                    <option key={index} value={index}>
                        {`${month}`}
                    </option>
                ))}
            </select>
        );
    };
    const renderRevenueByMonth = () => {
        const selectedKey = `${selectedMonth}-${selectedYear}`;

        if (!revenueByMonth[selectedKey]) {
            return <div>Không có doanh thu cho tháng và năm này.</div>;
        }

        const revenue = revenueByMonth[selectedKey];
        const formattedRevenue = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(revenue);

        return (
            <div className="text-lg">
                {formattedRevenue}
            </div>
        );
    };

    //</>

    const learnerColumns = [
        {
            title: "Tên người dùng",
            dataIndex: "userName",
            key: "userName"
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email"
        },
        {
            title: "Ngày tham gia",
            dataIndex: "enrollDate",
            key: "enrollDate",
            render: (text) => formatDate(text),
        }
    ];

    const columns = [
        {
            title: "ID",
            dataIndex: "courseId",
            key: "courseId",
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
            title: "Người tạo",
            dataIndex: "createBy",
            key: "createBy",
        },
        {
            title: "Ngôn ngữ",
            dataIndex: "language",
            key: "language",
        },
        {
            title: "Ngày tạo",
            dataIndex: "dateUpdate",
            key: "dateUpdate",
            render: (text) => {
                const date = new Date(text);
                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
                const year = date.getFullYear();
                return `${day}/${month}/${year}`;
            },
        },
        {
            title: "BMI MIN",
            dataIndex: "bmiMin",
            key: "bmiMin",
        },
        {
            title: "BMI MAX",
            dataIndex: "bmiMax",
            key: "bmiMax",
        }
    ];

    if (!course) {
        return <div>Loading...</div>;
    }

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
                    <h2 className="font-bold text-2xl">{course.courseName}</h2>
                    <div className="flex top-0 right-0">
                        <p className="box w-[350px] mr-[90px] rounded-md bg-orange-400 text-black font-bold py-3 px-4 rounded opacity-100 transition-opacity mt-3">
                            Tổng doanh thu <br /> {course.courseName}: <br /> {formattedRevenue}
                        </p>

                        <p className="absolute right-0 box w-[450px] mr-[90px] rounded-md bg-orange-400 text-black font-bold py-3 px-4 rounded opacity-100 transition-opacity mt-3">
                            Tổng doanh thu của Tháng {renderMonthOptions()} Năm {renderYearOptions()} <br /> {course.courseName}: <br /> {renderRevenueByMonth()}
                        </p>
                    </div>
                    <div className=" w-full top-30 mt-10">
                        <Table
                            columns={columns}
                            dataSource={[course]}
                            rowKey={(record) => record.courseId}
                        />
                        <h2 className="font-bold text-2xl">Danh sách người học</h2>
                        <Table
                            columns={learnerColumns}
                            dataSource={learners}
                        />
                    </div>
                    {/* <div className=" absolute w-full top-100 mt-10">
              
            </div> */}
                </div>
            </div>
        </>
    );
}
