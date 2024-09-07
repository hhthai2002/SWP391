import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import axios from "axios";

const ModalNutriRecommend = ({ sessionId }) => {
    const [description, setDescription] = useState("");

    // useEffect để lấy thông tin dinh dưỡng khi sessionId thay đổi
    useEffect(() => {
        const fetchNutrition = async () => {
            try {
                // Gửi yêu cầu GET trực tiếp đến API
                const response = await axios.get("https://localhost:7158/api/Nutrition");
                // Lấy danh sách dinh dưỡng từ dữ liệu phản hồi
                const nutritionList = response.data;
                // Tìm dinh dưỡng phù hợp với sessionId
                const nutrition = nutritionList.find(nutrition => nutrition.sessionId === sessionId);
                // Nếu tìm thấy, cập nhật state với thông tin dinh dưỡng
                if (nutrition) {
                    setDescription(nutrition.description);
                    // Đặt giá trị ban đầu cho các trường trong form
                }
            } catch (error) {
                console.error("Error fetching nutrition:", error);
                // Xử lý lỗi nếu cần thiết
                message.error("Failed to fetch nutrition information");
            }
        };

        if (sessionId) {
            fetchNutrition();
        }
    }, [sessionId]);

    return (
        <>
            <div className="h-[300px]">
                <h1 className="text-center text-3xl mb-5 text-orange-400"><strong>Chế độ dinh dưỡng dành cho buổi học</strong></h1>
                <hr />
                <h2 className="whitespace-pre-line">{description}</h2>
            </div>

        </>
    );
};

export default ModalNutriRecommend;
