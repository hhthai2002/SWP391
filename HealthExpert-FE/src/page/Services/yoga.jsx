
import React from "react";
import { useState, useEffect } from 'react';

import yogabackground from "../../img/yogabackground.jpg";
import Header from "../../components/Header";
import yoga1 from "../../img/yoga1.jpg";
import yoga2 from "../../img/yoga2.jpg";
import yoga3 from "../../img/yoga3.jpg";
import yoga4 from "../../img/yoga4.jpg";
import yoga5 from "../../img/yoga5.jpg";
import yoga6 from "../../img/yoga6.jpg";
import yoga7 from "../../img/yoga7.jpg";
import yoga8 from "../../img/yoga8.jpg";
import yoga9 from "../../img/yoga9.jpg";


import danceackground from "../../img/dancebackground.jpg";

import { Pagination } from "antd";
import './dance.css';
import DetailCourse from "../DescriptionCourse/DetailCourse";
import { Link } from "react-router-dom";

export default function Yoga() {
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
  const filteredCoursesCount = courses.filter(course => course.typeId === 1).length;
  //const filteredCoursesCount = courses.filter(course => course.typeId === 0).length;

  // Nếu số lượng khóa học trong trang hiện tại lớn hơn 9, sử dụng phân trang
  const showPagination = filteredCoursesCount > coursesPerPage;

  // Lọc khóa học theo trang hiện tại
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses
    .filter(course => course.typeId === 1)
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
          <h2 className="mt-10 text-center text-[30px] text-orange-400">
            KHÓA HỌC YOGA TẠI HEALTH 45 <br /> CÂN BẰNG TINH THẦN VÀ THỂ CHẤT
          </h2>
          <p className="text-center mt-3">
            Tập yoga là một phương pháp tập luyện tự nhiên và hiệu quả để cải thiện sức khỏe toàn diện. Với các động tác uốn dẻo, hít thở và tập trung, bạn có thể tạo ra sự cân bằng giữa tinh thần và thể chất, giảm căng thẳng và cải thiện linh hoạt. <br /> Bên cạnh việc tăng cường sức khỏe và sự linh hoạt, tập yoga còn giúp cải thiện sức khỏe tinh thần, giảm mệt mỏi và tăng cường tinh thần sống động. <br /> Đến với <a href="/home"><span className="text-orange-400">Health 45</span>,</a> khám phá thế giới của yoga và bắt đầu hành trình cân bằng tinh thần và thể chất của bạn ngay hôm nay.
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
                    <img className="w-[80%] h-[250px] " src={yoga3} alt="" />
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
      {/* <div className="mt-3">
        <Pagination className="text-center" defaultCurrent={1} total={50} />
      </div> */}
      {/* <div className="w-full mt-10">
        <div className="flex justify-center mx-auto w-[70%] ">
          <div className="flex flex-col h-[450px] hover:shadow-md">
            <img className="w-[350px] h-[250px] " src={dance1} alt="" />
            <a href="#" className="mt-3 ml-5">
              <h3 className="text-orange-400 text-[20px] mt-2 ">CARDIO</h3>
            </a>
            <p className="w-[50%] text-[14px] mt-3 ml-5">
              Cardio là từ viết tắt của Cardiovascular là phương pháp tập luyện
              có tác dụng đốt cháy calo nhanh chóng, góp phần tăng nhịp tim, cải
              thiện quá trình trao đổi chất
            </p>
          </div>
          <div className="flex flex-col h-[450px] hover:shadow-md">
            <img className="w-[350px] h-[250px] " src={dance2} alt="" />
            <a href="#" className="mt-3 ml-5">
              <h3 className="text-orange-400 text-[20px] mt-2 ">ZUMBA DANCE</h3>
            </a>
            <p className="w-[50%] text-[14px] mt-3 ml-5">
              Zumba là bộ môn trở thành một trong những lớp Dance Fitness được
              yêu thích nhất, được tạo nên trên nền nhạc Latin, kết hợp từ bốn
              thể loại âm nhạc Latin
            </p>
          </div>
          <div className="flex flex-col h-[450px] hover:shadow-md">
            <img className="w-[350px] h-[250px] " src={dance3} alt="" />
            <a href="#" className="mt-3 ml-5">
              <h3 className="text-orange-400 text-[20px] mt-2 ">AEROBICS</h3>
            </a>
            <p className="w-[50%] text-[14px] mt-3 ml-5">
              Tập Aerobics hay còn gọi là thể dục nhịp điệu, là lớp nhảy trên
              nền nhạc pop, Aerobics là lớp có động tác đơn giản nhất nên người
              tập rất dễ nhớ được nhịp độ của bài tập.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full mt-5">
        <div className="flex justify-center mx-auto w-[70%] ">
          <div className="flex flex-col h-[450px] hover:shadow-md">
            <img className="w-[350px] h-[250px] " src={dance4} alt="" />
            <a href="#" className="mt-3 ml-5">
              <h3 className="text-orange-400 text-[20px] mt-2 ">BELLY DANCE</h3>
            </a>
            <p className="w-[50%] text-[14px] mt-3 ml-5">
              Tập Belly Dance, hay còn được gọi là múa bụng, là một lớp tập với
              các động tác múa được thực hiện trên nền nhạc pop. Đặc điểm nổi
              bật của Belly Dance là các động tác đơn giản nhất
            </p>
          </div>
          <div className="flex flex-col h-[450px] hover:shadow-md">
            <img className="w-[350px] h-[250px] " src={dance5} alt="" />
            <a href="#" className="mt-3 ml-5">
              <h3 className="text-orange-400 text-[20px] mt-2 ">
                MODERN DANCE
              </h3>
            </a>
            <p className="w-[50%] text-[14px] mt-3 ml-5">
              Tập nhảy hiện đại là một lớp tập với các động tác nhảy phức tạp
              thường được biểu diễn trên nền nhạc điện tử. Điều đặc biệt của tập
              nhảy này chính là sự đa dạng và sáng tạo trong các động tác.
            </p>
          </div>
          <div className="flex flex-col h-[450px] hover:shadow-md">
            <img className="w-[350px] h-[250px] " src={dance6} alt="" />
            <a href="#" className="mt-3 ml-5">
              <h3 className="text-orange-400 text-[20px] mt-2 ">
                HIPHOP DANCE
              </h3>
            </a>
            <p className="w-[50%] text-[14px] mt-3 ml-5">
              Tập Hip-hop là một lớp tập với các động tác nhảy phức tạp trên nền
              nhạc hip-hop. Điều đặc biệt là sự đa dạng và sáng tạo trong các
              động tác, mang lại sự thú vị và thách thức cho người tập.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full mt-10">
        <div className="flex justify-center mx-auto w-[70%] ">
          <div className="flex flex-col h-[450px] hover:shadow-md">
            <img className="w-[350px] h-[250px] " src={dance7} alt="" />
            <a href="#" className="mt-3 ml-5">
              <h3 className="text-orange-400 text-[20px] mt-2 ">BASIC YOGA</h3>
            </a>
            <p className="w-[50%] text-[14px] mt-3 ml-5">
              Tập Aerobics hay còn gọi là thể dục nhịp điệu, là lớp nhảy trên
              nền nhạc pop, Aerobics là lớp có động tác đơn giản nhất nên người
              tập rất dễ nhớ được nhịp độ của bài tập.
            </p>
          </div>
          <div className="flex flex-col h-[450px] hover:shadow-md">
            <img className="w-[350px] h-[250px] " src={dance8} alt="" />
            <a href="#" className="mt-3 ml-5">
              <h3 className="text-orange-400 text-[20px] mt-2 ">BASIC YOGA</h3>
            </a>
            <p className="w-[50%] text-[14px] mt-3 ml-5">
              Tập Aerobics hay còn gọi là thể dục nhịp điệu, là lớp nhảy trên
              nền nhạc pop, Aerobics là lớp có động tác đơn giản nhất nên người
              tập rất dễ nhớ được nhịp độ của bài tập.
            </p>
          </div>
          <div className="flex flex-col h-[450px] hover:shadow-md">
            <img className="w-[350px] h-[250px] " src={dance9} alt="" />
            <a href="#" className="mt-3 ml-5">
              <h3 className="text-orange-400 text-[20px] mt-2 ">BASIC YOGA</h3>
            </a>
            <p className="w-[50%] text-[14px] mt-3 ml-5">
              Tập Aerobics hay còn gọi là thể dục nhịp điệu, là lớp nhảy trên
              nền nhạc pop, Aerobics là lớp có động tác đơn giản nhất nên người
              tập rất dễ nhớ được nhịp độ của bài tập.
            </p>
          </div>
        </div>
      </div> */}

    </>
  );
}

