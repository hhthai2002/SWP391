import React, { useEffect, useState } from 'react';
import { GithubOutlined, LogoutOutlined } from "@ant-design/icons";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Helmet } from "react-helmet";
import { Button } from "antd";
import { Carousel } from "antd";
import { useNavigate } from "react-router-dom";
import carousel1 from "../../img/carousel_1.png";
import carousel2 from "../../img/carousel_2.png";
import carousel3 from "../../img/carousel_3.png";
import carousel4 from "../../img/carousel_4.png";
import before1 from "../../img/before_1.jpg";
import before2 from "../../img/before_2.jpg";
import before3 from "../../img/before_3.jpg";
import before4 from "../../img/before_4.jpg";
import before5 from "../../img/beforenam1.jpg";
import before6 from "../../img/beforenam2.jpg";
import before7 from "../../img/beforenu1.jpg";
import before8 from "../../img/beforenu2.jpg";
import feedback from "../../img/feedback.jpg";
import feedback2 from "../../img/feedback2.jpg";
import feedback3 from "../../img/feedback3.jpg";
import feedback4 from "../../img/feedback4.jpg";
import Header from "../../components/Header";
import avt1 from "../../img/avt1.jpg";
import center1 from "../../img/center1.jpg";
import center2 from "../../img/center2.jpg";
import center3 from "../../img/center3.jpg";
import background from "../../img/backgroundImage.jpg";
import blog1 from "../../img/blog1.jpg";
import blog2 from "../../img/blog2.jpg";
import blog3 from "../../img/blog3.jpg";
import logo from "../../img/logo.png";
import yogaicon from "../../img/Yoga_icon.png";
import gymicon from "../../img/Gym_icon.png";
import boxingicon from "../../img/Boxing_icon.png";
import danceicon from "../../img/Dance_icon.png";
import { Link } from 'react-router-dom';

// import { useDispatch } from "react-redux";
import axios from 'axios';
import Footer from '../../components/Footer';

