import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Cascader,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import center1 from "../../img/center1.jpg";
import Header from "../../components/Header";
import background from "../../img/CreatePostBackGround.png";

export default function CreatePost() {
  const { TextArea } = Input;

  const [accountId, setAccountId] = useState('');
  const [username, setUsername] = useState("");
  const [post, setPost] = useState({
    title: '',
    content: '',
    imageFile: 'aaa',
  });
  //const [checkPost, setCheckPost] = useState(false);

  useEffect(() => {
    const usernameFromLocalStorage = localStorage.getItem("user");
    if (usernameFromLocalStorage) {
      setUsername(usernameFromLocalStorage);

    }
  }, []);

  useEffect(() => {
    if (username) {
      getProfile(username);
    }
  }, [username]);

  function getProfile(username) {
    axios.get(`https://localhost:7158/api/Account/GetListAccount`, {
      headers: {
        "Authorization": "Bearer YOUR_ACCESS_TOKEN",
      }
    })
      .then(response => {
        const data = response.data;
        if (Array.isArray(data)) {
          const foundUser = data.find(accountList => accountList.userName === username);
          if (foundUser) {
            setAccountId(foundUser.accountId);
            console.log(accountId);
          } else {
            console.error("User not found!");
          }
        } else {
          console.error("Error loading data!");
        }
      })
      .catch(error => {
        console.error("Error loading data!", error);
      });
  }
  useEffect(() => {
    console.log(accountId);
  }, [accountId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://localhost:7158/api/post', { title: post.title, content: post.content, imageFile: post.imageFile, accountId: accountId });
      console.log(res.data);
      message.success('Đăng bài thành công');
      //setCheckPost(true);
      window.location.reload();
    } catch (err) {
      // Xử lý lỗi từ server
      if (err.response && err.response.data && err.response.data.errors) {
        const errorMessages = err.response.data.errors;
        const errorMessage = Object.values(errorMessages).flat().join('\n');
        message.error(errorMessage);
      } else {
        console.log(err);
        message.error('Đăng bài thất bại');
      }
    }
  };

  const onFinish = (values) => {
    //console.log("Success:", values);

  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="home-page">
        <Header />
      </div>
      <div style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <h1 className="text-3xl text-center font-bold text-orange-400 mt-10">Tạo bài chia sẻ</h1>
        <div className="bg-white border-4 border-orange-500 w-[50%] h-[700px] mt-5 rounded-xl shadow-2xl mx-auto overflow-y-auto">
          <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onSubmit={handleSubmit}
            layout="vertical"
          >

            <div className="ml-10 mr-10 mt-[58px]">
              <Form.Item
                label="Tiêu đề chính"
                name="mainTitle"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tiêu đề bài post",
                  },
                ]}
              >
                <Input value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value })} className="w-[350px]" placeholder="Tiêu đề chính" />
              </Form.Item>

              <Form.Item
                label="Nội dung tiêu đề chính"
                name="mainContent"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập nội dung bài post",
                  },
                ]}
              >
                <TextArea
                  className="w-[100%]"
                  placeholder="Nội dung tiêu đề chính"
                  rows={8}
                  value={post.content}
                  onChange={(e) => setPost({ ...post, content: e.target.value })}
                />
              </Form.Item>
            </div>
            <button
              type="primary"
              htmlType="submit"
              className="w-[250px] mr-[90px] mb-[200px] mr-[260px] rounded-md absolute -bottom-3 right-[450px]	 bg-orange-400 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded opacity-100 hover:opacity-80 transition-opacity mt-3 "
              onClick={handleSubmit}
            >
              Tạo bài post
            </button>
          </Form>
        </div>
      </div>

    </>
  );
}
