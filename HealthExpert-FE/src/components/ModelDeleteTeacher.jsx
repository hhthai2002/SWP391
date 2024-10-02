import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import axios from "axios";

const ModalDeleteTeacher = ({ accountId, onDelete, isModalOpen, setIsModalOpen }) => {
    const [accountEmail, setAccountEmail] = useState("");

    useEffect(() => {
        const fetchAccountEmail = async () => {
            try {
                const response = await axios.get(`https://localhost:7158/api/Account/GetAccountById/${accountId}`);
                const accountData = response.data;
                setAccountEmail(accountData.email);
            } catch (error) {
                console.error("Error fetching account data: ", error);
            }
        };

        if (isModalOpen) {
            fetchAccountEmail();
        }
    }, [accountId, isModalOpen]);

    const handleOk = async () => {
        try {
            await axios.delete(`https://localhost:7158/api/Course/managers/email/${accountEmail}`);
            onDelete(accountId); // Corrected from courseId to postId
            window.location.reload();
        } catch (error) {
            console.error("Error deleting Manager: ", error);
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
            <p>Bạn có chắc xóa người quản lý này không?</p>
        </Modal>
    );
};

export default ModalDeleteTeacher;
