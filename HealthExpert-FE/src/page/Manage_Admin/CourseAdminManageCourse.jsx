import React, { useEffect, useState } from "react";
import axios from "axios";
import Menuleft from "../../components/MenuLeft";
import Header from "../../components/Header";
import { Table, Modal, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Space, Tag } from "antd";
import ModalDeleteCourseManager from "../../components/ModelDeleteCourseManager";

export default function ManageCourseManager() {
    const [accounts, setAccounts] = useState([]);
    const [admin, setAdmin] = useState('');
    const [revenue, setRevenue] = useState(0); // Thêm state để lưu tổng doanh thu
    const navigate = useNavigate(); // Sử dụng useHistory
    const [selectedAccountId, setSelectedAccountId] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem("user");

        if (!user) {
            console.error("Không có người dùng trong localStorage!");
            return;
        }
        setAdmin(user);
    }, []);

    useEffect(() => {
        const roleIdFromLocalStorage = localStorage.getItem("roleId");
        if (roleIdFromLocalStorage && roleIdFromLocalStorage === "4") {
            navigate('/home');
        }
    }, []);

    // Fetch
    useEffect(() => {
        const fetchCourseManager = async () => {
            try {
                const userRes = await axios.get(`https://localhost:7158/api/Account/GetListAccount`);
                const matchingUser = userRes.data.filter(user => user.roleId === 3);
                const accumulatedAccounts = [];
                for (const user of matchingUser) {
                    const cmRes = await axios.get(`https://localhost:7158/api/Course/managers/email/${user.email}`);
                    const coursesWithId = cmRes.data.map(course => ({
                        ...course,
                        email: user.email,
                        accountId: user.accountId
                    }));
                    accumulatedAccounts.push(...coursesWithId);
                }

                setAccounts(accumulatedAccounts);
            } catch (error) {
                console.error("Error fetching courses: ", error);
            }
        };
        if (admin) {
            fetchCourseManager();
        }
    }, [admin]);

    //Collumn
    const columns = [
        {
            title: "Mã khóa học",
            dataIndex: "courseId",
            key: "courseId",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Thao tác",
            dataIndex: "name",
            render: (_, record) => (
                <div className="flex">
                    <button
                        type="primary"
                        onClick={() => {
                            setSelectedAccountId(record.accountId);
                            setIsModalDeleteOpen(true);
                        }}
                        className="bg-orange-400 w-[100px] py-1 rounded-xl "
                    >
                        Xóa
                    </button>

                    <ModalDeleteCourseManager
                        accountId={selectedAccountId}
                        onDelete={handleDelete}
                        isModalOpen={isModalDeleteOpen}
                        setIsModalOpen={setIsModalDeleteOpen}
                    />

                </div>
            ),

        },

    ];

    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

    const showModalDelete = () => {
        setIsModalDeleteOpen(true);
    };

    const handleDelete = async (accountId) => {
        try {
            const response = await axios.get(`https://localhost:7158/api/Account/GetAccountById/${accountId}`);
            const accountData = response.data;
            const accountEmail = accountData.email;

            await axios.delete(`https://localhost:7158/api/Course/managers/email/${accountEmail}`);
            setAccounts(prevAccounts => prevAccounts.filter(account => account.email !== accountEmail));
        } catch (error) {
            console.error("Error deleting course: ", error);
        } finally {
            setIsModalDeleteOpen(false);
            navigate('/manageManager', { replace: true }); // Redirect after deletion
        }
    };


    //HTML
    return (
        <>
            <div className="w-full" >
                <Header />
            </div>
            <div className="w-full flex">
                {/* Side bar */}
                <div className="w-[20%]">
                    <div className="home-page">
                        <Menuleft />
                    </div>
                </div>
                {/* End Side Bar */}

                {/* Body */}
                <div className="w-[80%] mt-3">
                    <h2 className="font-bold text-2xl">WELCOME {admin}</h2>
                    <div className="mt-10">
                        <Table
                            columns={columns}
                            dataSource={accounts.filter(account => account.courseId !== null).map(account => ({ ...account, key: account.accountId }))}
                        />


                    </div>
                </div>
                {/* End Body */}
            </div>
        </>
    );
}