// export default function yoga() {
//   // const dispatch = useDispatch();

//   return (
//     <>
//       <div className="home-page">
//         <Header />
//       </div>
//       {/* background yoga */}
//       <div>
//         <img className="w-full" src={yogabackground} alt="" />
//       </div>
//       <section>
//         {/* contend yoga */}
//         <div className="">
//           <h2 className=" mt-10 text-center font-bold   text-[30px] text-orange-400">
//             KHÓA HỌC YOGA TẠI HELP45 <br /> THƯ GIÃN TÂM TRÍ, TINH THẦN VÀ
//             CẢI THIỆN SỨC KHỎE
//           </h2>
//           <p className="text-center mt-3 ">
//             Tập Yoga là một hình thức tập luyện giúp giải thư giãn hiệu quả. Với
//             những bài tập giúp <br /> học viên nâng cao nhân thức và tạo ra sự
//             cân bằng giữa tinh thần và thể chất. Tập Yoga <br /> mỗi ngày giúp
//             bạn trở nên nhẹ nhàng, chữa lành và tích cực hơn. Đến với
//             <a href="/home">
//               {" "}
//               <span className="text-orange-400"> Help45</span>,
//             </a>
//             <br /> tập luyện và cải thiện thẻ chất và tinh thần của bạn.
//           </p>
//         </div>
//         {/* yoga_course_1*/}
//         <div className="flex justify-center w-full ">
//           <div className="mt-5 flex w-[70%] flex-wrap gap-5">
//             {/* basic yoga */}
//             <div className="h-[450px] w-[30%] overflow-hidden transition-transform transform-gpu hover:transform-gpu hover:translate-y-[-5px] hover:shadow-md ">
//               <a href="#" className="block">
//                 <img
//                   className="w-full bg-cover transition-transform transform-gpu "
//                   src={yoga1}
//                   alt=""
//                 />
//               </a>
//               <div className="flex flex-col m-8 mt-2">
//                 <h3 className="text-orange-400 my-[6px] text-xl font-bold">
//                   <a href="#" className="block">
//                     BASIC YOGA
//                   </a>
//                 </h3>
//                 <p className="mt-3 text-[14px] max-w-[70%]">
//                   Đây là lớp học căn bản dành cho những người mới bắt đầu. Các
//                   lớp học Basic tạo tiền đề vững chắc để bạn theo đuổi những lớp
//                   học chuyên sâu về sau
//                 </p>
//               </div>
//             </div>
//             {/* flow yoga */}
//             <div className="h-[450px] w-[30%] overflow-hidden transition-transform transform-gpu hover:transform-gpu hover:translate-y-[-5px] hover:shadow-md ">
//               <a href="#" className="block">
//                 <img
//                   className="w-full bg-cover transition-transform transform-gpu "
//                   src={yoga2}
//                   alt=""
//                 />
//               </a>
//               <div className="flex flex-col m-8 mt-2">
//                 <h3 className="text-orange-400 my-[6px] text-xl font-bold">
//                   <a href="#" className="block">
//                     FLOW YOGA
//                   </a>
//                 </h3>
//                 <p className="mt-3 text-[14px] max-w-[70%]">
//                   Hình thức Yoga đòi hỏi sự di chuyển uyển chuyển của các tư thế
//                   trong quá trình luyện tập. Flow Yoga là những bài tập hướng
//                   nhiều hơn về tinh thần
//                 </p>
//               </div>
//             </div>
//             {/* stick yoga */}
//             <div className="h-[450px] w-[30%] overflow-hidden transition-transform transform-gpu hover:transform-gpu hover:translate-y-[-5px] hover:shadow-md ">
//               <a href="#" className="block">
//                 <img
//                   className="w-full bg-cover transition-transform transform-gpu "
//                   src={yoga3}
//                   alt=""
//                 />
//               </a>
//               <div className="flex flex-col m-8 mt-2">
//                 <h3 className="text-orange-400 my-[6px] text-xl font-bold">
//                   <a href="#" className="block">
//                     STICK YOGA
//                   </a>
//                 </h3>
//                 <p className="mt-3 text-[14px] max-w-[70%]">
//                   Những bài tập với gậy giúp rèn luyện thể chất. Cơ thể người
//                   tập sẽ được kéo giãn. Những bài tập có công dụng hiệu quả
//                   trong điều trị và phục hồi tủy sống
//                 </p>
//               </div>
//             </div>
//             <div className="h-[450px] w-[30%] overflow-hidden transition-transform transform-gpu hover:transform-gpu hover:translate-y-[-5px] hover:shadow-md ">
//               <a href="#" className="block">
//                 <img
//                   className="w-full bg-cover transition-transform transform-gpu "
//                   src={yoga4}
//                   alt=""
//                 />
//               </a>
//               <div className="flex flex-col m-8 mt-2">
//                 <h3 className="text-orange-400 my-[6px] text-xl font-bold">
//                   <a href="#" className="block">
//                     HATHA YOGA
//                   </a>
//                 </h3>
//                 <p className="mt-3 text-[14px] max-w-[70%]">
//                   Hatha Yoga là những bài tập sử dụng tư thế, kỹ thuật thở và
//                   thiền nhằm đem đến cho người tập một cơ thể khỏe mạnh, tâm hồn
//                   thanh thản và an yên
//                 </p>
//               </div>
//             </div>
//             {/* flow yoga */}
//             <div className="h-[450px] w-[30%] overflow-hidden transition-transform transform-gpu hover:transform-gpu hover:translate-y-[-5px] hover:shadow-md ">
//               <a href="#" className="block">
//                 <img
//                   className="w-full bg-cover transition-transform transform-gpu "
//                   src={yoga5}
//                   alt=""
//                 />
//               </a>
//               <div className="flex flex-col m-8 mt-2">
//                 <h3 className="text-orange-400 my-[6px] text-xl font-bold">
//                   <a href="#" className="block">
//                     CORE YOGA
//                   </a>
//                 </h3>
//                 <p className="mt-3 text-[14px] max-w-[70%]">
//                   Những bài tập hướng tập trung vào phần bụng, lưng, vai và
//                   hông. Core Yoga tăng cường sức khỏe và linh hoạt cho cơ thể,
//                   tâm trí và tinh thần
//                 </p>
//               </div>
//             </div>
//             {/* stick yoga */}
//             <div className="h-[450px] w-[30%] overflow-hidden transition-transform transform-gpu hover:transform-gpu hover:translate-y-[-5px] hover:shadow-md ">
//               <a href="#" className="block">
//                 <img
//                   className="w-full bg-cover transition-transform transform-gpu "
//                   src={yoga6}
//                   alt=""
//                 />
//               </a>
//               <div className="flex flex-col m-8 mt-2">
//                 <h3 className="text-orange-400 my-[6px] text-xl font-bold">
//                   <a href="#" className="block">
//                     WHEEL YOGA
//                   </a>
//                 </h3>
//                 <p className="mt-3 text-[14px] max-w-[70%]">
//                   Loại hình Yoga tập trung vào những động tác vặn xoay mình đem
//                   lại sự dẻo dai và linh hoạt cho cơ thể. Các tư thế giúp cột
//                   sống hoạt động tốt hơn
//                 </p>
//               </div>
//             </div>
//             <div className="h-[450px] w-[30%] overflow-hidden transition-transform transform-gpu hover:transform-gpu hover:translate-y-[-5px] hover:shadow-md ">
//               <a href="#" className="block">
//                 <img
//                   className="w-full bg-cover transition-transform transform-gpu "
//                   src={yoga7}
//                   alt=""
//                 />
//               </a>
//               <div className="flex flex-col m-8 mt-2">
//                 <h3 className="text-orange-400 my-[6px] text-xl font-bold">
//                   <a href="#" className="block">
//                     GENTLE YOGA
//                   </a>
//                 </h3>
//                 <p className="mt-3 text-[14px] max-w-[70%]">
//                   Những bài tập nhẹ nhàng và dễ dàng thực hiện. Các bài Gentle
//                   Yoga thích hợp với người mới bắt đầu tập luyện, chúng tốt cho
//                   hệ thống cơ và khớp
//                 </p>
//               </div>
//             </div>
//             <div className="h-[450px] w-[30%] overflow-hidden transition-transform transform-gpu hover:transform-gpu hover:translate-y-[-5px] hover:shadow-md ">
//               <a href="#" className="block">
//                 <img
//                   className="w-full bg-cover transition-transform transform-gpu "
//                   src={yoga8}
//                   alt=""
//                 />
//               </a>
//               <div className="flex flex-col m-8 mt-2">
//                 <h3 className="text-orange-400 my-[6px] text-xl font-bold">
//                   <a href="#" className="block">
//                     HIP OPENING
//                   </a>
//                 </h3>
//                 <p className="mt-3 text-[14px] max-w-[70%]">
//                   Chuỗi các bài tập luyện nhằm hướng tới sự phát triển ở vùng
//                   hông. Những bài tập này tập trung kéo căng các cơ vùng xương
//                   chậu và hông của bạn
//                 </p>
//               </div>
//             </div>
//             <div className="h-[450px] w-[30%] overflow-hidden transition-transform transform-gpu hover:transform-gpu hover:translate-y-[-5px] hover:shadow-md ">
//               <a href="#" className="block">
//                 <img
//                   className="w-full bg-cover transition-transform transform-gpu "
//                   src={yoga9}
//                   alt=""
//                 />
//               </a>
//               <div className="flex flex-col m-8 mt-2">
//                 <h3 className="text-orange-400 my-[6px] text-xl font-bold">
//                   <a href="#" className="block">
//                     TWISTING YOGA
//                   </a>
//                 </h3>
//                 <p className="mt-3 text-[14px] max-w-[70%]">
//                   Loại hình Yoga tập trung vào những động tác vặn xoay mình đem
//                   lại sự dẻo dai và linh hoạt cho cơ thể. Các tư thế giúp cột
//                   sống hoạt động tốt hơn
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="mt-3">
//           <Pagination className="text-center" defaultCurrent={1} total={50} />
//         </div>
//       </section>
//     </>
//   );
// }
