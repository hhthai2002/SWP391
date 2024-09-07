import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import axios from "axios";

const { TextArea } = Input;

const ModalUpdateNutrition = ({ sessionId }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [nutriId, setNutriId] = useState("");
    const [title, setTitle] = useState("");
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
                    setNutriId(nutrition.nutriId);
                    setTitle(nutrition.title);
                    setDescription(nutrition.description);
                    // Đặt giá trị ban đầu cho các trường trong form
                    form.setFieldsValue({
                        nutriId: nutrition.nutriId,
                        title: nutrition.title,
                        description: nutrition.description,
                    });
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

    // Hàm xử lý khi nhấn nút "Cập nhật"
    const onFinish = async (values) => {
        try {
            setLoading(true);
            // Gửi yêu cầu PUT để cập nhật thông tin dinh dưỡng
            await axios.put(`https://localhost:7158/api/Nutrition/${nutriId}`, values);
            message.success("Cập nhật thông tin dinh dưỡng thành công");
        } catch (error) {
            console.error("Error updating nutrition:", error);
            message.error("Failed to update nutrition information");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            form={form}
            onFinish={onFinish} // Xử lý khi nhấn nút "Cập nhật"
            className="w-[90%] items-center relative h-[580px] rounded-2xl bg-white mx-auto"
        >
            <h1 className="text-center text-3xl mb-5 text-orange-400"><strong>Chỉnh sửa chế độ dinh dưỡng</strong></h1>
            <hr />
            <div className="w-[98%] h-[480px] text-orange-400 text-lg flex absolute top-[300px] rounded-2xl left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto ">
                <div className="w-full ml-4 mt-5 mr-4">
                    <div className="mb-2">
                        <p><strong>ID chế độ dinh dưỡng</strong></p>
                    </div>

                    <Form.Item
                        name="nutriId"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập ID chế độ dinh dưỡng",
                            },
                        ]}
                    >
                        <Input className="w-1/2 py-2" placeholder="Ví dụ: MN-YG01" />
                    </Form.Item>

                    <div className="mb-2">
                        <p><strong>Tên chế độ dinh dưỡng</strong></p>
                    </div>
                    <Form.Item
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập Tên chế độ dinh dưỡng",
                            },
                        ]}
                    >
                        <Input className="w-1/2 py-2" placeholder="Ví dụ: Thực đơn cho buổi tập đầu tiên" />
                    </Form.Item>

                    <div className="mb-2">
                        <p><strong>Mô tả chế độ dinh dưỡng</strong></p>
                    </div>
                    <Form.Item
                        name="description"
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                    >
                        <TextArea className="w-full" rows={4} placeholder="Hãy viết mô tả Tên chế độ dinh dưỡng của bạn nhé" />
                    </Form.Item>
                </div>
            </div>
            <button
                type="submit"
                className="w-[250px] mr-[90px] rounded-md absolute bottom-0 right-3 bg-orange-400 hover:bg-black text-white font-bold py-3 px-4 rounded opacity-100 hover:opacity-80 transition-opacity mt-3"
                disabled={loading}
            >
                {loading ? "Đang xử lý..." : "Cập nhật"}
            </button>
        </Form>
    );
};

export default ModalUpdateNutrition;
