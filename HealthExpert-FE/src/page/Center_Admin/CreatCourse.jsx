import React from "react";
import {
  Button,
  Cascader,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
} from "antd";
export default function CreatCourse() {
  return (
    <>
      {/* form chung  */}
      <Form className="w-[80%]       mx-auto bg-orange-400" action="">
        {/* id khóa học  */}
        {/* left_form */}
        <Form layout="vertical" className="py-[65px]">
          <Form.Item label="ID Khóa học">
            <Input className="w-[300px]" />
          </Form.Item>
          <Form.Item label="Giá khóa học (VND)">
            <Input className="w-[300px]" />
          </Form.Item>{" "}
          <Form.Item label="Loại hình khóa học">
            <Input className="w-[300px]" />
          </Form.Item>{" "}
          <Form.Item label="Chứng chỉ">
            <Input className="w-[300px]" />
          </Form.Item>{" "}
          <Form.Item label="Người tạo">
            <Input className="w-[300px]" />
          </Form.Item>
        </Form>
        <Form className="w-1/2"></Form>
        {/* rigt_form */}
      </Form>
    </>
  );
}
