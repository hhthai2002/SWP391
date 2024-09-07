import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Input, DatePicker, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import moment from 'moment';
import 'moment/locale/vi';

const { Option } = Select;

const ModalCreatCourse = () => {
  const [course, setCourse] = useState({
    courseId: '',
    courseName: '',
    price: '',
    rating: 5,
    description: '',
    studentNumber: 0,
    certificate: 'Chứng chỉ của trung tâm',
    createBy: localStorage.getItem("user"),
    dateUpdate: new Date(),
    language: '',
    bmiMin: '',
    bmiMax: '',
    typeId: 0
  });

  const [existingDataError, setExistingDataError] = useState('');

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });

    // Check existing courseId
    if (name === 'courseId') {
      try {
        const response = await axios.get(`https://localhost:7158/api/Course/${value}`);
        if (response.data) {
          // Course ID already exists
          setExistingDataError('Course ID already exists!');
        }
      } catch (error) {
        console.log('Error checking Course ID:', error);
        setExistingDataError('This Course ID can be used to create.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://localhost:7158/api/Course', course);
      console.log(res.data);
      message.success('Course created successfully');
      window.location.reload();
    } catch (err) {
      console.log(err);
      message.error('Failed to create course');
    }
  };

  const { TextArea } = Input;

  return (
    <Form className="w-[96%] items-center relative h-[780px] rounded-2xl bg-white mx-auto">
      <h1 className="text-center text-3xl">Tạo khóa học</h1>
      <Form
        className="w-[89%] flex mt-20 absolute top-[300px] rounded-2xl left-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto bg-orange-400"
        onSubmit={handleSubmit}
      >
        <Form className="w-1/2 ml-4 mt-5">
          <div className="mb-2">
            <p>ID khóa học</p>
          </div>
          <Form.Item name="ID khóa học">
            <Input type="text" name="courseId" value={course.courseId} onChange={handleChange} className="w-[300px] py-2" />
          </Form.Item>

          <div className="mb-2">
            <p>Giá khóa học (VND)</p>
          </div>
          <Form.Item name="Giá khóa học">
            <Input type="text" name="price" value={course.price} onChange={handleChange} className="w-[300px] py-2" />
          </Form.Item>

          <div className="mb-2">
            <p>Loại hình khóa học</p>
          </div>
          <Form.Item className="w-[300px]" name="Loại hình khóa học">
            <Select
              value={course.typeId}
              onChange={(value) => setCourse({ ...course, typeId: value })}

              placeholder="Chọn loại hình khóa học"
            >
              <Option value={1}>Yoga</Option>
              <Option value={2}>Boxing</Option>
              <Option value={3}>Dance</Option>
              <Option value={4}>Gym</Option>
            </Select>
          </Form.Item>

          {/* <div className="mb-2">
            <p>Chứng chỉ</p>
          </div>
          <Form.Item name="Chứng chỉ">
            <Input type="text" name="certificate" value={course.certificate} onChange={handleChange} className="w-[300px] py-2" />
          </Form.Item> */}

          <div className="mb-2">
            <p>Người tạo: {course.createBy}</p>
          </div>

          <div className="mb-2">
            <p>Mô tả khóa học</p>
          </div>
          <Form.Item name="Mô tả khóa học">
            <TextArea type="text" name="description" value={course.description} onChange={handleChange} className="w-[300px]" rows={4} placeholder="Hãy viết vài dòng mô tả khóa học của bạn nhé" maxLength={255} />
          </Form.Item>
        </Form>

        <Form className="w-1/2 mt-5">
          <div className="mb-2">
            <p>Tên khóa học</p>
          </div>
          <Form.Item name="Tên khóa học">
            <Input type="text" name="courseName" value={course.courseName} onChange={handleChange} className="w-[300px] py-2" />
          </Form.Item>

          {/* <div className="mb-2">
            <p>Rating</p>
          </div>
          <Form.Item name="Rating">
            <Input type="text" name="rating" value={course.rating} onChange={handleChange} className="w-[300px] py-2" />
          </Form.Item> */}

          <div className="mb-2">
            <p>Chỉ số BMI</p>
          </div>
          <Form.Item className="flex" name="Chỉ số BMI">
            <Input type="number" name="bmiMin" value={course.bmiMin} onChange={handleChange} className="w-[150px] w-1/2 py-2" />
            <p className="w-[20px] text-3xl">~</p>
            <Input type="number" name="bmiMax" value={course.bmiMax} onChange={handleChange} className="w-[150px] w-1/2 py-2" />
          </Form.Item>

          {/* <div className="mb-2">
            <p>Số lượng học viên</p>
          </div>
          <Form.Item name="Số lượng học viên">
            <Input type="number" name="studentNumber" value={course.studentNumber} onChange={handleChange} className="w-[300px] py-2" />
          </Form.Item> */}

          <div className="mb-2">
            <p>Ngôn ngữ</p>
          </div>
          <Form.Item name="Ngôn ngữ">
            <Input type="text" name="language" value={course.language} onChange={handleChange} className="w-[300px] py-2" />
          </Form.Item>

          <Form.Item label="Ngày tạo">
            <DatePicker value={moment(course.dateUpdate)} onChange={(date) => setCourse({ ...course, dateUpdate: date.toDate() })} />
          </Form.Item>
        </Form>
      </Form>

      <Button
        type="primary"
        htmlType="submit"
        className="w-[250px] mr-[90px] rounded-md absolute bottom-20 right-3 bg-black hover:bg-blue-600 text-white font-bold py-3 px-4 rounded opacity-100 hover:opacity-80 transition-opacity mt-3 flex justify-center items-center"
        onClick={handleSubmit}
      >
        Tạo khóa học
      </Button>
    </Form>
  );
};

export default ModalCreatCourse;
