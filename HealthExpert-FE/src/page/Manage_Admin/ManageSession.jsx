import React, { useEffect } from "react";
import { useState } from "react";
import MenuLeft from "../../components/MenuLeft";
import { Table } from "antd";
import { MinusCircleOutlined, SyncOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { Space, Tag } from "antd";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import ModalCreatSession from "../../components/ModalCreatSession";
import ModalDeleteSession from "./ModelDeleteSession";
import { useNavigate } from "react-router-dom";
import ModalAddNutrition from "./ModelAddNutrition";
import ModalUpdateNutrition from "./ModelUpdateNutrition";

export default function ManageSession() {
  const [sessions, setSessions] = useState([]);
  const { id } = useParams();
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  localStorage.setItem("currentCourse", id);
  const navigate = useNavigate();
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
        const response = await axios.get(`https://localhost:7158/api/Course/${id}`);
        setCourseName(response.data.courseName);
      } catch (error) {
        console.error("Error fetching course details: ", error);
      }
    };
    fetchCourse();
  }, [id]);

  const fetchNutritions = async () => {
    try {
      const response = await axios.get("https://localhost:7158/api/Nutrition");
      return response.data;
    } catch (error) {
      console.error("Error fetching nutrition data: ", error);
      return [];
    }
  };

  const fetchCourse = async () => {
    try {
      const sessionResponse = await axios.get("https://localhost:7158/api/Session/GetSessions");
      const foundSessions = sessionResponse.data.filter(session => session.courseId === id);
      if (foundSessions.length > 0) {
        setSessions(foundSessions);
        const nutritions = await fetchNutritions();
        const sessionWithNutrition = {};
        foundSessions.forEach(session => {
          const matchedNutrition = nutritions.find(nutrition => nutrition.sessionId === session.sessionId);
          if (matchedNutrition) {
            sessionWithNutrition[session.sessionId] = true;
          } else {
            sessionWithNutrition[session.sessionId] = false;
          }
        });
        setSessionWithNutrition(sessionWithNutrition);
      } else {
        setSessions([{ sessionName: "Failed to get sessions" }]);
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
      title: "ID buổi học",
      dataIndex: "sessionId",
      sorter: (a, b) => a.sessionId - b.sessionId,
      width: "10%",
      render: (text, record) => (
        <Link to={`/manageLesson/${record.sessionId}`}>{text}</Link>
      ),
    },
    {
      title: "Tên buổi học",
      dataIndex: "sessionName",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
    },
    {
      title: "Thao tác",
      render: (_, record) => (
        <div className="flex">
          <button
            type="primary"
            onClick={() => {
              setSelectedSessionId(record.sessionId);
              setIsModalDeleteOpen(true);
            }}
            className="bg-orange-400 w-[100px] py-1 rounded-xl "
          >
            Xóa
          </button>
          <ModalDeleteSession
            sessionId={selectedSessionId}
            onDelete={handleDelete}
            isModalOpen={isModalDeleteOpen}
            setIsModalOpen={setIsModalDeleteOpen}
          />
          <div className="bg-orange-400 w-[100px] py-1 rounded-xl ml-10 text-center flex justify-center items-center">
            <Link
              to={`/updateSession/${record.sessionId}`}
            >
              &nbsp;&nbsp;&nbsp;Chỉnh sửa&nbsp;&nbsp;&nbsp;
            </Link>
          </div>
          {sessionWithNutrition[record.sessionId] ? (
            <>
              <button
                type="primary"
                className="bg-orange-400 w-[100px] py-1 rounded-xl ml-10"
                onClick={() => {
                  setSelectedSessionId(record.sessionId);
                  setIsUpdateModalOpen(true);
                }}
              >
                Cập nhật dinh dưỡng
              </button>
              <Modal
                open={isUpdateModalOpen}
                onCancel={() => setIsUpdateModalOpen(false)}
                okText="123456"
                width={900}
                footer={null}
                styles={{
                  backgroundColor: "orange-400",
                }}
              >
                <ModalUpdateNutrition sessionId={selectedSessionId} />
              </Modal>
            </>
          ) : (
            <>
              <button
                type="primary"
                onClick={() => {
                  setSelectedSessionId(record.sessionId);
                  setIsModalAddOpen(true);
                }}
                className="bg-orange-400 w-[100px] py-1 rounded-xl ml-10"
              >
                Thêm dinh dưỡng
              </button>
              <Modal
                open={isModalAddOpen}
                onCancel={() => setIsModalAddOpen(false)}
                okText="123456"
                width={900}
                footer={null}
                styles={{
                  backgroundColor: "orange-400",
                }}
              >
                <ModalAddNutrition sessionId={selectedSessionId} />
              </Modal>
            </>
          )}

        </div>
      ),
      width: "30%",
    },
  ];

  const handleDelete = async (deletedSessionId) => {
    setIsModalDeleteOpen(false);
    navigate(`/manageSession/${id}`, { replace: true });
  };

  const handleAddNutrition = async (AddNutritionId) => {
    setIsModalAddOpen(false);
    navigate(`/manageSession/${id}`, { replace: true });
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [sessionWithNutrition, setSessionWithNutrition] = useState({});

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

  const showModalAdd = () => {
    setIsModalAddOpen(true);
  };

  const handleCancelAdd = () => {
    setIsModalAddOpen(false);
  };

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
            Tạo buổi học
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
            <ModalCreatSession />
          </Modal>
          <div className="mt-10">
            <h1>
              <Table
                columns={columns}
                dataSource={sessions}
                onChange={onChange}
              />
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
