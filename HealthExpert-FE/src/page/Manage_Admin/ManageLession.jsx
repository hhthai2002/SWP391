import React, { useEffect } from "react";
import { useState } from "react";
import MenuLeft from "../../components/MenuLeft";
import Header from "../../components/Header";
import { Table } from "antd";
import { MinusCircleOutlined, SyncOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { Space, Tag } from "antd";
import ModalCreatLession from "../../components/ModalCreatLession";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import ModalDeleteLesson from "./ModelDeleteLesson";

export default function ManageLesson() {
  const [lessions, setLessions] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const currentCourse = localStorage.getItem("currentCourse");
  const [courseName, setCourseName] = useState('');

  useEffect(() => {
    const roleIdFromLocalStorage = localStorage.getItem("roleId");
    if (roleIdFromLocalStorage && roleIdFromLocalStorage === "4") {
      navigate('/home');
    }
  }, []);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`https://localhost:7158/api/Course/${currentCourse}`);
        setCourseName(response.data.courseName);
      } catch (error) {
        console.error("Error fetching course details: ", error);
      }
    };
    fetchCourse();
  }, [currentCourse]);

  console.log("lessions", lessions);
  localStorage.setItem("currentSession", id)
  const fetchCourse = async () => {
    try {
      const sessionResponse = await axios.get("https://localhost:7158/api/Lesson/GetLessons");
      const foundLesson = sessionResponse.data.filter(lesson => lesson.sessionId === id);
      if (foundLesson.length > 0) {
        setLessions(foundLesson);

      } else {
        setLessions([{ LessonName: "Failed to get sessions" }]);
      }
    } catch (error) {
      console.log(error);
    }

  };
  useEffect(() => {
    fetchCourse();
  }, [id]);

  const columns = [
    {
      title: "ID bài học",
      dataIndex: "lessonId",
      sorter: (a, b) => a.age - b.age,
      width: "10%",
    },
    {
      title: "Tên bài học",
      dataIndex: "caption",
    },

    {
      title: "Link video",
      dataIndex: "videoFile",
      render: (text) => <a href={text}>{text}</a>,
    },
    {
      title: "Thao tác",
      render: (_, record) => (
        <div className="flex">
          <button
            type="primary"
            onClick={() => {
              setSelectedLessonId(record.lessonId);
              setIsModalDeleteOpen(true);
            }}
            className="bg-orange-400 w-[100px] py-1 rounded-xl "
          >
            Xóa
          </button>
          <ModalDeleteLesson
            lessonId={selectedLessonId}
            onDelete={handleDelete}
            isModalOpen={isModalDeleteOpen}
            setIsModalOpen={setIsModalDeleteOpen}
          />
          {/* <div className="bg-orange-400 w-[100px] py-1 rounded-xl ml-10">
            <Link
            >
              &nbsp;&nbsp;&nbsp;Chỉnh sửa&nbsp;&nbsp;&nbsp;
            </Link>
          </div> */}

        </div>
      ),
      width: "30%",
    },
  ];

  const handleDelete = async (deletedSessionId) => {

    setIsModalDeleteOpen(false);
    navigate(`/manageLesson/${id}`, { replace: true }); // Điều hướng sau khi xóa

  };
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const showModalCreate = () => {
    setIsModalCreateOpen(true);
  };

  const handleCancelCreate = () => {
    setIsModalCreateOpen(false);
  };

  const showModalDelete = () => {
    setIsModalDeleteOpen(true);
  };

  const handleCancelDelete = () => {
    setIsModalDeleteOpen(false);
  };

  // useEffect(() => {
  //   fetch("https://localhost:7158/api/Lesson/GetLessons").then((data) => {
  //     data.json().then((data) => setLessions(data));
  //   });
  // }, []);

  return (
    <>
      <div className="w-full" >
        <Header />
      </div>
      <div className="w-full flex mt-16">
        <div className="w-[20%] h-full ">
          <div className="home-page">
            <MenuLeft />
          </div>
        </div>
        <div className="w-[80%] mt-3">
          <h2 className="font-bold text-2xl">Khóa học {courseName}</h2>
          <button
            type="primary"
            onClick={showModalCreate}
            className="w-[250px] mr-[90px] rounded-md  bottom-1 right-3	 bg-orange-400 text-black font-bold py-3 px-4 opacity-100 hover:opacity-80 transition-opacity mt-3 "
          >
            Tạo bài học
          </button>
          <Modal
            open={isModalCreateOpen}
            onCancel={handleCancelCreate}
            okText="123456"
            width={900}
            footer={null}
            styles={{
              backgroundColor: "orange-400",
            }}
          >
            <ModalCreatLession />
          </Modal>
          <Modal
            style={{ top: 150 }}
            open={isModalDeleteOpen}
            onCancel={handleCancelDelete}
            okText="123456"
            width={500}
            footer={null}
            bodyStyle={{
              backgroundColor: "orange-400",
            }}
          >
            <h2 className="mx-auto text-center font-bold text-xl justify-center">
              Bạn có muốn xóa bài học này
            </h2>
            <div className=" flex ml-[300px]">
              <button
                onClick={handleCancelDelete}
                className="w-[70px] rounded-xl mr-6 mt-4 bg-orange-400 justify-end"
              >
                Cancle
              </button>
              <button className="w-[70px] rounded-xl mt-4 bg-orange-400 justify-end">
                OK
              </button>
            </div>

          </Modal>

          <div className="mt-10">
            <h1>
              <Table
                columns={columns}
                dataSource={lessions}
                onChange={onChange}
              />
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
