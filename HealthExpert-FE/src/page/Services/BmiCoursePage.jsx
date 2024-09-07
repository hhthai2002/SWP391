import React from "react";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
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

const BmiCoursePage = ({ courseList }) => {
    // const dispatch = useDispatch();
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 9;
    var jsonDataString = localStorage.getItem('ProposeCourse');

    useEffect(() => {
        const coursesData = JSON.parse(jsonDataString);
        setCourses(coursesData);
    }, []);

    const filteredCoursesCount = courses.length;

    // Nếu số lượng khóa học trong trang hiện tại lớn hơn 9, sử dụng phân trang
    const showPagination = filteredCoursesCount > coursesPerPage;

    // Lọc khóa học theo trang hiện tại
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

    const nextPage = () => setCurrentPage(currentPage + 1);
    const prevPage = () => setCurrentPage(currentPage - 1);
    return (
        <>
            <div className="home-page">
                <Header />
            </div>
            {/* background yoga */}
            <div>
                <img className="w-full" src={danceackground} alt="" />
            </div>
            <section>
                {/* contend yoga */}
                <div className="">
                    <h2 className=" mt-10 text-center   text-[30px] text-orange-400">
                        Khóa học đề xuất cho bạn
                    </h2>
                    <p className="text-center mt-3">
                        Chúng tôi đã dựa theo chỉ số cơ thể của bạn để đề xuất cho bạn các khóa học phù hợp
                        <br /> Hãy cố gắng tập luyện và cải thiện thẻ chất và tinh thần của bạn.
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
                                        <img className="w-[350px] h-[250px] " src={dance1} alt="" />
                                        <Link className="mt-3 ml-5"
                                            to={`/detailCourse/${course.courseId}`}>
                                            <h3 className="text-orange-400 text-[20px] mt-2 ">{course.courseName}</h3>
                                        </Link>
                                        <p className="w-[50%] text-[14px] mt-3 ml-5">
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
            </section>
        </>
    );
}
export default BmiCoursePage;