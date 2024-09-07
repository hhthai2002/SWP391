import React, { useState } from "react";
import { Button, Modal } from "antd";
import axios from "axios";

const ModalDeleteCourse = ({ courseId, onDelete, isModalOpen, setIsModalOpen }) => {
  const handleOk = async () => {
    try {
      await axios.delete(`https://localhost:7158/api/Course/${courseId}`);
      onDelete(courseId);
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
        title="Confirm Delete"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <p>Bạn có chắc sẽ xóa khóa học này không?</p>
      </Modal>
    </>
  );
};


export default ModalDeleteCourse;
