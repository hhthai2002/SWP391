import React, { useState, useEffect } from 'react';
import { Input, notification } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import bg from "../../img/ForgotPassGym.jpg";
import Header from "../../components/Header";

export default function ResetPassword() {
    const [userName, setUserName] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const history = useNavigate();

    useEffect(() => {
        // Lấy tên người dùng từ localStorage
        const storedUserName = localStorage.getItem('user');
        if (storedUserName) {
            setUserName(storedUserName);
        } else {
            // Nếu không có tên người dùng trong localStorage, chuyển hướng về trang đăng nhập
            history("/signin");
        }
    }, [history]);

    function resetPassword() {
        if (newPassword !== confirmPassword) {
            alert("Mật khẩu mới và xác nhận mật khẩu không khớp.");
            return;
        }

        fetch(`https://localhost:7158/api/Account/ChangePassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: userName,
                oldPassword: oldPassword,
                newPassword: newPassword,
                confirmPassword: confirmPassword,
            }),
        })
            .then(response => {
                if (response.ok) {
                    // Hiển thị thông báo thành công
                    notification.success({
                        message: 'Thành công',
                        description: 'Mật khẩu đã được đổi thành công.',
                        onClose: () => {
                            // Đăng xuất và chuyển hướng
                            localStorage.removeItem('user'); // Xóa thông tin người dùng
                            history("/signin"); // Chuyển hướng đến trang đăng nhập
                        },
                    });
                } else {
                    console.error('Lỗi:', response.statusText);
                    alert('Lỗi khi đặt lại mật khẩu. Vui lòng thử lại.');
                }
            })
            .catch(error => {
                console.error('Lỗi:', error);
                alert('Lỗi khi đặt lại mật khẩu. Vui lòng thử lại.');
            });
    }

    return (
        <>
            <div className="home-page">
                <Header />
            </div>
            <div className="flex justify-center items-center h-screen" style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="w-[30%] h-[600px] border border-[5px] border-orange-400 rounded-lg bg-white">
                    <div className="p-4">
                        <h1 className="text-orange-400 m-10 text-center text-3xl"><strong>Đổi mật khẩu</strong></h1>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                                Tên Đăng Nhập:
                            </label>
                            <Input
                                type="text"
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder={userName}
                                className="w-full py-3"
                                disabled
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="oldPassword" className="block text-gray-700 font-medium mb-2">
                                Nhập Mật Khẩu Cũ:
                            </label>
                            <Input.Password
                                id="oldPassword"
                                placeholder="Nhập mật khẩu cũ"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="w-full py-3"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-2">
                                Nhập Mật Khẩu Mới:
                            </label>
                            <Input.Password
                                id="newPassword"
                                placeholder="Nhập mật khẩu mới"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full py-3"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                                Xác Nhận Mật Khẩu Mới:
                            </label>
                            <Input.Password
                                id="confirmPassword"
                                placeholder="Xác nhận mật khẩu mới"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full py-3"
                            />
                        </div>
                        <button
                            onClick={resetPassword}
                            style={{ backgroundColor: '#FFA500', color: 'white' }}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Đặt Lại Mật Khẩu
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
