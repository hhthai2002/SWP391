import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`https://localhost:7158/api/Account/ForgotPassword/ForgotPassword?email=${email}`);
            setMessage('Email hướng dẫn đặt lại mật khẩu đã được gửi, vui lòng kiểm tra hộp thư của bạn.');
            setTimeout(() => {
                navigate('/signin');
            }, 2000);
        } catch (error) {
            setMessage('Có lỗi xảy ra, vui lòng kiểm tra lại email hoặc thử lại sau.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Quên mật khẩu</h2>
                {message && (
                    <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4" role="alert">
                        <span>{message}</span>
                    </div>
                )}
                <form onSubmit={handleForgotPassword}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Nhập email của bạn
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            placeholder="example@domain.com"
                            required
                        />
                    </div>
                    <div className="mt-6">
                        <button
                            type="submit"
                            className={`w-full bg-orange-500 text-white py-2 px-4 rounded-md shadow hover:bg-orange-600 focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            disabled={loading}
                        >
                            {loading ? 'Đang gửi...' : 'Gửi email xác nhận'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
