import React, { useState } from "react";
import { Form, Input, notification, Spin } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Button from "../../components/button";
import backgroundImage from "../../img/nike.png";
import { DatePicker, Space, Select } from 'antd';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function SignUp() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const [gender, setGender] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notificationOpened, setNotificationOpened] = useState(false); // Track if notification is opened
  const navigate = useNavigate();  // Use navigate for redirection

  const handleDatePickerChange = (selectedDate) => {
    setBirthDate(selectedDate);
  };

  const handleSelectChange = (selectedOption) => {
    setGender(selectedOption.value);
  };

  const openNotification = () => {
    setNotificationOpened(true);
    notification.success({
      message: "Đăng kí thành công",
      description: "Bạn hãy kiểm tra email và xác thực tài khoản nhé!",
      duration: 3,  // Tự động đóng thông báo
      onClose: () => setNotificationOpened(false) // Reset state when notification is closed
    });
  };

  const openErrorNotification = (message) => {
    setNotificationOpened(true);
    notification.error({
      message: "Đăng kí thất bại",
      description: message || "Tên đăng nhập hoặc Email đã tồn tại!",
      duration: 3,  // Tự động đóng thông báo
      onClose: () => setNotificationOpened(false) // Reset state when notification is closed
    });
  };

  async function SignUp() {
    setLoading(true);  // Set loading to true when the function starts
    let item = { userName, password, confirmPassword, email, fullName, phone, birthDate, gender };
    try {
      let response = await fetch('https://localhost:7158/api/Account/Register', {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error(`Error: ${errorMessage}`);
        openErrorNotification(errorMessage);  // Hiển thị thông báo lỗi
      } else {
        openNotification();  // Hiển thị thông báo sau khi đăng ký thành công
        // Redirect to verify page after 1 second
        setTimeout(() => {
          navigate('/verify');  // Navigate to the Verify page
        }, 1000);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      openErrorNotification();  // Hiển thị thông báo lỗi nếu xảy ra lỗi khi kết nối
    } finally {
      setLoading(false);  // Set loading to false after the function finishes
    }
  }

  return (
    <section className="h-screen">
      <div className="h-full flex items-center justify-center">
        <div className="w-1/2">
          <img
            src={backgroundImage}
            className=" w-3/4 h-full mx-auto"
            alt="Sample"
          />
        </div>

        <div className="w-1/2 flex flex-col items-center">
          <Form
            name="normal_login"
            className="w-[55%]"
            onFinish={SignUp} // Thực hiện SignUp khi form được submit
          >
            <div className="introduce mb-10">
              <div className="content mb-10">
                <h1 className="text-3xl mb-5 text-525252 text-center">
                  Đăng kí
                </h1>
              </div>
            </div>

            {/* Tên đăng nhập */}
            <div className="mb-2">
              <p>Tên đăng nhập</p>
            </div>
            <Form.Item
              name="username"
              rules={[{ required: true, message: "Hãy nhập Tên đăng nhập!" }]}
            >
              <Input
                type="text"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Tên đăng nhập"
                onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Item>

            {/* Mật khẩu */}
            <div className="mb-2">
              <p>Mật khẩu</p>
            </div>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Hãy nhập Mật khẩu!" }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Mật khẩu"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            {/* Xác nhận mật khẩu */}
            <div className="mb-2">
              <p>Xác nhận mật khẩu</p>
            </div>
            <Form.Item
              name="confirm-password"
              rules={[{ required: true, message: "Hãy nhập Xác nhận mật khẩu!" }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Xác nhận mật khẩu"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Item>

            {/* Email */}
            <div className="mb-2">
              <p>Email</p>
            </div>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Hãy nhập Email!" }]}
            >
              <Input
                type="text"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>

            {/* Họ và tên */}
            <div className="mb-2">
              <p>Họ và tên</p>
            </div>
            <Form.Item
              name="fullName"
              rules={[{ required: true, message: "Hãy nhập họ và tên!" }]}
            >
              <Input
                type="text"
                placeholder="Họ và tên"
                onChange={(e) => setFullname(e.target.value)}
              />
            </Form.Item>

            {/* Số điện thoại */}
            <div className="mb-2">
              <p>Số điện thoại</p>
            </div>
            <Form.Item
              name="phone"
              rules={[{ required: true, message: "Hãy nhập Số điện thoại!" }]}
            >
              <Input
                type="text"
                placeholder="Số điện thoại"
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Item>

            {/* Ngày sinh và Giới tính */}
            <div className="mb-2 flex">
              <div className="mr-2">
                <p>Ngày sinh</p>
                <Space direction="vertical" size={12}>
                  <DatePicker onChange={handleDatePickerChange} />
                </Space>
              </div>

              <div>
                <p>Giới tính</p>
                <Select
                  defaultValue="Giới tính"
                  onChange={handleSelectChange}
                  options={[
                    { label: 'Nam', value: 'true' },
                    { label: 'Nữ', value: 'false' },
                  ]}
                />
              </div>
            </div>

            {/* Đăng ký button */}
            <Form.Item>
              <Button
                type="primary"
                className="bg-black mt-1 w-full px-2 py-2"
                onClick={SignUp}
                disabled={loading} // Disable the button while loading
              >
                <span className="text-orange-600">Đăng kí</span>
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      {/* Hiệu ứng loading */}
      {loading && !notificationOpened && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <Spin size="large" />
        </div>
      )}
    </section>
  );
}
