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
      <h2 className="text-xl text-orange-400 font-bold m-10 text-center">CHIA SẺ KIẾN THỨC</h2>
      <div className="mt-10 flex flex-wrap gap-0 relative ">
        {/* left contend */}
        <div className="w-[50%] h-auto mx-auto flex flex-wrap gap-10">
          {/* Các bài viết */}
          {posts.map((post, index) => (
            <div
              key={index}
              className="w-full md:w-[45%] lg:w-[30%] bg-white shadow-lg hover:shadow-2xl rounded-lg transition-shadow duration-300"
            >
              <img
                className="w-full h-[200px] object-cover rounded-t-lg"
                src={Post1}
                alt={post.title}
              />
              <div className="p-6">
                {/* Tiêu đề bài viết */}
                <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                  {post.title}
                </h2>
                {/* Nội dung bài viết */}
                <p className="text-gray-600 text-sm mb-4">
                  {post.content.length > 255 ? `${post.content.slice(0, 255)}...` : post.content}
                </p>
                <div className="text-right">
                  <a
                    className="text-orange-500 font-semibold hover:underline"
                    href={`/postDetail/${post.postId}`}
                  >
                    Đọc thêm
                  </a>
                </div>
              </div>
              <hr className="border-gray-300" />
              {/* Thời gian tạo bài viết (nếu cần) */}
              {/* <div className="p-4 text-xs text-gray-500">
        <span>{post.createdAt}</span>
      </div> */}
            </div>
          ))}
        </div>

        {/* rightcontend */}
        <div className="w-1/4 absolute right-8">
          <div className="mb-5">
            <div className="bg-orange-500 text-white font-bold py-2 px-4 rounded-t-lg">
              KHÓA HỌC TẠI HEALTH 45
            </div>
            <ul className="list-none mt-2">
              {["Dance", "Boxing", "Yoga", "Gym"].map((course, index) => (
                <li key={index} className="py-1 ml-2 text-black hover:text-orange-500">
                  <a href={`/${course.toLowerCase()}`}>{course}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-orange-500 text-white font-bold py-2 px-4 rounded-t-lg mb-5">
            BÀI VIẾT GẦN ĐÂY
          </div>
          <div className="flex flex-col">
            {posts.slice(0, 5).map((post, index) => (
              <div key={index} className="flex items-center mb-4">
                <a href={`/postDetail/${post.postId}`} className="w-1/3">
                  <img className="w-32 h-16 object-cover" src={post.imageUrl || Post1} alt={post.title} />
                </a>
                <a href={`/postDetail/${post.postId}`} className="w-2/3 ml-3 text-sm text-gray-800 hover:text-orange-500">
                  {post.title}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
