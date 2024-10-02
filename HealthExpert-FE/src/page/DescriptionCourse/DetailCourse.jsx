import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import yogabackground from "../../img/yogabackground.jpg";
import dancebackground from "../../img/dancebackground.jpg";
import gymbackground from "../../img/gymbackground.jpg";
import boxingbackground from "../../img/boxingbackground.jpg";

import yogadetail from "../../img/yoga3.jpg";
import gymdetail from "../../img/gymcourse.jpg";
import boxingdetail from "../../img/boxingcourse.jpg";
import dancedetail from "../../img/dance1.jpg";
import { Carousel } from "antd";
import yoga1 from "../../img/yoga1.jpg";
import yoga2 from "../../img/yoga2.jpg";
import yoga3 from "../../img/yoga4.jpg";
import yoga4 from "../../img/yoga5.jpg";

import dance1 from "../../img/dance2.jpg";
import dance2 from "../../img/dance3.jpg";
import dance3 from "../../img/dance4.jpg";
import dance4 from "../../img/dance5.jpg";

import gym1 from "../../img/gym1.jpg";
import gym2 from "../../img/gym2.jpg";
import gym3 from "../../img/gym3.jpg";
import gym4 from "../../img/gym4.jpg";

import boxing1 from "../../img/boxing1.jpg";
import boxing2 from "../../img/boxing2.jpg";
import boxing3 from "../../img/boxing3.jpg";
import boxing4 from "../../img/boxing4.jpg";

import { useParams } from "react-router-dom";
import PayCourse from "../User/PayCourse";
import { Form, Input } from "antd";
import { Link } from "react-router-dom";
import { Footer } from "antd/es/layout/layout";
import { Button, message, Popconfirm, Modal } from "antd";

