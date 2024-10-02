import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Modal, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Space, Tag } from "antd";
import AdminMenu from "../components/AdminMenu";
import AdminHeader from "../components/AdminHeader";
import { Link } from "react-router-dom";

export default function ManageLearner() {
    const [accounts, setAccounts] = useState([]);
    const [admin, setAdmin] = useState('');
    const [revenue, setRevenue] = useState(0); // Thêm state để lưu tổng doanh thu
    const navigate = useNavigate(); // Sử dụng useHistory

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

    // Fetch
    useEffect(() => {
        const fetchServiceCenter = async () => {
            try {
                const response = await axios.get(`https://localhost:7158/api/Account/GetListAccount`);
                const accountList = response.data;
                const filteredAccounts = accountList.filter((account) => account.roleId === 4 || account.roleId === 3);

                setAccounts(filteredAccounts);
            } catch (error) {
                console.error("Error fetching courses: ", error);
            }
        };
        if (admin) {
            fetchServiceCenter();
        }
    }, [admin]);

    const handleStatusChange = async (record) => {
        try {
            // Check if record has an id property
            if (!record || !record.accountId) {
                console.error("Invalid record: ", record);
                return;
            }
            if (record.isActive) {
                const response = await axios.post(`https://localhost:7158/api/Account/DeleteAccount/${record.accountId}`);
                console.log("Status updated successfully!");
                window.location.reload();
            } else {
                const response = await axios.post(`https://localhost:7158/api/Account/EnableAccount/${record.accountId}`);
                console.log("Status updated successfully!");
                window.location.reload();
            }
            // Calculate updated value for isActive
            //const updatedIsActive = record.isActive ? false : true;

            // Send PUT request to update isActive field

        } catch (error) {
            console.error("Error updating status: ", error);
        }
    };

    //Collumn
    const columns = [
        {
            title: "Username",
            dataIndex: "userName",
            key: "userName",
        },
        {
            title: "Họ Và Tên",
            dataIndex: "fullName",
            key: "fullName",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Số Điện Thoại",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Trạng Thái",
            dataIndex: "isActive",
            key: "isActive",
            render: (isActive, record) => (
                <Button
                    type="primary"
                    style={{ backgroundColor: isActive ? "green" : "red" }}
                    onClick={() => handleStatusChange(record)}
                    className="w-[80px]"
                >
                    {isActive ? "Enable" : "Disable"}
                </Button>
            ),
        },
        // {
        //     title: "Thao tác",
        //     dataIndex: "name",
        //     render: (_, record) => (
        //         <div>
        //             <Link
        //                 to={`/admin/account/update/${record.accountId}`}
        //                 className="bg-orange-400 w-[100px] py-1 rounded-xl"
        //             >
        //                 &nbsp;&nbsp;&nbsp;Chỉnh sửa&nbsp;&nbsp;&nbsp;
        //             </Link>
        //         </div>
        //     ),
        //     width: "30%",
        // },
    ];

    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

    const showModalDelete = () => {
        setIsModalDeleteOpen(true);
    };


    //HTML
    return (
        <>
            <div className="w-full" >
                <AdminHeader />
            </div>
            <div className="w-full flex">
                {/* Side bar */}
                <div className="w-[20%] h-full">
                    <div className="home-page">
                        <AdminMenu />
                    </div>
                </div>
                {/* End Side Bar */}

                {/* Body */}
                <div className="w-[80%] mt-3">
                    <h2 className="font-bold text-2xl">WELCOME {admin}</h2>
                    <div className="mt-10">
                        <Table
                            columns={columns}
                            dataSource={accounts}
                        />
                    </div>
                </div>
                {/* End Body */}
            </div>
        </>
    );
}
