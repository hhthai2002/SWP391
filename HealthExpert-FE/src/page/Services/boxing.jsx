
import React from "react";
import { useState, useEffect } from 'react';
import boxingbackground from "../../img/boxingbackground.jpg";
import Header from "../../components/Header";
import boxingcourse from "../../img/boxingcourse.jpg";
import danceackground from "../../img/dancebackground.jpg";
import { Pagination } from "antd";
import './dance.css';
import DetailCourse from "../DescriptionCourse/DetailCourse";
import { Link } from "react-router-dom";

export default function Boxing() {
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
  const filteredCoursesCount = courses.filter(course => course.typeId === 2).length;
  //const filteredCoursesCount = courses.filter(course => course.typeId === 0).length;

  // Nếu số lượng khóa học trong trang hiện tại lớn hơn 9, sử dụng phân trang
  const showPagination = filteredCoursesCount > coursesPerPage;

  // Lọc khóa học theo trang hiện tại
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses
    .filter(course => course.typeId === 2)
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
            KHÓA HỌC BOXING TẠI HEALTH 45 <br /> THỂ THAO CỦA NGƯỜI DŨNG CẢM, SỨC MẠNH VÀ SỰ KIÊN NHẪN
          </h2>
          <p className="text-center mt-3">
            Tập boxing là một hình thức tập luyện toàn diện giúp cải thiện sức mạnh, sự linh hoạt và sức bền của cơ thể. Với những bài tập chính xác và phương pháp rèn luyện kỹ thuật, bạn có thể đẩy mạnh khả năng phòng thủ và tấn công của mình.<br /> Bên cạnh việc tăng cường cơ bắp và sức mạnh, tập boxing cũng là một cách tuyệt vời để đốt cháy calo, giảm căng thẳng, và cải thiện sự tập trung và tự tin của bạn.<br /> Đến với <a href="/home"><span className="text-orange-400">Health 45</span>,</a> khám phá thế giới của boxing và tập luyện để trở nên mạnh mẽ và tự tin hơn mỗi ngày.
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
                    <img className="w-[80%] h-[250px] " src={boxingcourse} alt="" />
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