export default function DetailCourse() {
  const [course, setCourse] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accountId, setAccountId] = useState(null);
  const [feedbackConfig, setFeedbackConfig] = useState({});
  const [feedback, setFeedback] = useState([]);
  const [usernames, setUsernames] = useState({});
  const user = localStorage.getItem("user");
  const { id = "" } = useParams();
  const { TextArea } = Input;
  const [updateForm] = Form.useForm();

  const images = {};

  if (course.typeId === 1) {
    images.background = yogabackground;
    images.detail = yogadetail;
    images.img1 = yoga1;
    images.img2 = yoga2;
    images.img3 = yoga3;
    images.img4 = yoga4;
  } else if (course.typeId === 2) {
    images.background = boxingbackground;
    images.detail = boxingdetail;
    images.img1 = boxing1;
    images.img2 = boxing2;
    images.img3 = boxing3;
    images.img4 = boxing4;
  } else if (course.typeId === 3) {
    images.background = dancebackground;
    images.detail = dancedetail;
    images.img1 = dance1;
    images.img2 = dance2;
    images.img3 = dance3;
    images.img4 = dance4;
  } else if (course.typeId === 4) {
    images.background = gymbackground;
    images.detail = gymdetail;
    images.img1 = gym1;
    images.img2 = gym2;
    images.img3 = gym3;
    images.img4 = gym4;
  }


  const confirm = async () => {
    try {
      await axios.delete(
        `https://localhost:7158/api/feedback/${accountId}/${course.courseId}`,
        { headers: { "Content-Type": "application/json" } }
      );
      setFeedback(feedback.filter(item => item.accountId !== accountId));
      message.success("Feedback deleted successfully!");
    } catch (error) {
      message.error("Error deleting feedback!");
      console.log("Error:", error);
    }
  };

  const cancel = (e) => {
    console.log(e);
    message.error("Đã xóa bài đánh giá");
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async (values) => {
    try {
      await axios.put(
        "https://localhost:7158/api/feedback",
        {
          accountId: accountId,
          courseId: course.courseId,
          detail: values.TextArea,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      setFeedback(feedback.map(item => item.accountId === accountId ? { ...item, detail: values.TextArea } : item));
      message.success("Feedback updated successfully!");
      setIsModalOpen(false);
    } catch (error) {
      message.error("Error updating feedback!");
      console.log("Error:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
    try {
      await axios.post(
        "https://localhost:7158/api/feedback",
        {
          accountId: accountId,
          courseId: course.courseId,
          detail: values.TextArea,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      message.success("Feedback submitted successfully!");
      // Reload the page after displaying the success message
      setTimeout(() => {
        window.location.reload();
      }, 1000); // Delay to allow the message to be visible
    } catch {
      console.log("Error");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    updateForm.setFieldValue("TextArea", feedbackConfig.detail);
  }, [feedbackConfig]);

  // useEffect(() => {
  //   fetch("https://localhost:7158/api/feedback")
  //     .then((response) => response.json())
  //     .then((data) => setFeedback(data.filter((item) => item.courseId === id)));
  // }, []);

  const fetchUsernameById = async (accountId) => {
    try {
      const response = await axios.get(
        `https://localhost:7158/api/Account/GetUsernameById/${accountId}`
      );
      return response.data; // Return the username
    } catch (error) {
      console.error(`Error fetching username for accountId ${accountId}:`, error);
      return null;
    }
  };

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch("https://localhost:7158/api/feedback");
        const data = await response.json();
        const courseFeedback = data.filter((item) => item.courseId === id);

        // Fetch usernames for each feedback
        const usernameMap = {};
        await Promise.all(
          courseFeedback.map(async (item) => {
            if (!usernameMap[item.accountId]) {
              const username = await fetchUsernameById(item.accountId);
              usernameMap[item.accountId] = username || item.accountId; // Store username or fallback to accountId
            }
          })
        );

        setUsernames(usernameMap); // Store usernames in state
        setFeedback(courseFeedback);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedbacks();
  }, [id]);

  const api = "https://localhost:7158/api/Course/:id";
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(api.replace(":id", id));
        setCourse(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCourse();
  }, [id]);

  useEffect(() => {
    if (!user) {
      console.error("Không có người dùng trong localStorage!");
      return;
    }
    const fetchAccountId = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7158/api/Account/GetAccountIdByUserName/${user}`
        );
        setAccountId(response.data);
      } catch (error) {
        console.error("Lỗi khi tải người dùng:", error);
      }
    };

    fetchAccountId();
  });

  function formatDate(dateString) {
    // Tạo một đối tượng Date từ chuỗi ngày
    const date = new Date(dateString);

    // Lấy ngày, tháng và năm từ đối tượng Date
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    // Định dạng lại ngày và tháng để có hai chữ số, nếu cần
    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;

    // Trả về ngày đã định dạng (vd: dd/mm/yyyy)
    return `${formattedDay}/${formattedMonth}/${year}`;
  }

  const [paid, setPaid] = useState(false);
  const [orderAcc, setOrderAcc] = useState();
  const [billId, setBillId] = useState();
  // Check if the user has already purchased the course
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderRes = await axios.get(`https://localhost:7158/api/order/getorders`);
        const matchingOrders = orderRes.data.filter(
          (order) => order.accountId === accountId && order.courseId === id
        );

        if (matchingOrders.length > 0) {
          const billRes = await axios.get(`https://localhost:7158/api/Bill/getbills`);
          const matchingBill = billRes.data.find((bill) =>
            matchingOrders.some((order) => bill.orderId === order.orderId)
          );

          if (matchingBill) {
            setPaid(true); // Có hóa đơn cho ít nhất một đơn hàng
          } else {
            setPaid(false); // Không có hóa đơn cho bất kỳ đơn hàng nào
          }
        } else {
          setPaid(false); // Không tìm thấy bất kỳ đơn hàng nào
        }
      } catch (error) {
        console.error("Error fetching order/bill:", error);
      }
    };

    if (accountId) {
      fetchOrder();
    }
  }, [accountId, id]);

  return (
    <>
      <div className="home-page">
        <Header />
      </div>
      <div className="ml-[395px]">
        <Modal
          title="Người dùng"
          open={isModalOpen}
          // onOk={handleOk}
          footer={null}
          okButtonProps={{
            style: { backgroundColor: "blue" },
          }}
          onCancel={handleCancel}
        >
          <Form
            form={updateForm}
            onFinish={handleOk}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            class="mb-4"
          >
            <Form.Item
              label="Feedback"
              name="TextArea"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập đánh giá của bạn",
                },
              ]}
            >
              <Input.TextArea rows={5} />
            </Form.Item>
            <div className="flex space-x-4 justify-end ">
              <button
                onClick={handleCancel}
                className="rounded w-[70px] text-sm border-2 font-bold border-red-600 bg-white py-2 mt-3 text-lg text-red-500 focus:outline-none"
              >
                CANCEL
              </button>
              <button
                type="primary"
                htmlType="submit"
                className="rounded w-[70px] text-sm border-2 border-blue-700  py-2 mt-3 text-lg text-blue-500 font-bold  focus:outline-none"
              >
                Update
              </button>
            </div>
          </Form>
        </Modal>
      </div>
      <div className="relative">
        {/* background video */}
      <div className="video-background">
        <iframe
          width="100%"
          height="300"
          src="https://www.youtube.com/embed/OrDB4jpA1g8?autoplay=1"
          title="Gym Video Background"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
        <div className="flex">
          {/* left content */}
          <div className="w-[70%] mt-10 flex flex-col">
            {/* introduce */}
            <div className="ml-[30%]">
              <div className="">
                <h2 className="text-orange-400 text-3xl">
                  {course.courseName}
                </h2>
              </div>
              {/* đặc điểm khóa học */}
              <div className="mt-5">
                <h2 className="text-black text-xl font-bold">
                  Miêu tả khóa học
                </h2>
                <p className="w-[90%] text-sm mt-3">{course.description}</p>
                <hr />
                <p className="py-5 text-sm">
                  <div className="text-black text-xl font-bold"> Chi tiết khóa học </div>
                  <div className="ml-5 text-sm mt-2">
                    <li>Người tạo: {course.createBy}</li>
                    <li>
                      Chỉ số phù hợp: {course.bmiMin} - {course.bmiMax}
                    </li>
                    <li>Ngày tạo: {formatDate(course.dateUpdate)}</li>
                    <li>Ngôn ngữ: {course.language}</li>
                  </div>
                </p>
              </div>
              {/* Đem tới gì cho bạn */}
              {/* <div className="mt-5">
                <h2 className="text-black text-xl font-bold">
                  KHÓA HỌC CÓ NHỮNG CHỨNG CHỈ NÀO
                </h2>
                <p className="py-5 text-sm">{course.certificate}</p>
              </div> */}
              <Carousel autoplay>
                <div>
                  <img className="w-full h-[450px]" src={images.img1} alt="" />
                </div>
                <div>
                  <img className="w-full h-[450px]" src={images.img2} alt="" />
                </div>
                <div>
                  <img className="w-full h-[450px]" src={images.img3} alt="" />
                </div>
                <div>
                  <img className="w-full h-[450px]" src={images.img4} alt="" />
                </div>
              </Carousel>
              <div className="mt-5">
                {paid && (
                  <div class="max-w-[700px] mx-auto mt-16 flex w-full flex-col border rounded-lg bg-white p-8">
                    <h2 class="title-font mb-1 text-lg font-medium text-gray-900">
                      Xin chào {feedback.accountId}
                    </h2>
                    <p class="mb-5 leading-relaxed text-gray-600">
                      Hãy chia sẽ feedback của bạn cho chúng tôi để chúng tôi có
                      thể cải thiện hơn!
                    </p>

                    <Form
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      layout="vertical"
                      class="mb-4"
                    >
                      <Form.Item
                        label="Feedback"
                        name="TextArea"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập đánh giá của bạn",
                          },
                        ]}
                      >
                        <Input.TextArea rows={5} />
                      </Form.Item>

                      <button
                        type="primary"
                        htmlType="submit"
                        className="rounded w-[615px] border-0 bg-indigo-500 py-2 mt-3 text-lg text-white hover:bg-indigo-600 focus:outline-none"
                      >
                        Send
                      </button>
                    </Form>
                  </div>
                )}

                <div className="max-w-[700px]  mx-auto mt-16 flex w-full flex-col border rounded-lg bg-white p-8 mb-10">
                  <h2 className=" mb-1 text-lg font-medium text-black">
                    ĐÁNH GIÁ SẢN PHẨM
                  </h2>
                  {/* ---bài đánh GIÁ */}

                  {feedback?.findIndex(
                    (item) => item.accountId === accountId
                  ) !== -1 && (
                      <div className="mt-5">
                        {/* nguoi dung 1 */}

                        <p className=" leading-relaxed text-black">
                          {feedback.courseId}
                        </p>
                        <div className="mt-2">
                          <p className=" leading-relaxed text-black">{user}</p>
                          {/* contend */}
                          <div className="mt-2 rounded-lg bg-gray-100">
                            <p className="leading-relaxed text-sm max-w-xl px-2  py-2 text-gray-600">
                              {
                                feedback?.find(
                                  (item) => item.accountId === accountId
                                )?.detail
                              }
                            </p>
                          </div>
                        </div>

                        <div className="flex space-x-4 justify-end ">
                          <Popconfirm
                            title="Xóa bài đánh giá"
                            description="Bạn muốn xóa bài đánh giá này ?"
                            onConfirm={confirm}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                            okButtonProps={{
                              style: { backgroundColor: "red" },
                            }}
                          >
                            <button className="text-red-500 bg-white rounded-sm border-2 border-red-600 text-[12px] font-bold py-[2px] w-[50px]">
                              Xóa
                            </button>{" "}
                          </Popconfirm>

                          <button
                            type="primary"
                            onClick={() => {
                              showModal();
                              setFeedbackConfig(
                                feedback?.find(
                                  (item) => item.accountId === accountId
                                )
                              );
                            }}
                            className="text-blue-600 border-2 border-blue-600 ml-3 font-bold   text-[12px] py-[2px] w-[50px] "
                          >
                            Sửa
                          </button>
                        </div>
                        {/* nguoi dung 2 */}
                      </div>
                    )}

                  {feedback?.map((item) => (
                    <div key={item.accountId} className="mt-5">
                      {/* Display username instead of accountId */}
                      <p className=" leading-relaxed text-black">{usernames[item.accountId]}</p>
                      <div className="mt-2 rounded-lg bg-gray-100">
                        <p className="leading-relaxed text-sm max-w-xl px-2 py-2 text-gray-600 w-full">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                  {!feedback.length && <p>Hiện chưa có bài đánh giá nào cho khóa học này</p>}
                </div>
              </div>
            </div>
          </div>
          {/* right content */}
          <div className="w-[20%] flex flex-col mt-10 h-[620px] ml-[70px] shadow-black absolute fixed right-[100px] top-[300px] shadow-2xl">
            <div className="w-full">
              <img className="w-full" src={images.detail} alt="" />
              <div className="py-4 px-2 text-sm flex flex-col w-[70%] mx-auto">
                <p className="text-sm">{course.description}</p>
                <p className="py-4 text-sm">RATING: {course.rating}</p>
              </div>
              {/* 2btn */}
              <div className="flex flex-col h-[25%] w-[70%] mx-auto py-4">
                {paid ? (
                  // If paid, show EnrollCourse component
                  <Link
                    className="mt-3 ml-5"
                    to={`/learningCourse/${course.courseId}`}
                  >
                    <h3 className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                      Tham gia khóa học
                    </h3>
                  </Link>
                ) : (
                  // If not paid, show price and PayCourse button
                  <>
                    <div className="mb-3">Price: {course.price}</div>
                    <PayCourse courseId={id} />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
