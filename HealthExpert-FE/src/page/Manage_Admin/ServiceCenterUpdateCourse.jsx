import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Menuleft from "../../components/MenuLeft";
import Header from "../../components/Header";

function UpdateCourseByServiceCenter() {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7158/api/Course/${courseId}`
        );
        setCourseData(response.data);
        console.log(courseData);
      } catch (error) {
        console.error("Error fetching course data: ", error);
      }
    };
    fetchCourseData();
  }, [courseId]);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://localhost:7158/api/Course/${courseId}`,
        courseData
      );
      if (response.status === 200) {
        navigate(`/manageCourse`);
        // window.location.reload();
      } else {
        console.error("Error updating course data: ", response.statusText);
      }
    } catch (error) {
      console.error("Error updating course data: ", error);
    }
  };



  return (
    <>
      <div className="w-full" >
        <Header />
      </div>
      <div className="w-full flex mt-16">
        {/* Side bar */}
        <div className="w-[20%] h-full">
          <div className="home-page">
            <Menuleft />
          </div>
        </div>
        {/* End Side Bar */}
      </div>
      <div className="  text-black p-5 flex justify-between">
        <form
          className="border border-[4px] border-orange-400 rounded-lg h-auto w-[70%]  mx-auto"
          onSubmit={HandleSubmit}
        >
          <div className="flex flex-col ">
            <div>
              <h1 className="text-center text-3xl font-bold mt-3 text-orange-400">CHỈNH SỬA KHÓA HỌC</h1>
            </div>
            <div className="flex">
              <div className="w-1/2 mt-5 ml-5">
                <div >
                  <div className="font-bold">Course ID:</div>
                  <input
                    type="text"
                    name="courseId"
                    className="form-control w-[300px] rounded-md py-2 mt-3 pl-5 border border-orange-400 rounded-lg"
                    placeholder="Enter course id"
                    value={courseData.courseId}
                    onChange={(e) =>
                      setCourseData({ ...courseData, courseId: e.target.value })
                    }
                  />
                </div>
                <div className="mt-3">
                  <div className="font-bold">Course Name:</div>
                  <input
                    type="text"
                    name="courseName"
                    className="form-control w-[300px] py-2 mt-3 rounded-md pl-5 border border-orange-400 rounded-lg"
                    placeholder="Enter course name"
                    value={courseData.courseName}
                    onChange={(e) =>
                      setCourseData({ ...courseData, courseName: e.target.value })
                    }
                  />
                </div>

                <div className="mt-3">
                  <div className="font-bold">Certificate:</div>
                  <input
                    type="text"
                    name="certificate"
                    className="form-control w-[300px] py-2 mt-3 rounded-md pl-5 border border-orange-400 rounded-lg"
                    placeholder="Enter certificate"
                    value={courseData.certificate}
                    onChange={(e) =>
                      setCourseData({
                        ...courseData,
                        certificate: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mt-3">
                  <div className="font-bold">Type ID:</div>
                  <input
                    type="number"
                    name="typeId"
                    className="form-control w-[300px] py-2 mt-3 rounded-md pl-5 border border-orange-400 rounded-lg"
                    placeholder="Enter type ID"
                    value={courseData.typeId}
                    onChange={(e) =>
                      setCourseData({ ...courseData, typeId: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="w-1/2 mt-5">
                <div className="">
                  <div className="font-bold">Last Updated:</div>
                  <input
                    type="text"
                    name="dateUpdate"
                    className="form-control w-[300px] py-2 mt-3 rounded-md pl-5 border border-orange-400 rounded-lg"
                    placeholder="Enter last updated date"
                    value={courseData.dateUpdate}
                    onChange={(e) =>
                      setCourseData({ ...courseData, dateUpdate: e.target.value })
                    }
                  />
                </div>
                <div className="mt-3">
                  <div className="font-bold">Language:</div>
                  <input
                    type="text"
                    name="language"
                    className="form-control w-[300px] py-2 mt-3 rounded-md pl-5 border border-orange-400 rounded-lg"
                    placeholder="Enter language"
                    value={courseData.language}
                    onChange={(e) =>
                      setCourseData({ ...courseData, language: e.target.value })
                    }
                  />
                </div>
                <div className="mt-3">
                  <div className="font-bold">BMI Min:</div>
                  <input
                    type="number"
                    name="bmiMin"
                    className="form-control w-[300px] py-2 mt-3 rounded-md pl-5 border border-orange-400 rounded-lg"
                    placeholder="Enter minimum BMI"
                    value={courseData.bmiMin}
                    onChange={(e) =>
                      setCourseData({ ...courseData, bmiMin: e.target.value })
                    }
                  />
                </div>
                <div className="mt-3">
                  <div className="font-bold">BMI Max:</div>
                  <input
                    type="number"
                    name="bmiMax"
                    className="form-control w-[300px] py-2 mt-3 rounded-md pl-5 border border-orange-400 rounded-lg"
                    placeholder="Enter maximum BMI"
                    value={courseData.bmiMax}
                    onChange={(e) =>
                      setCourseData({ ...courseData, bmiMax: e.target.value })
                    }
                  />
                </div>
              </div>

            </div>
          </div>
          <div className="mt-3 ml-5 mr-5">
            <div className="font-bold">Description:</div>
            <textarea
              name="description"
              className="form-control w-full h-[150px] py-2 mt-3 rounded-md pl-5 border border-orange-400 rounded-lg"
              placeholder="Enter description"
              value={courseData.description}
              onChange={(e) =>
                setCourseData({
                  ...courseData,
                  description: e.target.value,
                })
              }
            />
          </div>
          <div className="flex justify-center"> {/* Container bao quanh button */}
            <button className="w-[250px] rounded-md bg-orange-400 hover:bg-black text-white font-bold py-3 px-4 rounded opacity-100 hover:opacity-80 transition-opacity mt-3 mb-5">
              Chỉnh sửa
            </button>
          </div>
        </form>
      </div>
    </>

  );
}

export default UpdateCourseByServiceCenter;
