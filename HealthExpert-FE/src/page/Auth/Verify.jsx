import React from 'react';
import { Form, Input, Checkbox, List } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Button from "../../components/button";
import backgroundImage from "../../img/nike.png";
import helpexpert from "../../img/logo.png";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import bg from "../../img/ForgotPassGym.jpg";

export default function Verify() {
    const [token, setToken] = useState('');
    const [userName, setUserName] = useState("");
    const [entityToken, setEntityToken] = useState('');
    const [checkToken, setCheckToken] = useState(false);
    const history = useNavigate();
    function getToken() {
        fetch(`https://localhost:7158/api/Account/GetListAccount`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer YOUR_ACCESS_TOKEN",
            }
        })
            .then(response => {
                if (!response.ok) {
                    console.error(`Error: Failed to get Entity Token.`);
                    alert("Failed to get Entity Token");
                    throw new Error("Failed to get Entity Token");
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                if (Array.isArray(data)) {
                    const foundUser = data.find(accountList => accountList.userName === userName);
                    if (foundUser) {
                        setEntityToken(foundUser.verificationToken);
                        setCheckToken(true);
                    } else {
                        setEntityToken("Failed to get Entity Token.");
                    }
                } else {
                    setEntityToken("Data is not an array.");
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }
    function verifyAccount() {
        // Make a GET request to the backend API for account verification
        fetch(`https://localhost:7158/api/Auth/Verify/verify?token=${entityToken}`, { method: 'POST' })
            .then(data => {
                console.log(data.status);
                history("/signin");
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error verifying account. Please try again.');
            });
    }
    return (
        <div className="flex justify-center items-center h-screen" style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            {/* <img src={bg} alt="" /> */}
            <div className="w-[30%] h-[600px] border border-[5px] border-orange-400 rounded-lg bg-white">
                <div className="p-4">
                    <h1 className="text-orange-400 m-10 text-center text-3xl"><strong>Xác thực tài khoản</strong></h1>

                    <div className="mb-4 flex flex-col justify-center items-center">
                        <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
                            Nhập tên tài khoản:
                        </label>
                        <Input
                            type="text"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Tên tài khoản"
                            className="h-[50px] w-[450px] border border-[3px] border-orange-400 rounded-lg hover:border-orange-400"
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <button
                            onClick={getToken}
                            style={{ backgroundColor: '#FFA500', color: 'white' }}
                            className="font-bold rounded-lg bg-orange-400 p-3 h-[50px] w-[450px] text-white hover:bg-black mt-5"
                        >
                            Lấy Token
                        </button>
                    </div>
                    {checkToken && (
                        <div className="w-full flex flex-col justify-center items-center">
                            <button
                                onClick={verifyAccount}
                                style={{ backgroundColor: '#FFA500', color: 'white' }}
                                className="font-bold rounded-lg bg-orange-400 p-3 h-[50px] w-[450px] text-white hover:bg-orange-500 mt-5"
                            >
                                Xác thực tài khoản
                            </button>
                        </div>

                    )
                    }
                </div>
            </div>
        </div>

    );
}