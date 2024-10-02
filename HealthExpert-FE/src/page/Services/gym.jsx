import React from "react";
import { useState, useEffect } from 'react';

import gymbackground from "../../img/gymbackground.jpg"; // Xóa nếu không sử dụng
import Header from "../../components/Header";
import gymcourse from "../../img/gymcourse.jpg";

import { Pagination } from "antd";
import './dance.css';
import DetailCourse from "../DescriptionCourse/DetailCourse";
import { Link } from "react-router-dom";

export default function Gym() {
  // const dispatch = useDispatch();
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 9;

  useEffect(() => {
    fetch('https://localhost:7158/api/Course')
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  const filteredCoursesCount = courses.filter(course => course.typeId === 4).length;

  // Nếu số lượng khóa học trong trang hiện tại lớn hơn 9, sử dụng phân trang
  const showPagination = filteredCoursesCount > coursesPerPage;

  // Lọc khóa học theo trang hiện tại
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses
    .filter(course => course.typeId === 4)
    .slice(indexOfFirstCourse, indexOfLastCourse);

  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  return (
    <>
      <div className="home-page">
        <Header />
      </div>
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
      <section>
        {/* content gym */}
        <div className="">
          <h2 className="mt-10 text-center text-[30px] text-orange-400">
            KHÓA HỌC GYM TẠI HEALTH 45 <br /> TĂNG CƯỜNG SỨC MẠNH, ĐỘ BỀN VÀ TẬP TRUNG
          </h2>
          <p className="text-center mt-3">
            Tập gym là một phương pháp tập luyện hiệu quả để cải thiện sức khỏe và sức mạnh cơ bắp. Với các bài tập như nâng tạ, đẩy tạ, và các bài tập cơ bản khác, bạn có thể phát triển cơ bắp, tăng cường sức mạnh và độ bền cho cơ thể của mình. <br /> Bên cạnh việc rèn luyện cơ bắp, tập gym còn giúp cải thiện sự linh hoạt, tăng cường sức khỏe tim mạch và hệ miễn dịch. <br /> Đến với <a href="/home"><span className="text-orange-400">Health 45</span>,</a> khám phá thế giới của gym và bắt đầu hành trình rèn luyện sức khỏe của bạn ngay hôm nay.
          </p>
        </div>
      </section>
      <section>
        <div className="course-grid">
          {currentCourses.map(course => (
            <div key={course.id}>
              <div className="w-full mt-10">
                <div className="flex justify-center mx-auto w-[70%] ">
                  <div className="flex flex-col h-[450px] hover:shadow-md">
                    <img className="w-[80%] h-[250px] " src={gymcourse} alt="" />
                    <Link className="mt-3 ml-5"
                      to={`/detailCourse/${course.courseId}`}>
                      <h3 className="text-orange-400 text-[20px] mt-2 ">{course.courseName}</h3>
                    </Link>
                    <p className="w-[70%] text-[14px] mt-3 ml-5 line-clamp-3">
                      {course.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {showPagination && ( // Kiểm tra xem có cần hiển thị phân trang không
          <div className="pagination">
            {currentPage > 1 && <button onClick={prevPage}>Previous</button>}
            {currentPage < Math.ceil(filteredCoursesCount / coursesPerPage) && (
              <button onClick={nextPage}>Next</button>
            )}
          </div>
        )}
      </section >
    </>
  );
}
