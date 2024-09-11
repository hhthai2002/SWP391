import React from 'react';
import { Form, Input, Checkbox, List } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import Button from "../../components/button";
import { Link, useNavigate } from 'react-router-dom';
import bg from "../../img/ForgotPassGym.jpg";

const Forgotpassword = () => {
    const [userName, setUsername] = useState("");
    const navigate = useNavigate();

    const handleForgotPassword = () => {
        fetch(`https://localhost:7158/api/Account/ForgotPassword?username=${userName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to request password reset.');
                }
                // Lưu tên người dùng vào localStorage
                localStorage.setItem('user', userName);
                // Xử lý thành công ở đây
                console.log('Password reset request sent.');
                navigate('/resetpassword');
            })
            .catch(error => {
                console.error('Error:', error);
                // Xử lý lỗi ở đây
            });
    };

    return (
        <div className="flex justify-center items-center h-screen" style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            {/* <img src={bg} alt="" /> */}
            <div className="w-[30%] h-[500px] border border-[5px] border-orange-400 rounded-lg bg-white">
                <h1 className="text-orange-400 m-10 text-center text-3xl"><strong>Quên mật khẩu</strong></h1>
                <div className="ml-10 mr-10 flex justify-center">
                    <Form>
                        <Form.Item>
                            <p className="text-base font-bold mb-5">Tên người dùng</p>
                            <Input
                                prefix={<UserOutlined />}
                                placeholder="Nhập tên tài khoản của bạn"
                                value={userName}
                                onChange={e => setUsername(e.target.value)}
                                className="h-[50px] w-[450px] border border-[3px] border-orange-400 rounded-lg hover:border-orange-400"
                            />
                        </Form.Item>
                        <Form.Item>
                            <button className="font-bold rounded-lg bg-orange-400 p-3 h-[50px] w-[450px] text-white hover:bg-orange-500 mt-10" type="primary" onClick={handleForgotPassword}>
                                Xác nhận
                            </button>
                        </Form.Item>
                        <Form.Item>
                            <div className="flex flex-row mt-10">
                                <p>Bạn đã có tài khoản &nbsp;</p>
                                <a href="/signin" className="font-bold text-orange-400 hover:text-orange-500" type="primary" onClick={handleForgotPassword}>
                                    Đăng nhập
                                </a>
                            </div>
                        </Form.Item>
                    </Form>
                </div>

            </div>
        </div>

    );

};

export default Forgotpassword;