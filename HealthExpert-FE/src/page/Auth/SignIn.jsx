import React, { useState, useEffect } from "react";
import { Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Button from "../../components/button";
import backgroundImage from "../../img/nike.png";
import helpexpert from "../../img/logo.png";
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  async function login() {
    if (!userName || !password) {
      alert("Hãy nhập đầy đủ thông tin của bạn");
      return;
    }
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
        alert(errorMessage);
        if (errorMessage === 'Please verify your account!!!') {
          history("/verify");
        }
      } else {
        localStorage.setItem("user", item.userName);
        getRoleIdByUsername(userName);
        // Lấy roleId sau khi đăng nhập thành công
      }
      const responseData = await response.text();
      console.log(responseData);
    } catch (error) {

      console.error('Error during login:', error);
    }
  }

  useEffect(() => {
    const userlogin = localStorage.getItem("user");
    if (userlogin) {
      // Nếu người dùng đã đăng nhập, chuyển hướng về trang chính (home page)
      history("/");
    }
  }, []);

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
        alert("Lỗi load dữ liệu!");
        throw new Error("Lỗi load dữ liệu!");
      }

      const data = await response.json();
      const foundUser = data.find(account => account.userName === username);
      if (foundUser) {
        const roleId = foundUser.roleId;

        // Redirect tới trang tương ứng dựa vào roleId
        if (roleId === 1) {
          history("/admin/courseAdmin");
        } else {
          history("/home");
        }
      } else {
        console.error("Không tìm thấy tài khoản!");
        alert("Không tìm thấy tài khoản!");
      }
    } catch (error) {
      console.error("Lỗi load dữ liệu!", error);
    }
  }

  function signup() {
    history("/signup");
  }
  function forgotPassword() {
    history("/forgotPassword");
  }

  function registerCourseAdmin() {
    history("/registerCourseAdmin");
  }
  return (
    <section className="h-screen">
      <div className="h-full flex items-center justify-center">
        <div className="w-1/2">
          <img
            src={backgroundImage}
            className=" w-3/4 h-full mx-auto  "
            alt="Sample"
          />
        </div>

        <div className="w-1/2 flex flex-col items-center ">
          <Form
            name="normal_login"
            className="w-[55%] "
            initialValues={{
              remember: true,
            }}
          >
            {/* introduce */}
            <div className="introduce mb-10">
              {/* this is logoImage */}
              <div className="logoImage mb-2 ">
                <img className="w-1/5 rounded-full " src={helpexpert} alt="" />
              </div>

              {/* contentd */}
              <div className="content mb-10">
                <h1 className="text-3xl mb-5 text-525252 ">
                  Đăng nhập bằng tài khoản của bạn
                </h1>
                <h1 className="text-base	">
                  Chào mừng đến với HealthExpert, hãy cùng nhau phát triển bản thân
                </h1>
              </div>
            </div>
            <div className="mb-2">
              <p>Tên người dùng</p>
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
              {/* email input */}
              <Input
                type="text"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Tên đăng nhập"
                className="width:420px py-3"
                onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Item>
            <div className="mb-2">
              <p>Mật khẩu</p>
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
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Mật khẩu"
                className="width:420px py-3"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <div className="flex justify-between mt-2 ">
              <div>
                <a className="#" href="âsdasds">
                  Quên mật khẩu
                </a>
              </div>
            </div>

            <Form.Item>
              <Button
                type="primary"
                className="bg-black mt-5 w-full px-2 py-2 "
                onClick={login}
              >
                <span className="text-orange-600">Đăng nhập </span>
              </Button>
            </Form.Item>
            <div className="register ">
              <span className="text-gray-600">Bạn chưa có tài khoản  </span>
              <a onClick={signup} className="text-orange-600">
                Đăng ký
              </a>
            </div>
            <div className="register ">
              <a onClick={forgotPassword} className="text-orange-600">
                Quên mật khẩu
              </a>
            </div>
            <Form.Item>
              <Button
                type="primary"
                className="bg-black mt-5 w-full px-2 py-2 "
                onClick={registerCourseAdmin}
              >
                <span className="text-orange-600">Trở thành trung tâm</span>
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section >
  );
}
