import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import PostBackground from "../../img/PostBackground.jpg";
import { CaretRightOutlined } from "@ant-design/icons";
import Post1 from "../../img/post1.jpg";
import Post2 from "../../img/post2.jpg";
import Post3 from "../../img/post3.jpg";
import Post4 from "../../img/post4.jpg";
import Post5 from "../../img/post5.jpg";
import Post6 from "../../img/post6.jpg";
import PostDetail from "../../img/postdetail1.jpg";
import PostDetail2 from "../../img/postdetail2.jpg";
import PostDetail3 from "../../img/postdetail3.jpg";
import PostDetailBackground from "../../img/PostDetailBackground.jpg";
import Post7 from "../../img/post7.jpg";
import { format } from "date-fns";

const postImages = [Post1, Post2, Post3, Post4, Post5, Post6, Post7];

// eslint-disable-next-line import/no-anonymous-default-export
export default function DetailPost() {
  const { postId = "" } = useParams();
  const [post, setPost] = useState({});
  const api = "https://localhost:7158/api/Post/:postId";
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(api.replace(":postId", postId));
        setPost(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPost();
  }, [postId]);

  const paragraphs = post.content ? post.content.split("\n").filter(paragraph => paragraph.trim() !== "") : [];


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
      <h2 className="text-[40px] text-orange-400 font-bold m-10 text-center">CHIA SẺ KIẾN THỨC</h2>
      <div className="mt-10 flex flex-wrap gap-0 relative ">
        {/* left content */}
        <div className="w-[70%] m-20 ">
          {/* Background image */}
          <h1 className="font-bold mb-10 text-xl text-left">{post.title}</h1>
          {/* <div className="w-[100%] flex flex-col items-center">
            <img className="h-[500px]" src={PostDetailBackground} alt="" />
          </div> */}
          {/* Content with random images */}
          {paragraphs.map((paragraph, index) => (
            <div key={index}>
              <p className="mt-10 whitespace-pre-line mb-10">{paragraph}</p>
              {/* <div className="flex flex-col items-center">
                <img className="h-[500px]" src={postImages[Math.floor(Math.random() * postImages.length)]} alt="" />
              </div> */}

            </div>
          ))}

        </div>
        {/* rightcontend */}
        <div className="w-[20%] absolute right-20">
          <div>
            <div>
              <div className="bg-orange-400 w-[80%]  h-[30px]">
                <h2 className="items-center text-white font-sans font-bold ml-3 my-auto">
                  DỊCH VỤ TẠI HELP EXPERT
                </h2>
              </div>
              <a href="/dance">
                <li className="list-none  text-[15px] font-sans py-1 ml-2 text-black hover:text-orange-400	">
                  DANCE
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
              <div className="bg-orange-400 w-[80%]  h-[30px]">
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
      </div >
    </>
  );
}
