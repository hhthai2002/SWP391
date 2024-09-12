import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Menuleft from "../../components/MenuLeft";

function UpdateSession() {
    const { id } = useParams();
    const [sessionData, setSessionData] = useState({});
    const navigate = useNavigate();
    console.log(id);
    useEffect(() => {
        const fetchSessionData = async () => {
            try {
                const sessionResponse = await axios.get("https://localhost:7158/api/Session/GetSessions");
                const foundSessions = sessionResponse.data.find(session => session.sessionId === id);
                setSessionData(foundSessions);
                console.log(sessionData);
            } catch (error) {
                console.log(error);
            }

        };
        fetchSessionData();
    }, [id]);

    const HandleSubmit = (e) => {
        e.preventDefault();
        try {
            const response = axios.put(
                `https://localhost:7158/api/Session/UpdateSession/${id}`,
                sessionData
            );
            if (response) {

                navigate(`/manageSession/${sessionData.courseId}`);
                window.location.reload();
            } else {
                console.error("Error fetching session data: ");
            }
        } catch (error) {
            console.error("Error fetching session data: ", error);
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
            <div className="text-black p-5 mt-[100px] ml-[200px] flex justify-between">
                <form
                    className="h-[500px] w-[70%] mx-auto border border-[3px] border-orange-400 rounded-lg"
                    onSubmit={HandleSubmit}
                >
                    <div className="flex flex-col">
                        <div>
                            <h1 className="text-center text-2xl text-orange-400"><strong>CHỈNH SỬA BUỔI HỌC</strong></h1>
                        </div>
                        <div className="flex">
                            <div className="w-1/2 mt-5 ml-5">
                                <div className="">
                                    <div><strong>ID Buổi học:</strong></div>
                                    <input
                                        type="text"
                                        name="sessionId"
                                        className="form-control w-[300px] rounded-md py-2 mt-3 border border-orange-400 pl-5 text-red"
                                        placeholder="Enter session id"
                                        value={sessionData.sessionId}
                                        onChange={(e) =>
                                            setSessionData({ ...sessionData, sessionId: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="mt-3">
                                    <div className=""><strong>Tên Buổi học</strong></div>
                                    <input
                                        type="text"
                                        name="sessionName"
                                        className="form-control w-[300px] py-2 mt-3 rounded-md border border-orange-400 pl-5"
                                        placeholder="Enter session name"
                                        value={sessionData.sessionName}
                                        onChange={(e) =>
                                            setSessionData({ ...sessionData, sessionName: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="mt-3">
                                    <div><strong>Miêu tả buổi học</strong></div>
                                    <textarea
                                        name="description"
                                        className="form-control w-[1000px] h-[150px] py-2 mt-3 rounded-md border border-orange-400 pl-5"
                                        placeholder="Enter description"
                                        value={sessionData.description}
                                        onChange={(e) =>
                                            setSessionData({
                                                ...sessionData,
                                                description: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="w-1/2 mt-5">
                                <div className="">
                                    <div><strong>Ngày bắt đầu</strong></div>
                                    <input
                                        type="text"
                                        name="dateUpdate"
                                        className="form-control w-[300px] py-2 mt-3 rounded-md border border-orange-400 pl-5"
                                        placeholder="Enter dateStart"
                                        value={sessionData.dateStart}
                                        onChange={(e) =>
                                            setSessionData({ ...sessionData, dateStart: e.target.value })
                                        }
                                    />
                                </div>
                                {/* <div className="mt-3">
                                    <div>dateEnd:</div>
                                    <input
                                        type="text"
                                        name="language"
                                        className="form-control w-[300px] py-2 mt-3 rounded-md"
                                        placeholder="Enter dateEnd"
                                        value={sessionData.dateEnd}
                                        onChange={(e) =>
                                            setSessionData({ ...sessionData, dateEnd: e.target.value })
                                        }
                                    />
                                </div> */}
                            </div>
                        </div>

                    </div>
                    <div className="flex justify-center"> {/* Container bao quanh button */}
                        <button className="w-[250px] rounded-md bg-orange-400 hover:bg-black text-white font-bold py-3 px-4 rounded opacity-100 hover:opacity-80 transition-opacity mt-3">
                            Chỉnh sửa
                        </button>
                    </div>
                </form>
            </div>
        </>

    );
}

export default UpdateSession;