import React, { useState } from 'react';
import { Button } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Bmi = ({ onClose }) => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmiResult, setBmiResult] = useState(null);
    const [courseList, setCourseList] = useState([]);
    const [calculated, setCalculated] = useState(false);
    const [bmiInfo, setBmiInfo] = useState('');
    const [bmiValueInfo, setbmiValueInfo] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const bmiValue = weight / (height * height);
        setbmiValueInfo(bmiValue);
        let bmiStatus = '';

        if (bmiValue < 18.5) {
            bmiStatus = 'Thiếu cân';
        } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
            bmiStatus = 'Bình thường';
        } else if (bmiValue >= 25 && bmiValue <= 29.9) {
            bmiStatus = 'Thừa cân';
        } else {
            bmiStatus = 'Quá thừa cân';
        }
        setBmiInfo(bmiStatus);
        const bmiResult = {
            weight,
            height,
            bmiValue,
            bmiStatus,
        };

        setBmiResult(bmiResult);

        try {
            const response = await axios.get('https://localhost:7158/api/Course');
            const filteredCourses = response.data.filter(
                (course) => bmiValue >= course.bmiMin && bmiValue <= course.bmiMax
            );
            setCourseList(filteredCourses);
            console.log(filteredCourses);
            localStorage.setItem('ProposeCourse', JSON.stringify(filteredCourses));
        } catch (error) {
            console.error('Error fetching courses:', error);
        }

        setCalculated(true);
    };

    const handleNavigate = () => {
        navigate('/displayByBmi');
    };

    return (
        <div className="fixed inset-x-0 bg-opacity-30 flex justify-center items-center" style={{ zIndex: 10 }}>
            <div className="bg-rose-50 w-[500px] rounded-lg p-6 text-black shadow-lg">
                <div className="bg-orange-400 rounded-lg p-5 mx-auto text-center">
                    <h1 className="text-xl font-semibold mb-5">Hãy nhập chỉ số cơ thể của bạn</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-left ml-5">Cân nặng (kg):</label>
                            <input
                                className="mt-1 w-[90%] mx-auto block border rounded-md p-1"
                                type="number"
                                id="weight"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-left ml-5">Chiều cao (m):</label>
                            <input
                                className="mt-1 w-[90%] mx-auto block border rounded-md p-1"
                                type="number"
                                id="height"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex justify-center space-x-4 mt-5">
                            <Button
                                className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-7 py-5 text-center me-2 mb-2 flex items-center justify-center"
                                onClick={onClose}
                            >
                                Hủy
                            </Button>
                            <button
                                className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg px-5 py-2.5"
                                type="submit"
                            >
                                Xác nhận
                            </button>
                        </div>
                    </form>

                    {calculated && (
                        <div>
                            <p className="mt-5">Chỉ số của bạn: {bmiInfo}</p>
                            <button
                            onClick={handleNavigate}
                            class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                                <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    Khóa học đề xuất
                                </span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Bmi;