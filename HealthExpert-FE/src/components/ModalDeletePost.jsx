import React from "react";
import { Modal } from "antd";
import axios from "axios";

const ModalDeletePost = ({ postId, onDelete, isModalOpen, setIsModalOpen }) => {
    const handleOk = async () => {
        try {
            await axios.delete(`https://localhost:7158/api/Post/${postId}`);
            onDelete(postId); // Corrected from courseId to postId
            window.location.reload();
        } catch (error) {
            console.error("Error deleting Post: ", error);
        } finally {
            setIsModalOpen(false);
        }
    };

    return (
        <Modal
            title="Confirm Delete"
            visible={isModalOpen}
            onOk={handleOk}
            onCancel={() => setIsModalOpen(false)}
        >
            <p>Bạn có chắc xóa bài viết này không</p>
        </Modal>
    );
};

export default ModalDeletePost;