export default function Home() {
  // const dispatch = useDispatch();
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  const navigate = useNavigate();
  const [course, setCourse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7158/api/Course');
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getImageForType = (typeId) => {
    switch (typeId) {
      case 1:
        return yogaicon;
      case 2:
        return boxingicon;
      case 3:
        return danceicon;
      case 4:
        return gymicon;
    }
  };

  return (
    <>
      <div className="home-page">
        <Header />
      </div>
      {/* carousel */}
      <div className="grid grid-cols-12 h-[850px]">
        {/* Phần 3/12 */}
        <div className="col-span-3 bg-gradient-to-br from-[#FDC830] to-[#F37335] h-[800px] m-10 border border-solid rounded-lg shadow-lg">
          {/* Nội dung của phần 3/12 */}
          <section className="flex flex-col mt-5">
            {/* content */}
            <div className="flex-col text-center mb-5">
              <h2 data-aos="zoom-out" className="text-white text-xl mt-3 font-bold">
                CÁC DỊCH VỤ TẠI HEALTH 45
              </h2>
            </div>
            {/* các service */}
            <div className="flex-col items-center">
              {/* Các mục dịch vụ */}
              {/* item 1 */}
              <div className="relative group my-5">
                <a href="/yoga">
                  <div className="mx-auto relative flex items-center justify-center">
                    <img
                      src={yogaicon}
                      alt=""
                      className="h-[150px] w-[150px] bg-black object-cover group-hover:opacity-80 filter group-hover:filter-brightness-75 transition-opacity transition-filter border border-[3px] border-solid rounded-full shadow-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <h3 className="text-white text-center text-2xl">YOGA</h3>
                    </div>
                  </div>
                </a>
              </div>
              {/* item 2 */}
              <div className="relative group my-5">
                <a href="/gym">
                  <div className="mx-auto relative flex items-center justify-center">
                    <img
                      src={gymicon}
                      alt=""
                      className="h-[150px] w-[150px] bg-black object-cover group-hover:opacity-80 filter group-hover:filter-brightness-75 transition-opacity transition-filter border border-[3px] border-solid rounded-full shadow-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <h3 className="text-white text-center text-2xl">GYM</h3>
                    </div>
                  </div>
                </a>
              </div>
              {/* item 3 */}
              <div className="relative group my-5">
                <a href="/boxing">
                  <div className="mx-auto relative flex items-center justify-center">
                    <img
                      src={boxingicon}
                      alt=""
                      className="h-[150px] w-[150px] bg-black object-cover group-hover:opacity-80 filter group-hover:filter-brightness-75 transition-opacity transition-filter border border-[3px] border-solid rounded-full shadow-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <h3 className="text-white text-center text-2xl">BOXING</h3>
                    </div>
                  </div>
                </a>
              </div>
              {/* item 4 */}
              <div className="relative group my-5">
                <a href="/dance">
                  <div className="mx-auto relative flex items-center justify-center">
                    <img
                      src={danceicon}
                      alt=""
                      className="h-[150px] w-[150px] bg-black object-cover group-hover:opacity-80 filter group-hover:filter-brightness-75 transition-opacity transition-filter border border-[3px] border-solid rounded-full shadow-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <h3 className="text-white text-center text-2xl">DANCE</h3>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* Phần 9/12 */}
        <div className="col-span-9 m-10">
          {/* Nội dung của phần 9/12 */}
          <div className="flex justify-center h-screen">
            <div className="bg-orange-400 w-full h-[800px] border border-solid rounded-lg shadow-lg flex flex-col ">
              <div className="flex justify-center items-center">
                <div className="w-[70%] mt-[50px]">
                  <Carousel
                    autoplay
                    className="rounded-lg border"
                  >
                    <img
                      src={carousel1}
                      className="border border-solid rounded-lg"
                      alt=""
                    />
                    <img
                      src={carousel2}
                      className="border border-solid rounded-lg"
                      alt=""
                    />
                    <img
                      src={carousel3}
                      className="border border-solid rounded-lg"
                      alt=""
                    />
                    <img
                      src={carousel4}
                      className="border border-solid rounded-lg"
                      alt=""
                    />
                  </Carousel>
                </div>
              </div>
              <div className="flex-col m-10">
                <h1 data-aos="fade-up" className="text-white text-3xl font-bold">Health 45</h1>
                <p data-aos="fade-up" className="mt-3">
                  Nơi kết nối giữa người mong muốn cải thiện chất lượng cơ thể và
                  trung tâm gym. Chúng tôi tự hào là cầu nối đưa bạn đến với cộng
                  đồng các trung tâm gym hàng đầu, giúp bạn dễ dàng khám phá và
                  lựa chọn nơi tập luyện phù hợp với nhu cầu của mình.
                </p>
                <a>
                  <button className="bg-orange-600 hover:bg-white text-white font-bold py-2 px-4 rounded opacity-100 hover:text-black hover:opacity-80 transition-opacity mt-3 ">
                    Xem thêm
                  </button>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="m-5">
          <h1 data-aos="zoom-in" className=" text-[30px] font-bold mt-3 text-orange-400 ml-20">KHÓA HỌC ĐỀ XUẤT</h1>
          <div className="flex flex-row w-full">
            {course.slice(0, 4).map(course => (
              <>
                <div className="flex w-full flex-row m-5 bg-gradient-to-br from-[#FDC830] to-[#F37335] p-5 border rounded-lg">
                  <Link to={`/detailCourse/${course.courseId}`}
                    className="h-[150px] w-full"
                  >
                    <img src={getImageForType(course.typeId)} alt={course.courseName} className="h-[150px] w-[150px] bg-black object-cover group-hover:opacity-80 filter group-hover:filter-brightness-75 transition-opacity transition-filter border border-[3px] border-solid rounded-full shadow-lg" />
                  </Link>
                  <div className="flex flex-col w-full m-5 justify-center item-center">
                    <p data-aos="fade-up" className="font-bold text-[20px] truncate overflow-ellipsis max-w-[200px] mb-5">{course.courseName}</p>
                    <p data-aos="fade-up">{(course.price).toLocaleString('vi-VN')} VND</p>
                    <p data-aos="fade-up">Số lượng học viên: {course.studentNumber}</p>
                    <p data-aos="fade-up" className="truncate overflow-ellipsis max-w-[200px]">{course.description}</p>
                  </div>
                </div >
              </>
            ))}
          </div>
        </div>
      </div >

      {/* <section className="m-5">
        <h2 className="text-orange-400 mt-5 ml-20 text-[30px] font-bold mb-5">CHIA SẼ KIẾN THỨC</h2>
        

        <div
          className="flex justify-center items-center h-screen px-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 20%, rgba(0, 0, 0, 0.8) 80%)",
          }}
        >

          <div className="mx-auto mr-4 h-[600px] bg-gradient-to-b from-white to-orange-500 p-8 rounded-lg  transition-all duration-300 ease-in-out hover:opacity-80 hover:from-white hover:to-orange-500">
            <a href="">
              <img className="w-[350px] h-[300px]" src={blog1} alt="" />
              <h3 className="text-[18px] w-[70%] mt-4 mx-3 mb-3">
                Ăn bánh Chưng bánh tét sao cho không tăng cân ngày tết
              </h3>
            </a>
            <p className="text-[14px] w-[70%] mx-3 mb-3">
              Tết cổ truyền đến rồi, bạn có nghe mùi bánh Chưng bánh Tét khắp
              mọi nơi. Vào dịp này, không
            </p>
            <a className="text-orange-600 text-[18px] mx-3" href="">
              Xem thêm
            </a>
          </div>

         
          <div className="mx-auto mr-4 h-[600px] bg-gradient-to-b from-white to-orange-500 p-8 rounded-lg transition-all duration-300 ease-in-out hover:opacity-80 hover:from-white hover:to-orange-500">
            <a href="">
              <img className="w-[350px] h-[300px]" src={blog1} alt="" />
              <h3 className="text-[18px] w-[70%] mt-4 mx-3 mb-3">
                Ăn bánh Chưng bánh tét sao cho không tăng cân ngày tết
              </h3>
            </a>
            <p className="text-[14px] w-[70%] mx-3 mb-3">
              Tết cổ truyền đến rồi, bạn có nghe mùi bánh Chưng bánh Tét khắp
              mọi nơi. Vào dịp này, không
            </p>
            <a className="text-orange-600 text-[18px] mx-3" href="">
              Xem thêm bài viết
            </a>
          </div>

         
          <div className="mx-auto h-[600px] bg-gradient-to-b from-white to-orange-500 p-8 rounded-lg transition-all duration-300 ease-in-out hover:opacity-80 hover:from-white hover:to-orange-500">
            <a href="">
              <img className="w-[350px] h-[300px]" src={blog1} alt="" />
              <h3 className="text-[18px] w-[70%] mt-4 mx-3 mb-3">
                Ăn bánh Chưng bánh tét sao cho không tăng cân ngày tết
              </h3>
            </a>
            <p className="text-[14px] w-[70%] mx-3 mb-3">
              Tết cổ truyền đến rồi, bạn có nghe mùi bánh Chưng bánh Tét khắp
              mọi nơi. Vào dịp này, không
            </p>
            <a className="text-orange-600 text-[18px] mx-3" href="">
              Xem thêm
            </a>
          </div>
        </div>
        <a className="flex  justify-center" href="/listPost">
          <button className="bg-blue-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded opacity-100 hover:opacity-80 transition-opacity mt-3">
            XEM THÊM
          </button>
        </a>
      </section> */}
      {/* tranformation */}
      <div className="m-10">
        <section>
          {/* tranformation_content */}
          <div className="flex-col m-10">
            <h3 data-aos="zoom-out" className=" text-[30px] font-bold mt-3 text-orange-400">THAY ĐỔI CỦA HỌC VIÊN</h3>
            <p data-aos="zoom-out" className="text-[20px]">
              Với các trung tâm gym uy tín hàng đầu, Health 45 chắc chắn sẽ giúp
              bạn đạt mục tiêu sức khoẻ hiệu quả nhất
            </p>
          </div>
          <div className="flex justify-center mb-5 w-full align-middle bg-orange-400 ">
            <div className="w-[100%]">
              <Carousel className="W-[100%]">
                <div className="w-full">
                  <div className="flex justify-between">
                    <img className="  w-[20%]" src={before1} alt="" />
                    <img className="  w-[20%]" src={before2} alt="" />
                    <img className="  w-[20%]" src={before3} alt="" />
                    <img className="  w-[20%]" src={before4} alt="" />
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex justify-between">
                    <img className=" w-[20%]" src={before3} alt="" />
                    <img className="  w-[20%]" src={before4} alt="" />
                    <img className="  w-[20%]" src={before5} alt="" />
                    <img className="  w-[20%]" src={before6} alt="" />
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex justify-between">
                    <img className=" w-[20%]" src={before5} alt="" />
                    <img className="  w-[20%]" src={before6} alt="" />
                    <img className="  w-[20%]" src={before7} alt="" />
                    <img className="  w-[20%]" src={before8} alt="" />
                  </div>
                </div>
              </Carousel>
            </div>
          </div>
          <div className=" mt-4 text-center">
            <button onClick={() => navigate('/tranformation')} className="bg-blue-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded opacity-100 hover:opacity-80 transition-opacity ">
              Xem thêm
            </button>
          </div>
        </section>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </>
  );
}
