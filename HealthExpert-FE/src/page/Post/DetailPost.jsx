import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import PostBackground from "../../img/PostBackground.jpg";
import Post1 from "../../img/post1.jpg";
import PostDetailBackground from "../../img/PostDetailBackground.jpg";


export default function DetailPost() {
  const [posts, setPosts] = useState([]);
  const { postId = "" } = useParams();
  const [post, setPost] = useState({});
  const api = "https://localhost:7158/api/Post/:postId";

  useEffect(() => {
    fetch("https://localhost:7158/api/Post")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

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
      <h2 className="text-3xl text-orange-400 font-bold m-10 text-center">
        CHIA SẺ KIẾN THỨC
      </h2>
      <div className="mt-10 flex flex-wrap gap-8 relative">
        {/* Left content */}
        <div className="w-2/3 m-8 p-6 bg-white shadow-lg rounded-lg">
          <h1 data-aos="fade-right" className="text-4xl font-extrabold mb-6 text-left text-gray-800 border-b-4 border-orange-500 pb-2">
            {post.title}
          </h1>
          {/* Content with random images */}
          {paragraphs.map((paragraph, index) => (
            <div key={index} className="mb-8">
              <p data-aos="fade-right" className="text-lg leading-relaxed text-gray-700 bg-gray-100 p-4 rounded-lg shadow-inner">
                {paragraph}
              </p>
              {/* Optionally add images here */}
              {/* <div className="flex justify-center mt-6">
        <img className="h-64 object-cover border-2 border-gray-300 rounded-lg shadow-md" src={postImages[Math.floor(Math.random() * postImages.length)]} alt="Post" />
      </div> */}
            </div>
          ))}
        </div>

        {/* Right content */}
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
