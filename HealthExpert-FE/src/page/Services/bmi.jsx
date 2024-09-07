import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UploadOutlined, CloseCircleOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';
import { Form, Input } from 'antd';
import axios from 'axios';
import BmiCoursePage from './BmiCoursePage';
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
            bmiStatus = 'Thiều Cân';
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
            bmiStatus
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
        // Chuyển trang khi click vào nút
        navigate('/displayByBmi'); // Thay đổi '/next-page' bằng đường dẫn bạn muốn chuyển đến
    };

    return (
        <div
            className="fixed inset-0 bg-opacity-30 flex justify-center items-center"
            style={{ zIndex: 10 }}
        >
            <div className=" bg-white w-[500px] rounded-xl   h-[350px] text-black">
                <div className="bg-orange-400  rounded-xl mt-5 mx-auto w-[400px] h-[250px] tems-center ">
                    <div className="flex flex-col ">
                        <h1 className="text-center text-xl">Hãy nhập chỉ số cơ thể của bạn</h1>
                        <div>
                            <form onSubmit={handleSubmit}>
                                <div className="ml-5">
                                    <div>Cân nặng (kg):</div>

                                    <input
                                        className="mt-1"
                                        type="number"
                                        id="weight"
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <div className="mt-3 ml-5">Chiều cao (m):</div>
                                    <input
                                        className="ml-5 mt-1 "
                                        type="number"
                                        id="height"
                                        value={height}
                                        onChange={(e) => setHeight(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex ml-10 mt-3">
                                    <Button
                                        className="text-red-600 font-bold mt-5 bg-white w-[150px] rounded-sm h-[40px]"
                                        onClick={onClose}
                                    >
                                        Hủy{" "}
                                    </Button>
                                    <button
                                        className="text-white hover:text-blue-500 mt-5  opcaity-0.8  ml-5 bg-black w-[150px] rounded-sm h-[40px]"
                                        type="submit"
                                    >
                                        Xác nhận
                                    </button>
                                </div>
                            </form>
                        </div>
                        {calculated && (
                            <div>
                                <p className="mx-auto block text-center mt-1" >Chỉ số của bạn: {bmiInfo}</p>
                                <button className="text-white hover:text-blue-500 mt-5 opcaity-0.8  bg-black w-[150px] rounded-sm h-[40px] mx-auto block" onClick={handleNavigate}>Khóa học đề xuất</button>

                            </div>

                        )}
                    </div>
                </div>
            </div>
            {/* <BmiCoursePage courseList={courseList} /> */}
        </div>
    );
};

export default Bmi;