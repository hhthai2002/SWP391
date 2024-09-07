import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Modal } from "antd";
import ModalNutriRecommend from "./NutriRecommend";
import BMIModal from "../../components/ModelUpdateBMI";


export default function LearningCourse() {
  const { id } = useParams();
  const [sessions, setSessions] = useState([]);
  const [lessons, setLessons] = useState({});
  const [currentVideo, setCurrentVideo] = useState('');
  const [currentLesson, setCurrentLesson] = useState('');
  const [currentLessonCover, setCurrentLessonCover] = useState('');
  const [currentSession, setCurrentSession] = useState('');
  const [isRecommendModalOpen, setIsRecommendModalOpen] = useState(false);
  const { SubMenu } = Menu;
  const [isPlaying, setIsPlaying] = useState(false);
  const localAccount = localStorage.getItem("accountId");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const fetchCourse = async () => {
    try {
      const sessionResponse = await axios.get("https://localhost:7158/api/Session/GetSessions");
      const foundSessions = sessionResponse.data.filter(session => session.courseId === id);
      if (foundSessions.length > 0) {
        setSessions(foundSessions);
      } else {
        setSessions([{ sessionName: "Failed to get sessions" }]);
      }

      // Fetch lessons
      const lessonResponse = await axios.get("https://localhost:7158/api/Lesson/GetLessons");
      const lessonsData = lessonResponse.data.reduce((acc, lesson) => {
        if (!acc[lesson.sessionId]) {
          acc[lesson.sessionId] = [];
        }
        acc[lesson.sessionId].push(lesson);
        return acc;
      }, {});
      setLessons(lessonsData);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  // Hàm để lấy dữ liệu cho currentSession và currentLesson từ API GET
  const getCurrentProgress = async () => {
    try {
      const response = await axios.get(`https://localhost:7158/api/Course/current-progress/${localAccount}?courseId=${id}`);
      //console.log(response.data);
      if (response.data.length > 0) {
        const currentProgress = response.data[0];
        //console.log(currentProgress);
        setCurrentSession(currentProgress.currentSessionId);
        setCurrentLesson(currentProgress.currentLessonId);

        const lessonResponse = await axios.get("https://localhost:7158/api/Lesson/GetLessons");
        const foundLesson = lessonResponse.data.filter(lesson => lesson.lessonId === currentProgress.currentLessonId);
        if (foundLesson.length > 0) {
          const selectLesson = foundLesson[0];
          console.log(selectLesson);
          setCurrentVideo(selectLesson.videoFile);
          setCurrentLessonCover(selectLesson.cover);
        }

      }
      // Log dữ liệu sau khi cập nhật state
    } catch (error) {
      console.error("Error fetching current progress:", error);
    }
  };

  // Sử dụng useEffect để gọi hàm getCurrentProgress khi component được render
  useEffect(() => {
    getCurrentProgress();
  }, []);

  const updateProgress = async (accountId, courseId, sessionId, lessonId) => {
    try {
      const response = await axios.post(`https://localhost:7158/api/Course/update-progress/${accountId}`, {
        courseId: courseId,
        sessionId: sessionId,
        lessonId: lessonId
      });
      console.log(response.data); // Log response từ API nếu cần thiết
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  const handleMenuClick = (e) => {
    const [sessionIndex, lessonIndex] = e.key.split('-').slice(1);
    setCurrentSession(sessions[sessionIndex].sessionId);
    setCurrentVideo(lessons[sessions[sessionIndex].sessionId][lessonIndex].videoFile);
    setCurrentLessonCover(lessons[sessions[sessionIndex].sessionId][lessonIndex].cover);
    setCurrentLesson(lessons[sessions[sessionIndex].sessionId][lessonIndex].lessonId);
    updateProgress(localAccount, id, sessions[sessionIndex].sessionId, lessons[sessions[sessionIndex].sessionId][lessonIndex].lessonId);
  };

  const getLastLessonId = () => {
    if (sessions.length === 0) return null;
    const lastSessionId = sessions[sessions.length - 1].sessionId;
    const lastSessionLessons = lessons[lastSessionId];
    if (!lastSessionLessons || lastSessionLessons.length === 0) return null;
    return lastSessionLessons[lastSessionLessons.length - 1].lessonId;
  };

  const handleOk = async () => {
    const accountId = localStorage.getItem("accountId");
    const createDate = new Date().toISOString();
    try {
      const response = await axios.post("https://localhost:7158/api/BMI", {
        weight,
        height,
        createDate,
        accountId,
      });
      console.log("BMI created successfully");
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error creating BMI: ", error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="home-page">
        <Header />
      </div>

      <div className="flex justify-end ml-5">
        <div className="w-[80%] flex flex-col">
          <div className="bg-black w-full h-[620px]  flex justify-center items-center">
            <div>
              <video src={`https://healthexpert.blob.core.windows.net/healthexpertvideos2/${currentVideo}`} controls={true} autoPlay={isPlaying}
                className="w-full h-[600px]" />
            </div>
          </div>
          {/* mo ta khoa hoc */}
          <div className="mt-5">
            <h2 className="text-[20px] font-bold">Lời khuyên của bài học:</h2>
            <br />
            <h2 className="text-[20px]">{currentLessonCover}</h2>
          </div>
          <div className="flex flex-row justify-between">
            <button
              onClick={() => {
                setIsRecommendModalOpen(true);
              }}
              className="w-[250px] mr-[90px] rounded-md bg-orange-400 hover:bg-black text-white font-bold py-3 px-4 rounded opacity-100 hover:opacity-80 transition-opacity mt-3"
            >
              Đề xuất dinh dưỡng</button>
            {currentLesson === getLastLessonId() && (
              <button
                onClick={showModal}
                className="w-[250px] mr-[90px] rounded-md bg-orange-400 hover:bg-black text-white font-bold py-3 px-4 rounded opacity-100 hover:opacity-80 transition-opacity mt-3"
              >
                Hoàn thành khóa học
              </button>
            )}
          </div>
        </div>

        <Modal
          open={isRecommendModalOpen}
          onCancel={() => setIsRecommendModalOpen(false)}
          okText="123456"
          width={900}
          footer={null}
          styles={{
            backgroundColor: "orange-400",
          }}
        >
          <ModalNutriRecommend sessionId={currentSession} />
        </Modal>
        <BMIModal
          isVisible={isModalVisible}
          handleOk={handleOk}
          handleCancel={handleCancel}
          weight={weight}
          setWeight={setWeight}
          height={height}
          setHeight={setHeight}
        />
        <div className="w-[20%] ">
          <Menu mode="inline" onClick={handleMenuClick}>
            {sessions.map((session, index) => (
              <SubMenu key={`session-${index}`} title={`${session.sessionName}`}>
                {lessons[session.sessionId] && lessons[session.sessionId].map((lesson, lessonIndex) => (
                  <Menu.Item key={`lesson-${index}-${lessonIndex}`}>{lesson.caption}</Menu.Item>
                ))}
              </SubMenu>
            ))}
          </Menu>
        </div>
      </div >
    </>
  );
}
