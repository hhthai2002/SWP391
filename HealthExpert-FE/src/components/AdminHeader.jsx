import React, { useEffect, useState } from "react";
import Logo from "../img/logo.png";
import Post from "./Post";
import { useNavigate } from "react-router-dom";
import { Avatar, Menu, Dropdown } from "antd";
import { Button, Modal } from "antd";
import {
    UserOutlined,
    SolutionOutlined,
    LockOutlined,
    TranslationOutlined,
    PoweroffOutlined
} from "@ant-design/icons";
import Bmi from "../page/Services/bmi"
import ModalCreatCourse from "./ModalCreatCourse";

const AdminHeader = () => {
    const navigate = useNavigate()
    const [postOpen, setPostOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [checkRole, setCheckRole] = useState(false);
    const [showBmiForm, setShowBmiForm] = useState(false);
    const [username, setUsername] = useState("");
    const [roleId, setRoleId] = useState(""); // State to track whether user is logged in
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const isUserLoggedIn = localStorage.getItem("user");

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        //localStorage.removeItem("ProposeCourse");

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
                    const foundUser = data.find(accountList => accountList.userName === isUserLoggedIn);
                    if (foundUser) {
                        localStorage.setItem("roleId", foundUser.roleId);
                    } else {
                        console.error("Lỗi load dữ liệu!");
                    }
                } else {
                    console.error("Lỗi load dữ liệu!");
                }
            })
            .catch(error => {
                console.error("Lỗi load dữ liệu!", error);
            })
            .finally(() => {
                setIsLoaded(true);
            });

        // Check if user is logged in using your preferred method (e.g., checking local storage)

    }, []);

    useEffect(() => {
        if (isLoaded && isUserLoggedIn) {
            setLoggedIn(true);
            console.log(localStorage.getItem("user"));
            setUsername(localStorage.getItem("user"));
            const roleIdFromLocalStorage = localStorage.getItem("roleId");
            setRoleId(roleIdFromLocalStorage);
            if (roleIdFromLocalStorage && roleIdFromLocalStorage === "2") {
                setCheckRole(true);
            }
        }
        // if (!isReloaded) {
        //   setIsReloaded(true);
        //window.location.reload();
        setIsLoaded(false);
        // }
    }, [isLoaded, isUserLoggedIn]);
    // Function to handle logout
    const handleLogout = () => {
        // Perform logout logic here
        localStorage.removeItem("user"); // Assuming you set userName in localStorage during login
        localStorage.removeItem("currentCourse");
        localStorage.removeItem("currentSession");
        localStorage.removeItem("accountId");
        localStorage.removeItem("roleId");
        setLoggedIn(false);
        setUsername("");
        const route = '/signin'; // Specify the desired route path
        navigate(route, { replace: true });
        window.location.reload();
    };

    const toggleBmiForm = () => {
        setShowBmiForm(!showBmiForm);
    };

    function WidgetMenu(props) {
        return (
            <Menu>
                {/* <Menu.Item>
                    <a href="/admin/profile">Trang Cá Nhân</a>
                </Menu.Item>
                <Menu.Item>
                    <a href="/admin/resetPassword"> Đổi Mật Khẩu</a>
                </Menu.Item> */}
                <Menu.Item onClick={handleLogout}>
                    Đăng xuất
                </Menu.Item>
            </Menu>
        );
    }


    return (
        <header className="border-b py-1.2 px-1.2 sm:px-10 bg-white font-[sans-serif] min-h-[70px]">
            <div className="flex flex-wrap items-center gap-x-2 max-lg:gap-y-6 mt-2">
                <a href='/admin'>
                    <img src={Logo} alt="logo" className="w-16 h-16 rounded-full" />
                </a>
                <div className="ml-auto flex mr-3">
                    {
                        loggedIn ?
                            <div className="lg:!flex lg:ml-14 lg:space-x-5 max-lg:space-y-2 max-lg:hidden max-lg:py-4 max-lg:w-full">
                                <p className="mr-2 text-gray-700">{username}</p>
                                <Dropdown overlay={<WidgetMenu />}>
                                    <Avatar icon={<UserOutlined />} />
                                </Dropdown>
                            </div>
                            :
                            <div>
                                <a href="/signin">
                                    {" "}
                                    <button className="bg-orange-500 text-white py-2 px-4 rounded transition-opacity hover:bg-opacity-80 mr-1">
                                        Đăng nhập
                                    </button>
                                </a>
                            </div>
                    }
                </div>
            </div>
        </header>
    );
}
export default AdminHeader;
