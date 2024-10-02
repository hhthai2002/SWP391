import React, { useState, useEffect } from "react";
import { Form, Input, notification, Spin, Button as AntButton } from "antd";
import { UserOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons";
import Button from "../../components/button";
import backgroundImage from "../../img/nike.png";
import help45 from "../../img/logo.png";
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const navigate = useNavigate();

  // Hàm delay để trì hoãn việc gửi yêu cầu
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  async function login() {
    if (!userName || !password) {
      notification.error({
        message: "Lỗi",
        description: "Hãy nhập đầy đủ thông tin của bạn",
        duration: 2
      });
      return;
    }

    setLoading(true);
    await delay(1000);

    let item = { userName, password };
    try {
      let response = await fetch('https://localhost:7158/api/Auth/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.log(`Error: ${errorMessage}`);
        notification.error({
          message: "Lỗi đăng nhập",
          description: errorMessage,
          duration: 2
        });
        if (errorMessage === 'Please verify your account!!!') {
          navigate("/verify");
        }
      } else {
        localStorage.setItem("user", item.userName);
        // Hiển thị thông báo chào mừng
        notification.success({
          message: `Xin chào ${item.userName}!`,
          description: "Đăng nhập thành công.",
          duration: 2
        });
        getRoleIdByUsername(userName);
      }
      const responseData = await response.text();
      console.log(responseData);
    } catch (error) {
      console.error('Error during login:', error);
      notification.error({
        message: "Lỗi",
        description: "Đã xảy ra lỗi trong quá trình đăng nhập",
        duration: 2
      });
    } finally {
      setLoading(false); // Kết thúc loading
    }
  }

  useEffect(() => {
    const userlogin = localStorage.getItem("user");
    if (userlogin) {
      // Nếu người dùng đã đăng nhập, chuyển hướng về trang chính (home page)
      navigate("/home");
    }
  }, [navigate]);

  async function getRoleIdByUsername(username) {
    try {
      let response = await fetch(`https://localhost:7158/api/Account/GetListAccount`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer YOUR_ACCESS_TOKEN' // Thay YOUR_ACCESS_TOKEN bằng token thực tế
        }
      });

      if (!response.ok) {
        console.error(`Lỗi load dữ liệu!`);
        notification.error({
          message: "Lỗi",
          description: "Lỗi load dữ liệu!",
          duration: 2
        });
        throw new Error("Lỗi load dữ liệu!");
      }

      const data = await response.json();
      const foundUser = data.find(account => account.userName === username);
      if (foundUser) {
        const roleId = foundUser.roleId;

        // Redirect tới trang tương ứng dựa vào roleId
        if (roleId === 1) {
          navigate("/admin/serviceCenter");
        }
        else if (roleId === 2) {
          navigate("/manageCourse");
        }
        else {
          navigate("/home");
        }
      } else {
        console.error("Không tìm thấy tài khoản!");
        notification.error({
          message: "Lỗi",
          description: "Không tìm thấy tài khoản!",
          duration: 2
        });
      }
    } catch (error) {
      console.error("Lỗi load dữ liệu!", error);
      notification.error({
        message: "Lỗi",
        description: "Đã xảy ra lỗi khi lấy thông tin người dùng",
        duration: 2
      });
    }
  }

  function signup() {
    navigate("/signup");
  }

  function forgotPassword() {
    navigate("/forgotPassword");
  }

  function registerServiceCenter() {
    navigate("/registerServiceCenter");
  }

  const handleGoogleLogin = () => {
    window.location.href = 'https://localhost:7158/api/Account/GoogleLogin';
  };

  return (
    <section className="h-screen">
      <div className="h-full flex items-center justify-center">
        <div className="w-1/2">
          <img
            src={backgroundImage}
            className="w-3/4 h-full mx-auto"
            alt="Sample"
          />
        </div>

        <div className="w-1/2 flex flex-col items-center">
          <Form
            name="normal_login"
            className="w-[55%]"
            initialValues={{ remember: true }}
          >
            <div className="introduce mb-10">
              <div className="logoImage mb-2">
                <img className="w-1/5 rounded-full" src={help45} alt="" />
              </div>
              <div className="content mb-10">
                <h1 className="text-3xl mb-5 text-525252">
                  Đăng nhập bằng tài khoản của bạn
                </h1>
                <h1 className="text-base">
                  Chào mừng đến với Health45, hãy cùng nhau phát triển bản thân
                </h1>
              </div>
            </div>

            <div className="mb-2">
              <p>Tên người dùng</p>
            </div>
            <Form.Item
              name="username"
              rules={[{ required: true, message: "Hãy nhập tên người dùng!" }]}
            >
              <Input
                type="text"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Tên đăng nhập"
                onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Item>

            <div className="mb-2">
              <p>Mật khẩu</p>
            </div>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Hãy nhập mật khẩu!" }]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Mật khẩu"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                className="bg-black mt-5 w-full px-2 py-2"
                onClick={login}
                disabled={loading} // Disable the button while loading
              >
                <span className="text-orange-600">Đăng nhập</span>
              </Button>
            </Form.Item>

            {/* <Form.Item>
              <AntButton
                icon={<GoogleOutlined />}
                className="bg-white-500 mt-2 w-full px-2 py"
                onClick={handleGoogleLogin}
              >
                <span className="text-black">Đăng nhập bằng Google</span>
              </AntButton>
            </Form.Item> */}


            <div className="flex justify-between mt-2">
              <div>
                <a onClick={forgotPassword}>Quên mật khẩu</a>
              </div>
            </div>

            <div className="register">
              <span className="text-gray-600">Bạn chưa có tài khoản </span>
              <a onClick={signup} className="text-orange-600">Đăng ký</a>
            </div>

            <Form.Item>
              <Button
                type="primary"
                className="bg-black mt-5 w-full px-2 py-2"
                onClick={registerServiceCenter}
              >
                <span className="text-orange-600">Trở thành trung tâm</span>
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

      {/* Hiệu ứng loading */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <Spin size="large" />
        </div>
      )}
    </section>
  );
}
