import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { Button, Form, Input, Upload, message } from "antd";

const ModalCreateLesson = () => {
  const [file, setFile] = useState(null);
  const [lessonId, setLessonId] = useState("");
  const [caption, setCaption] = useState("");
  const [cover, setCover] = useState("");
  const sessionId = localStorage.getItem("currentSession");
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (info) => {
    const fileList = info.fileList;
    if (fileList.length > 0) {
      const uploadedFile = fileList[0].originFileObj;
      setFile(uploadedFile);
    } else {
      setFile(null);
    }
  };

  // const handleFileChange = (info) => {
  //   const uploadedFile = info.file.originFileObj;
  //   if (uploadedFile) {
  //     setFile(uploadedFile);
  //   } else {
  //     setFile(null);
  //   }
  // };

  const handleSubmit = async () => {
    if (!file) {
      message.error("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("caption", caption);
    formData.append("cover", cover);
    formData.append("sessionId", sessionId);
    formData.append("lessonId", lessonId);

    try {
      const response = await axios.post(
        "https://localhost:7158/api/UploadVideo/Upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setUploadStatus("Upload successful");
        console.log(response.data); // Do something with the response if needed
      } else {
        setUploadStatus("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Upload failed");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        className="w-[80%] items-center relative h-[580px] rounded-2xl bg-white mx-auto"
      >
        <h1 className="text-center text-3xl">Nội dung bài học</h1>
        <div className="w-[98%] flex flex-col h-[480px] absolute top-[300px] rounded-2xl left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto bg-orange-400">
          <div className="mx-auto my-5">
            <div className="mb-2">
              <p className="text-[18px]">Mã bài học</p>
            </div>
            <Form.Item
              name="lessonId"
              rules={[{ required: true, message: "Vui lòng nhập mã bài học" }]}
            >
              <Input
                value={lessonId}
                onChange={(e) => setLessonId(e.target.value)}
                className="w-[300px] py-2"
              />
            </Form.Item>
            <div className="mb-2">
              <p className="text-[18px]">Tiêu đề</p>
            </div>
            <Form.Item
              name="caption"
              rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
            >
              <Input
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-[300px] py-2"
              />
            </Form.Item>
            <div className="mb-2">
              <p className="text-[18px]">Mô tả</p>
            </div>
            <Form.Item
              name="cover"
              rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
            >
              <Input
                value={cover}
                onChange={(e) => setCover(e.target.value)}
                className="w-[300px] py-2"
              />
            </Form.Item>
            <Form.Item
              name="file"
              rules={[{ required: true, message: "Vui lòng đăng tải bài học của bạn" }]}
            >
              <Upload
                name="file"
                accept="video/*"
                beforeUpload={() => false}
                onChange={handleFileChange}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          </div>
        </div>
        <Button
          type="primary"
          htmlType="submit"
          className="w-[150px] mr-[90px] rounded-md absolute -bottom-4 -right-16 bg-black text-white font-bold py-3 px-4 rounded opacity-100 hover:opacity-80 transition-opacity mt-3"
        >
          Tạo bài học
        </Button>
      </Form>
      <div id="response">{uploadStatus}</div>
    </>
  );
};

export default ModalCreateLesson;