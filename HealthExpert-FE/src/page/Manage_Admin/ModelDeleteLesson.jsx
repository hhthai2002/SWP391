import React, { useState } from "react";
import { Button, Modal } from "antd";
import axios from "axios";

const ModalDeleteLesson = ({ lessonId, onDelete, isModalOpen, setIsModalOpen }) => {
    console.log(lessonId);
    const handleOk = async () => {
        try {
            await axios.delete(`https://localhost:7158/api/Lesson/DeleteLesson?id=${lessonId}`);
            onDelete(lessonId);
            window.location.reload();
        } catch (error) {
            console.error("Error deleting course: ", error);
        } finally {
            setIsModalOpen(false);
        }
    };

    return (
        <>
            <Modal
                title="Xóa buổi học"
                visible={isModalOpen}
                onOk={handleOk}
                onCancel={() => setIsModalOpen(false)}
            >
                <p>Bạn có chắc sẽ xóa bài học này?</p>
            </Modal>
        </>
    );
};


export default ModalDeleteLesson;
