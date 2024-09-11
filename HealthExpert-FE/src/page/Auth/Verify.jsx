import React, { useState } from 'react';
import { Input, notification, Spin } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import bg from "../../img/ForgotPassGym.jpg";

export default function Verify() {
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false); // State to control loading effect
    const history = useNavigate();

    // Function to show success notification
    const openNotification = () => {
        notification.success({
            message: "Xác thực thành công",
            description: "Tài khoản của bạn đã được xác thực thành công.",
            duration: 3, // Auto close after 3 seconds
        });
    };

    function verifyAccount() {
        setLoading(true); // Start loading
        // Make a POST request to the backend API for account verification
        fetch(`https://localhost:7158/api/Auth/Verify/verify?token=${token}`, { method: 'POST' })
            .then(data => {
                if (data.ok) {
                    openNotification(); // Show success notification
                    setLoading(false); // Stop loading
                    setTimeout(() => {
                        history("/signin"); // Redirect to sign-in page after 3 seconds
                    }, 3000);
                } else {
                    throw new Error("Failed to verify account");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false); // Stop loading in case of error
                alert('Error verifying account. Please try again.');
            });
    }

    return (
        <div className="flex justify-center items-center h-screen" style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="w-[30%] h-[600px] border border-[5px] border-orange-400 rounded-lg bg-white">
                <div className="p-4">
                    <h1 className="text-orange-400 m-10 text-center text-3xl"><strong>Xác thực tài khoản</strong></h1>

                    <div className="mb-4 flex flex-col justify-center items-center">
                        <label htmlFor="token" className="block text-gray-700 font-bold mb-2">
                            Nhập mã xác thực:
                        </label>
                        <Input
                            type="text"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Mã xác thực"
                            className="h-[50px] w-[450px] border border-[3px] border-orange-400 rounded-lg hover:border-orange-400"
                            onChange={(e) => setToken(e.target.value)}
                        />

                        <Spin spinning={loading}> {/* Wrap the button with Spin for loading effect */}
                            <button
                                onClick={verifyAccount}
                                style={{ backgroundColor: '#FFA500', color: 'white' }}
                                className="font-bold rounded-lg bg-orange-400 p-3 h-[50px] w-[450px] text-white hover:bg-black mt-5"
                                disabled={loading} // Disable the button while loading
                            >
                                Xác thực tài khoản
                            </button>
                        </Spin>
                    </div>
                </div>
            </div>
        </div>
    );
}
