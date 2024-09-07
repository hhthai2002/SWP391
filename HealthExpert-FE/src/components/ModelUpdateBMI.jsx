import React from "react";
import { Modal, Input, Button } from "antd";
import axios from "axios";

export default function BMIModal({
    isVisible,
    handleOk,
    handleCancel,
    weight,
    setWeight,
    height,
    setHeight,
}) {

    return (
        <Modal
            title="Hãy cho chúng tôi biết trạng thái cơ thể của bạn"
            visible={isVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{ className: "text-black border border-gray-300" }}
        >
            <div>
                <p>Nhập cân nặng</p>
                <Input
                    type="number"
                    placeholder="Nhập trọng lượng (kg)"
                    onChange={(e) => setWeight(e.target.value)}
                    value={weight}
                />
            </div>
            <div>
                <p>Nhập chiều cao</p>
                <Input
                    type="number"
                    placeholder="Nhập chiều cao (m)"
                    onChange={(e) => setHeight(e.target.value)}
                    value={height}
                />
            </div>

        </Modal>
    );
}
