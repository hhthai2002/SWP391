import React, { useState } from "react";
import { Form, Input, message } from "antd";

const { TextArea } = Input;

const ModalAddNutrition = ({ sessionId }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [nutriId, setNutriId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const isActive = true;

    console.log(sessionId);
    // Hàm xử lý khi form được submit
    const onFinish = async (values) => {
        console.log("Success:", values);
        // Gọi hàm để thêm dinh dưỡng
        await AddNutrition(values);
    };

    // Hàm xử lý khi form submit thất bại
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    // Hàm thêm dinh dưỡng
    const AddNutrition = async (values) => {
        const item = { ...values, sessionId, isActive }; // Thêm sessionId vào dữ liệu gửi đi
        try {
            setLoading(true);
            const response = await fetch(`https://localhost:7158/api/Nutrition`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(item),
            });

            if (!response.ok) {
                throw new Error("Error adding session");
            }

            message.success("Session created successfully");
            form.resetFields();
        } catch (error) {
            console.error(error);
            message.error("Failed to create session");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className="w-[90%] items-center relative h-[580px] rounded-2xl bg-white mx-auto"
        >
            <h1 className="text-center text-3xl mb-5 text-orange-400"><strong>Thêm chế độ dinh dưỡng</strong></h1>
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
                        <Input onChange={(e) => setNutriId(e.target.value)} type="text" className="w-1/2 py-2" placeholder="Ví dụ: MN-YG01" />
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
                        <Input onChange={(e) => setTitle(e.target.value)} type="text" className="w-1/2 py-2" placeholder="Ví dụ: Thực đơn cho buổi tập đầu tiên" />
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
                        <TextArea onChange={(e) => setDescription(e.target.value)} className="w-full" rows={4} placeholder="Hãy viết mô tả Tên chế độ dinh dưỡng của bạn nhé" />
                    </Form.Item>
                </div>
            </div>
            <button
                type="submit"
                className="w-[250px] mr-[90px] rounded-md absolute bottom-0 right-3 bg-orange-400 hover:bg-black text-white font-bold py-3 px-4 rounded opacity-100 hover:opacity-80 transition-opacity mt-3"
                disabled={loading}
            >
                {loading ? "Đang xử lý..." : "Thêm"}
            </button>
        </Form>
    );
};

export default ModalAddNutrition;
