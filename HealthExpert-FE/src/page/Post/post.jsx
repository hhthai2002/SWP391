import React, { useState } from "react";
import { useEffect } from "react";
import Header from "../../components/Header";
import PostBackground from "../../img/PostBackground.jpg";
import { CaretRightOutlined } from "@ant-design/icons";
import Post1 from "../../img/post1.jpg";
import Post2 from "../../img/post2.jpg";
import Post3 from "../../img/post3.jpg";
import Post4 from "../../img/post4.jpg";
import Post5 from "../../img/post5.jpg";
import Post6 from "../../img/post6.jpg";
import Post7 from "../../img/post7.jpg";
import { format } from "date-fns";
import Footer from "../../components/Footer";

// eslint-disable-next-line import/no-anonymous-default-export
export default function ListPost() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7158/api/Post")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <>
      <div className="home-page">
        <Header />
      </div>
      <div className="">
        <img className="relative" src={PostBackground} alt="" />
        <div className="flex flex-col absolute top-[300px] left-[198px]">
        </div>
      </div>
      <h2 className="text-xl text-orange-400 font-bold m-10 text-center">CHIA SẺ KIẾN THỨC</h2>
      <div className="mt-10 flex flex-wrap gap-0 relative ">
        {/* left contend */}
        <div className="w-[50%] h-[500px] mx-auto  flex flex-wrap   gap-10">
          {/* post1 */}
          {posts.map((posts, index) => (
            <div className="w-[40%]  shadow-lg   hover:shadow-2xl ">
              <img className="w-full" src={Post1} alt="" />
              <div className="mt-4 ml-4">
                {/* đây là title */}
                <h2 className="py-2 text-lg font-bold max-w-[300px] truncate overflow-ellipsis">

                  {posts.title}
                </h2>
                {/* đây là contend */}
                <p className="text-sm py-3 max-w-[350px] ">
                  {posts.content.length > 255 ? `${posts.content.slice(0, 255)}...` : posts.content}
                </p>
                <div className="mt-7 mb-3">
                  <a className="text-orange-400 " href={`/postDetail/${posts.postId}`}>
                    Đọc thêm
                  </a>
                </div>
              </div>
              <hr className="border-black	w-full mt-8" />
              {/* <div className="mt-2">
                <span className="text-xs ml-3 ">{posts.createdAt}</span>
              </div> */}
            </div>
          ))}

        </div>
        {/* rightcontend */}
        <div className="w-[20%] absolute right-32">
          <div>
            <div>
              <div className="bg-orange-400 w-[80%]  h-[30px]">
                <h2 className="items-center text-white font-sans font-bold ml-3 my-auto">
                  KHÓA HỌC TẠI HELP EXPERT
                </h2>
              </div>
              <a href="/dance">
                <li className="list-none  text-[15px] font-sans py-1 ml-2 text-black hover:text-orange-400	">
                  Dance
                </li>
              </a>
              <a href="/boxing">
                <li className="list-none  text-[15px] font-sans py-1 ml-2 text-black hover:text-orange-400	">
                  Boxing
                </li>
              </a>
              <a href="/yoga">
                <li className="list-none  text-[15px] font-sans py-1 ml-2 text-black hover:text-orange-400	">
                  Yoga
                </li>
              </a>
              <a href="/gym">
                <li className="list-none  text-[15px] font-sans py-1 ml-2 text-black hover:text-orange-400	">
                  Gym
                </li>
              </a>
            </div>
            <div>
              <div className="bg-orange-400 w-[80%]  h-[30px] mb-5">
                <h2 className="items-center text-white font-sans font-bold ml-3 my-auto">
                  BÀI VIẾT GẦN ĐÂY{" "}
                </h2>
              </div>
              <div className="flex flex-col w-[80%]">
                <div className="flex w-full">
                  <a className="w-[30%]" href="">
                    <img className="w-[140px] h-[60px]" src={Post1} alt="" />
                  </a>
                  <a className="w-[70%]" href="">
                    <p className="ml-3 text-sm">
                      Bài tập thon gọn mặt trong 1 Tuần Sau Tết 2024
                    </p>
                  </a>
                </div>
                <div className="flex w-full mt-7">
                  <a className="w-[30%]" href="">
                    <img className="w-[140px] h-[60px]" src={Post2} alt="" />
                  </a>
                  <a className="w-[70%]" href="">
                    <p className="ml-3 text-sm">
                      Dinh dưỡng và tập luyện Gym cho Nữ sau tết – Dáng đẹp eo
                      thon trở lại
                    </p>
                  </a>
                </div>
                <div className="flex w-full mt-7">
                  <a className="w-[30%]" href="">
                    <img className="w-[140px] h-[60px]" src={Post3} alt="" />
                  </a>
                  <a className="w-[70%]" href="">
                    <p className="ml-3 text-sm">
                      Bài tập thon gọn mặt trong 1 Tuần Sau Tết 2024
                    </p>
                  </a>
                </div>
                <div className="flex w-full mt-7">
                  <a className="w-[30%]" href="">
                    <img className="w-[140px] h-[60px]" src={Post4} alt="" />
                  </a>
                  <a className="w-[70%]" href="">
                    <p className="ml-3 text-sm">
                      Giảm cân sau Tết nhằm lấy lại vóc dáng mong ước
                    </p>
                  </a>
                </div>
                <div className="flex w-full mt-7">
                  <a className="w-[30%]" href="">
                    <img className="w-[140px] h-[60px]" src={Post5} alt="" />
                  </a>
                  <a className="w-[70%]" href="">
                    <p className="ml-3 text-sm">
                      Ăn bánh Chưng bánh Tét sao cho không tăng cân ngày Tết
                    </p>
                  </a>
                </div>
                <div className="flex w-full mt-7">
                  <a className="w-[30%]" href="">
                    <img className="w-[140px] h-[60px]" src={Post6} alt="" />
                  </a>
                  <a className="w-[70%]" href="">
                    <p className="ml-3 text-sm">
                      Bỏ túi các Bài tập cho chân thon trong 7 NGÀY – Chị em xem
                      Ngay!
                    </p>
                  </a>
                </div>
                <div className="flex w-full mt-7">
                  <a className="w-[30%]" href="">
                    <img className="w-[140px] h-[60px]" src={Post7} alt="" />
                  </a>
                  <a className="w-[70%]" href="">
                    <p className="ml-3 text-sm">
                      Top những bài tập Bắp chân tại nhà TO KHỎE như Ronaldo
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
