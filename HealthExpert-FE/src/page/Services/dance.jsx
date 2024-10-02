import React from "react";
import { useState, useEffect } from 'react';

import danceackground from "../../img/dancebackground.jpg";
import Header from "../../components/Header";
import dance1 from "../../img/dance1.jpg";
import dance2 from "../../img/dance2.jpg";
import dance3 from "../../img/dance3.jpg";
import dance4 from "../../img/dance4.jpg";
import dance5 from "../../img/dance5.jpg";
import dance6 from "../../img/dance6.jpg";
import dance7 from "../../img/dance7.jpg";
import dance8 from "../../img/dance8.jpg";
import dance9 from "../../img/dance9.jpg";
import { Pagination } from "antd";
import './dance.css';
import DetailCourse from "../DescriptionCourse/DetailCourse";
import { Link } from "react-router-dom";

export default function Dance() {
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
  const filteredCoursesCount = courses.filter(course => course.typeId === 3).length;
  //const filteredCoursesCount = courses.filter(course => course.typeId === 0).length;

  // Nếu số lượng khóa học trong trang hiện tại lớn hơn 9, sử dụng phân trang
  const showPagination = filteredCoursesCount > coursesPerPage;

  // Lọc khóa học theo trang hiện tại
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses
    .filter(course => course.typeId === 3)
    .slice(indexOfFirstCourse, indexOfLastCourse);

  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  return (
    <>
      <div className="home-page">
        <Header />
      </div>
      {/* background yoga */}
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
        {/* contend yoga */}
        <div className="">
          <h2 className=" mt-10 text-center   text-[30px] text-orange-400">
            KHÓA HỌC DANCE TẠI HELP45 <br /> THƯ GIÃN TÂM TRÍ, TINH THẦN VÀ
            CẢI THIỆN SỨC KHỎE
          </h2>
          <p className="text-center mt-3">
            Tập dance là một hình thức tập luyện giúp giảm cân thư giãn hiệu
            quả. Với những bài tập giúp <br /> học viên nâng cao nhân thức và
            tạo ra sự cân bằng giữa tinh thần và thể chất. Tập Dance <br /> mỗi
            ngày giúp bạn trở nên nhẹ nhàng, chữa lành và tích cực hơn. Đến với
            <a href="/home">
              {" "}
              <span className="text-orange-400"> Help45</span>,
            </a>
            <br /> tập luyện và cải thiện thẻ chất và tinh thần của bạn.
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
                    <img className="w-[80%] h-[250px] " src={dance1} alt="" />
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
