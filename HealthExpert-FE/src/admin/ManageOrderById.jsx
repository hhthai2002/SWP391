import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Modal, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Space, Tag } from "antd";
import { useParams } from "react-router-dom";
import AdminMenu from "../components/AdminMenu";
import AdminHeader from "../components/AdminHeader";

export default function ManageOrderByIdByAdmin() {
    const { orderId } = useParams();
    const [orders, setOrders] = useState([]);
    const [admin, setAdmin] = useState('');
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
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`https://localhost:7158/api/Order/GetOrderById?id=${orderId}`);
                const orderList = response.data;

                //Fetch Account DTO
                const fetchAccountDTO = async (accountId) => {
                    try {
                        const response = await axios.get(`https://localhost:7158/api/Account/GetAccountById?id=${accountId}`);
                        console.log("Response Data:", response.data);
                        return response.data;
                    } catch (error) {
                        console.error("Error fetching AccountDTO: ", error);
                        return null;
                    }
                };

                // Lặp qua từng bài đăng và cập nhật accountId thành accountUsername
                const updatedBillList = await Promise.all(
                    orderList.map(async (order) => {
                        try {
                            const accountDTO = await fetchAccountDTO(order.accountId);
                            const accountUsername = accountDTO ? accountDTO.userName : "";
                            const updatedOrder = { ...order, accountUsername };
                            return updatedOrder;
                        } catch (error) {
                            console.error("Error fetching AccountDTO: ", error);
                            return order;
                        }
                    })
                );

                setOrders(updatedBillList);
            } catch (error) {
                console.error("Error fetching bills: ", error);
            }
        };
        if (admin) {
            fetchOrders();
        }
    }, [admin]);

    //Collumn
    const columns = [
        {
            title: "Mã Order",
            dataIndex: "orderId",
            key: "orderId",
        },
        {
            title: "Thời Gian Order",
            dataIndex: "orderTime",
            key: "orderTime",
        },
        {
            title: "Đơn Giá",
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
            title: "Giảm Giá",
            dataIndex: "discount",
            key: "discount",
        },
        {
            title: "Người Dùng",
            dataIndex: "accountUsername",
            key: "accountUsername",
        },
        {
            title: "Khóa Học",
            dataIndex: "courseId",
            key: "courseId",
            // render: (text, record) => (
            //     <a onClick={() => navigate(`/admin/manageCourse/${record.courseId}`)}>{record.courseId}</a>
            // ),
        },

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
                <div className="w-[20%]">
                    <div className="home-page">
                        <AdminMenu />
                    </div>
                </div>
                {/* End 
                {/* End Side Bar */}

                {/* Body */}
                <div className="w-[80%] mt-3">
                    <h2 className="font-bold text-2xl">WELCOME {admin}</h2>
                    <div className="mt-10">
                        <Table
                            columns={columns}
                            dataSource={orders}
                        />
                    </div>
                </div>
                {/* End Body */}
            </div>
        </>
    );
}
