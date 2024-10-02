import React from "react";
import Logo from "../img/logo.png";
import {
    PhoneOutlined,
} from '@ant-design/icons';

const Footer = () => {

    return (

        <div className="w-full h-[350px] bg-black flex flex-row justify-around">
            <div className=" mt-10 flex flex-col">
                <div className="ml-10 mt-5 flex flex-row items-center">
                    <img src={Logo} alt="Health 45" className="w-16 " />
                    <p className="font-bold text-3xl text-white ml-10">Health 45</p>
                </div>
                <div className="ml-10 mt-5 text-white flex flex-row items-center">
                    <PhoneOutlined />
                    <p className="ml-5 font-bold">0966.518.625</p>
                </div>

                <div className="ml-10 mt-5 text-white flex flex-row items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024"><path fill="currentColor" d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32m-40 110.8V792H136V270.8l-27.6-21.5l39.3-50.5l42.8 33.3h643.1l42.8-33.3l39.3 50.5zM833.6 232L512 482L190.4 232l-42.8-33.3l-39.3 50.5l27.6 21.5l341.6 265.6a55.99 55.99 0 0 0 68.7 0L888 270.8l27.6-21.5l-39.3-50.5z" /></svg>
                    <p className="ml-5 font-bold">health45@gmail.com</p>
                </div>
            </div>
            <div className=" mt-10 flex flex-col text-white">
                <h2 className="ml-10 mb-5 text-orange-400 font-bold text-2xl mt-10">Dịch vụ</h2>
                <a href="/gym" className="ml-10 hover:text-orange-400 font-bold">GYM</a>
                <a href="/yoga" className="ml-10 hover:text-orange-400 font-bold">YOGA</a>
                <a href="/dance" className="ml-10 hover:text-orange-400 font-bold">DANCE</a>
                <a href="/boxing" className="ml-10 hover:text-orange-400 font-bold">BOXING</a>
            </div>
            <div className=" mt-10 flex flex-col text-white">
                <h2 className="ml-10 mb-5 text-orange-400 font-bold text-2xl mt-10">Tính năng khác</h2>
                <a href="/tranformation" className="ml-10 hover:text-orange-400 font-bold">Thay đổi của học viên</a>
                <a href="/listPost" className="ml-10 hover:text-orange-400 font-bold">Các bài chia sẻ</a>
            </div>
            <div className=" mt-10 flex flex-col text-white">
                <h2 className="ml-10 mb-5 text-orange-400 font-bold text-2xl mt-10">Theo dõi chúng tôi</h2>
                <div className="flex flex-row items-center justify-around">
                    <a href="https://www.facebook.com/hhthai1003" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 1000 1000">
                            <path fill="currentColor" d="M182.594 0C81.445 0 0 81.445 0 182.594v634.813c0 101.149 81.445 182.594 182.594 182.594h344.063V609.063H423.282v-140.75h103.375v-120.25c0-94.475 61.079-181.219 201.781-181.219c56.968 0 99.094 5.469 99.094 5.469l-3.313 131.438s-42.963-.406-89.844-.406c-50.739 0-58.875 23.378-58.875 62.188v102.781h152.75l-6.656 140.75H675.5v390.938h141.906c101.149 0 182.594-81.445 182.594-182.594V182.595C1000 81.446 918.555.001 817.406.001H182.593z" />
                        </svg>
                    </a>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 1792 1280"><path fill="currentColor" d="m711 872l484-250l-484-253zM896 10q168 0 324.5 4.5T1450 24l73 4q1 0 17 1.5t23 3t23.5 4.5t28.5 8t28 13t31 19.5t29 26.5q6 6 15.5 18.5t29 58.5t26.5 101q8 64 12.5 136.5T1792 532v176q1 145-18 290q-7 55-25 99.5t-32 61.5l-14 17q-14 15-29 26.5t-31 19t-28 12.5t-28.5 8t-24 4.5t-23 3t-16.5 1.5q-251 19-627 19q-207-2-359.5-6.5T336 1256l-49-4l-36-4q-36-5-54.5-10t-51-21t-56.5-41q-6-6-15.5-18.5t-29-58.5T18 998q-8-64-12.5-136.5T0 748V572q-1-145 18-290q7-55 25-99.5T75 121l14-17q14-15 29-26.5T149 58t28-13t28.5-8t23.5-4.5t23-3t17-1.5q251-18 627-18" /></svg>            
                </div>
            </div>
        </div>
    );
}
export default Footer;