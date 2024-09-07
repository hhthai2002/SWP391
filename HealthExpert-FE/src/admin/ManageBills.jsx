import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Modal, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Space, Tag } from "antd";
import AdminMenu from "../components/AdminMenu";
import AdminHeader from "../components/AdminHeader";
import { format } from 'date-fns';

export default function ManageBillByAdmin() {
    const [bills, setBills] = useState([]);
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
        const fetchBills = async () => {
            try {
                const response = await axios.get(`https://localhost:7158/api/Bill/getBills`);
                const billList = response.data;

                //Fetch Account DTO
                const fetchAccountDTO = async (accountId) => {
                    try {
                        const response = await axios.get(`https://localhost:7158/api/Account/GetAccountById/${accountId}`);
                        return response.data;
                    } catch (error) {
                        console.error("Error fetching AccountDTO: ", error);
                        return null;
                    }
                };

                // Lặp qua từng bài đăng và cập nhật accountId thành accountUsername
                const updatedBillList = await Promise.all(
                    billList.map(async (bill) => {
                        try {
                            const accountDTO = await fetchAccountDTO(bill.accountId);
                            const accountUsername = accountDTO ? accountDTO.userName : "";
                            const updatedBill = { ...bill, accountUsername };
                            return updatedBill;
                        } catch (error) {
                            console.error("Error fetching AccountDTO: ", error);
                            return bill;
                        }
                    })
                );

                setBills(updatedBillList);
            } catch (error) {
                console.error("Error fetching bills: ", error);
            }
        };
        if (admin) {
            fetchBills();
        }
    }, [admin]);

    //Collumn
    const columns = [
        {
            title: "Mã Giao Dịch",
            dataIndex: "bankTranNo",
            key: "bankTranNo",
            render: (text) => (
                <span>{text.replace("VNP", "")}</span>
            ),
        },
        {
            title: "Mã Order",
            dataIndex: "orderId",
            key: "orderId",
            render: (text, record) => (
                <a >{record.orderId}</a>
                //onClick={() => navigate(`/admin/manageOrder/${record.orderId}`)}
            ),
        },
        {
            title: "Người Dùng",
            dataIndex: "accountUsername",
            key: "accountUsername",
        },
        {
            title: "Đơn Giá",
            dataIndex: "amount",
            key: "amount",
            render: (text) => (
                <span>
                    {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    }).format(text / 100)} {/* Chia amount cho 100 */}
                </span>
            ),
        },
        {
            title: "Thời Gian",
            dataIndex: "billTime",
            key: "billTime",
            render: (text) => format(new Date(text), 'HH:mm dd/MM/yyyy '),
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
                {/* End Side Bar */}

                {/* Body */}
                <div className="w-[80%] mt-3">
                    <h2 className="font-bold text-2xl">WELCOME {admin}</h2>
                    <div className="mt-10">
                        <Table
                            columns={columns}
                            dataSource={bills}
                        />
                    </div>
                </div>
                {/* End Body */}
            </div>
        </>
    );
}
