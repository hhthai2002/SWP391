import React, { useState } from "react";
import splash from '../../img/bg.png';
import pfp from '../../img/pfp.png';
import cover from '../../img/course_cover.png';
import { Form, Input, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Button from "../../components/button";
import { DatePicker, Space } from 'antd';
import { Select } from 'antd';

import { Link, useNavigate } from 'react-router-dom'

function EditProfile() {
  const [pic, setFileP] = useState();
  const [banner, setFileB] = useState();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const [gender, setGender] = useState(null);

  const handleDatePickerChange = (selectedDate) => {
    setBirthDate(selectedDate);
  };
  const handleSelectChange = (selectedOption) => {
    setGender(selectedOption.value);
  };

  function changePfp(e) {
    console.log(e.target.files);
    setFileP(URL.createObjectURL(e.target.files[0]));
  }

  function changeBanner(e) {
    console.log(e.target.files);
    setFileB(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <>
      <base href="./" />
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      {/* Main styles for this application*/}
      {/* idk */}
      <div className="grid gap-4 ml-16 mr-16">
        {/* banner and pfp hijinx */}
        <div className="">
          <img src={banner ? banner : splash} alt="" className="relative object-cover w-full h-96 z-0" />
        </div>
        {/* two columns */}
        <div className="flex columns-2 gap-4">
          {/* left column: idk pfp ?? */}
          <div className="flex-auto w-2/5">
            <div className="ml-5 mt-5 mb-5">
              <img src={pic ? pic : pfp} alt="" className="object-scale-down w-48" />
              <label htmlFor="pfp">Change profile pic</label>
              <br />
              <input type="file" id="pfp" style={{ display: "none" }} onChange={changePfp} />
              <label htmlFor="banner">Change banner</label>
              <br />
              <input type="file" id="banner" style={{ display: "none" }} onChange={changeBanner} />
              <br />
              <p className='text-xl font-bold'>my NAME???</p>
              <br />
              <p className="">About page</p>
            </div>
          </div>
          {/* right column: edit */}
          <div className="flex-auto border rounded shadow-2xl w-3/5">
            <div className="ml-5 mt-5 mb-5 mr-5">
              {/* ----- */}
              <div className="mb-2">
                <p>UserName</p>
              </div>
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your Username!",
                  },
                ]}
              >
                <Input
                  type="text"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                  className="width:420px py-3 "
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Form.Item>
              <div className="mb-2">
                <p>Password</p>
              </div>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  className="width:420px py-3"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
              <div className="mb-2">
                <p>Confirm Password</p>
              </div>
              <Form.Item
                name="confirm-password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Confirm Password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  className="width:420px py-3"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Item>
              <div className="mb-2">
                <p>Email</p>
              </div>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                ]}
              >
                {/* email input */}
                <Input
                  type="text"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                  className="width:420px py-3 "
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
              <div className="mb-2">
                <p>Full Name</p>
              </div>
              <Form.Item
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: "Please input your Full Name!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="text"
                  placeholder="fullname"
                  className="width:420px py-3"
                  onChange={(e) => setFullname(e.target.value)}
                />
              </Form.Item>
              <div className="mb-2">
                <p>Phone Number</p>
              </div>
              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your phome number!",
                  },
                ]}
              >
                <Input
                  type="text"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Phone Number"
                  className="width:420px py-3"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Item>
              <div className="mb-2 flex">
                <div className="mr-2">
                  <p>Birthday</p>
                  <Space direction="vertical" size={12}>
                    <DatePicker
                      selected={birthDate}
                      onChange={handleDatePickerChange} />
                  </Space>
                </div>

                <div>
                  <p>Gender</p>
                  <div className="flex">
                    <Select
                      defaultValue="Gender"
                      onChange={handleSelectChange}
                      options={[
                        {
                          options: [
                            { label: 'Male', value: 'true' },
                            { label: 'Female', value: 'false' },
                          ]
                        }
                      ]} />
                  </div>
                </div>
              </div>
              {/* ----- */}

              <button
                type="button"
                className="text-black bg-orange-400 hover:bg-orange-800 border-2 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium w-28 py-1 text-center"
              >
                Save
              </button>

              <button
                type="button"
                className="text-black bg-white hover:bg-orange-800 border-2 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium w-28 py-1 text-center ml-5"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <footer className="bg-white">
          <br />
          <hr />
          <br />
          <div>Healt45 © 2024</div>
        </footer>
      </div>
      {/* FOOTER */}
    </>

  );
};


export default EditProfile;