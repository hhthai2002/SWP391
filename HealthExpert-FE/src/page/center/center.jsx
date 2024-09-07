import React from "react";
import backgroundCenter from "../../img/backgroundCenter.jpg";
import center1 from "../../img/trungtam1.jpg";
import center2 from "../../img/trungtam2.jpg";
import center3 from "../../img/trungtam3.jpg";
import center4 from "../../img/trungtam4.jpg";
export default function center() {
  return (
    <>
      <div className="">
        <img className="w-full h-[50%]" src={backgroundCenter} alt="" />
      </div>
      {/* content */}
      <div className="text-center justify-center mt-10 flex flex-col">
        <h2 className="text-[30px] text-orange-400">
          TẬP LUYỆN Ở PHÒNG GYM VÀ PT TẠI ĐÀ NẴNG
        </h2>
        <p className="mt-3  text-center">
          Hệ thống phòng Gym và PT của Helpexpert có mặt ở khắp Đà Nẵng. Với đa
          dạng hình thức như gym, yoga, <br /> dance, boxing cho bạn. Chọn ngay
          phòng tập gym và PT gần đây nhất để tập luyện dễ dàng và hiệu quả.
        </p>
      </div>

      <div className=" mt-10 flex justify-center w-full">
        <div className="flex flex-wrap gap-20 w-[80%] justify-center">
          {/* trungtam1 */}
          <div className=" w-[40%] h-[550px] ">
            <img className="w-full h-[80%]" src={center1} alt="" />
            <div className="w-3/4 mt-5 ml-10">
              <h3 className="text-orange-400 text-[20px]  ">
                PHÒNG TẬP HD FITNESS
              </h3>
              <p className="text-[16px] text-black-500 hover:text-orange-400">
                996 Ngô Quyền, Quận Sơn Trà, Thành phố Đà Nẵng
              </p>
              <p className="text-[16px] text-black-500 hover:text-orange-400">
                0987878776
              </p>
            </div>
          </div>
          {/* trungtam2 */}
          <div className=" w-[40%] h-[550px]">
            <img className="w-full h-[80%]" src={center2} alt="" />
            <div className="w-3/4 mt-3 ml-10">
              <h3 className="text-orange-400 text-[20px]  ">
                PHÒNG TẬP HD FITNESS
              </h3>
              <p className="text-[16px] text-black-500 hover:text-orange-400">
                996 Ngô Quyền, Quận Sơn Trà, Thành phố Đà Nẵng
              </p>
              <p className="text-[16px] text-black-500 hover:text-orange-400">
                0987878776
              </p>
            </div>
          </div>
          <div className=" w-[40%] h-[550px]">
            <img className="w-full h-[80%]" src={center3} alt="" />
            <div className="w-3/4 mt-3 ml-10">
              <h3 className="text-orange-400 text-[20px]  ">
                PHÒNG TẬP HD FITNESS
              </h3>
              <p className="text-[16px] text-black-500 hover:text-orange-400">
                996 Ngô Quyền, Quận Sơn Trà, Thành phố Đà Nẵng
              </p>
              <p className="text-[16px] text-black-500 hover:text-orange-400">
                0987878776
              </p>
            </div>
          </div>
          <div className=" w-[40%] h-[550px]">
            <img className="w-full h-[80%]" src={center4} alt="" />
            <div className="w-3/4 mt-3 ml-10">
              <h3 className="text-orange-400 text-[20px]  ">
                PHÒNG TẬP HD FITNESS
              </h3>
              <p className="text-[16px] text-black-500 hover:text-orange-400">
                996 Ngô Quyền, Quận Sơn Trà, Thành phố Đà Nẵng
              </p>
              <p className="text-[16px] text-black-500 hover:text-orange-400">
                0987878776
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
