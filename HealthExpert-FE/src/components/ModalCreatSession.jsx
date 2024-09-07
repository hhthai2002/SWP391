import React, { useState } from "react";
import { Form, Input, DatePicker, message } from "antd";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const ModalCreatSession = () => {

  const courseId = localStorage.getItem("currentCourse");
  const learningProgress = false;
  const scoreResult = null;
  const [sessionId, setSessionId] = useState("");
  const [sessionName, setSessionName] = useState("");
  const [description, setDecription] = useState("");
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);

  const handleRangeChange = (dates) => {
    // Cập nhật giá trị của ngày bắt đầu và kết thúc khi người dùng thay đổi
    if (dates && dates.length === 2) {
      setDateStart(dates[0]);
      setDateEnd(dates[1]);
    } else {
      setDateStart(null);
      setDateEnd(null);
    }
  };

  // Create sessionDTO object
  const onFinish = (values) => {
    console.log("Success:", values);
    // Set sessionDTO with form values

  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  async function CreateSession() {
    let item = { courseId, sessionId, sessionName, dateStart, dateEnd, learningProgress, scoreResult, description };

    try {
      const response = await fetch("https://localhost:7158/api/Session/AddSession", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error("Error adding session");
      }

      const data = await response.text();
      console.log(data); // Handle successful response
      message.success("Session created successfully");
      window.location.reload();
    } catch (error) {
      console.error(error); // Handle error
      message.error("Failed to create session");
    }
  }

  return (
    <Form

      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className="w-[90%] items-center relative h-[580px] rounded-2xl bg-white mx-auto"
    >
      <h1 className="text-center text-orange-400 text-3xl"><strong>Tạo buổi học</strong></h1>
      <hr />
      <div className="w-[98%] h-[480px] flex text-orange-400 absolute top-[300px] rounded-2xl left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto">
        <div className="w-full ml-4 mt-5">
          <div className="mb-2">
            <p><strong>ID Buổi học</strong></p>
          </div>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Vui lòng nhập ID buổi học",
              },
            ]}
            name="ID_Course"
          >
            <Input onChange={(e) => setSessionId(e.target.value)} type="text" className="w-[300px] py-2"></Input>
          </Form.Item>

          <div className="mb-2">
            <p><strong>Tên buổi học</strong></p>
          </div>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên buổi học",
              },
            ]}
            name="LessionName"
          >
            <Input onChange={(e) => setSessionName(e.target.value)} type="text" className="w-[300px] py-2"></Input>
          </Form.Item>

          <div className="mb-2">
            <p><strong>Mô tả bài học</strong></p>
          </div>
          <Form.Item
            rules={[
              {
                required: false,
              },
            ]}
            name="description"
          >
            <>
              <br />
              <TextArea
                onChange={(e) => setDecription(e.target.value)}
                className="w-full"
                rows={5}
                placeholder="Hãy viết mô tả buổi học của bạn nhé"
                maxLength={255}
              />
            </>
          </Form.Item>
        </div>
        <div className="w-1/2 mt-5">
          <div className="mb-2">
            <p>Thời hạn</p>
          </div>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Vui lòng nhập thời gian buổi học",
              },
            ]}
            name="date"
          >
            <RangePicker onChange={handleRangeChange} />
          </Form.Item>
        </div>
      </div>
      <button
        type="submit"
        onClick={CreateSession}
        className="w-[250px] mr-[90px] rounded-md absolute bottom-0 right-3 bg-orange-400 hover:bg-Black text-white font-bold py-3 px-4 rounded opacity-100 hover:opacity-80 transition-opacity mt-3 "
      >
        Tạo bài học
      </button>
    </Form>
  );
};

export default ModalCreatSession;
