import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AdminMenu from "./AdminMenu";
import AdminHeader from "./AdminHeader";

function UpdateAccount() {
    const { accountId } = useParams();
    const [accountData, setAccountData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await axios.get(
                    `https://localhost:7158/api/Account/GetAccountById/${accountId}`
                );
                setAccountData(response.data);
            } catch (error) {
                console.error("Error fetching course data: ", error);
            }
        };
        fetchCourseData();
    }, [accountId]);

    const axiosInstance = axios.create({
        baseURL: 'https://localhost:7158/api/',
        timeout: 5000 // Timeout sau 5 giây
    });

    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.put(
                `Account/UpdateAccount/${accountId}`,
                accountData
            );
            if (response) {
                window.location.reload();
            } else {
                console.error("Error fetching course data: ");
            }
        } catch (error) {
            console.error("Error fetching course data: ", error);
        }
    };

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
            </div>
            <div className="  text-black p-5">
                <form
                    className="bg-orange-400 h-[500px] w-[70%]  mx-auto"
                    onSubmit={HandleSubmit}
                >
                    <div className="flex  flex-col">
                        <div>
                            <h1 className="text-center text-2xl">CHỈNH SỬA TÀI KHOẢN</h1>
                        </div>
                        <div className="flex">
                            <div className="w-1/2 mt-5 ml-5">
                                <div className="">
                                    <div>Tên người dùng</div>
                                    <input
                                        type="text"
                                        name="userName"
                                        className="form-control  w-[300px] rounded-md rounded-md py-2 mt-3"
                                        placeholder="Nhập tên tài khoản"
                                        value={accountData.userName}
                                        onChange={(e) =>
                                            setAccountData({ ...accountData, userName: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="mt-3">
                                    <div className="">Mật khẩu</div>
                                    <input
                                        type="text"
                                        name="password"
                                        className="form-control w-[300px] py-2 mt-3 rounded-md"
                                        placeholder="Nhập mật khẩu"
                                        value={accountData.password}
                                        onChange={(e) =>
                                            setAccountData({ ...accountData, password: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="mt-3">
                                    <div>Email</div>
                                    <input
                                        type="text"
                                        name="email"
                                        className="form-control w-[300px] py-2 mt-3 rounded-md"
                                        placeholder="Nhập email"
                                        value={accountData.email}
                                        onChange={(e) =>
                                            setAccountData({
                                                ...accountData,
                                                email: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="mt-3">
                                    <div>Số điện thoại</div>
                                    <input
                                        type="text"
                                        name="phone"
                                        className="form-control w-[300px] py-2 mt-3 rounded-md"
                                        placeholder="Nhập số điện thoại"
                                        value={accountData.phone}
                                        onChange={(e) =>
                                            setAccountData({
                                                ...accountData,
                                                phone: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="w-1/2 mt-5">
                                <div className="">
                                    <div>Ngày sinh</div>
                                    <input
                                        type="text"
                                        name="birthDate"
                                        className="form-control w-[300px] py-2 mt-3 rounded-md"
                                        placeholder="Nhập ngày sinh"
                                        value={accountData.birthDate}
                                        onChange={(e) =>
                                            setAccountData({ ...accountData, birthDate: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="mt-3">
                                    <div>Họ và tên</div>
                                    <input
                                        type="text"
                                        name="fullName"
                                        className="form-control w-[300px] py-2 mt-3 rounded-md"
                                        placeholder="Nhập họ và tên"
                                        value={accountData.fullName}
                                        onChange={(e) =>
                                            setAccountData({ ...accountData, fullName: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="">
                                    <div>Ngày tạo</div>
                                    <input
                                        type="text"
                                        name="createDate"
                                        className="form-control w-[300px] py-2 mt-3 rounded-md"
                                        placeholder="Nhập ngày tạo"
                                        value={accountData.createDate}
                                        onChange={(e) =>
                                            setAccountData({ ...accountData, createDate: e.target.value })
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="w-[250px] mr-[90px] rounded-md absolute bottom-20 right-[140px]	 bg-black hover:bg-blue-600 text-white font-bold py-3 px-4 rounded opacity-100 hover:opacity-80 transition-opacity mt-3">
                        Chỉnh sửa
                    </button>
                </form>
            </div>
        </>

    );
}

export default UpdateAccount;
