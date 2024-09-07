import React from "react";
import Header from "../../components/Header";
import Tranformation from "../../img/tranforBackground.jpg";
import Tranformation2 from "../../img/tranforBackground2.jpg";
import { Tabs } from "antd";
import before1 from "../../img/before_1.jpg";
import before2 from "../../img/before_2.jpg";
import before3 from "../../img/before_3.jpg";
import before4 from "../../img/before_4.jpg";
import beforenu1 from "../../img/beforenu1.jpg";
import beforenu2 from "../../img/beforenu2.jpg";
import beforenu3 from "../../img/beforenu3.jpg";
import beforenu4 from "../../img/beforenu4.jpg";
import beforenam from "../../img/beforenam1.jpg";
import beforenam2 from "../../img/beforenam2.jpg";

export default function tranfor() {
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: "Học viên nam",
      children: (
        <div className="flex w-[80%] px-5   mx-auto border justify-start">
          <div className=" flex w-[95%] mt-[40px] mb-[40px] px-5 flex-wrap gap-6 mx-auto  justify-start">
            <div className=" w-[23%] ">
              <img src={before1} alt="" />
            </div>{" "}
            <div className=" w-[23%]">
              <img src={before2} alt="" />
            </div>{" "}
            <div className=" w-[23%]">
              <img src={before3} alt="" />
            </div>{" "}
            <div className=" w-[23%]">
              <img src={beforenam} alt="" />
            </div>{" "}
            <div className=" w-[23%]">
              <img src={beforenam2} alt="" />
            </div>
            <div className=" w-[23%]">
              <img src={beforenam} alt="" />
            </div>{" "}
            <div className=" w-[23%]">
              <img src={beforenam2} alt="" />
            </div>{" "}
            <div className=" w-[23%]">
              <img src={beforenam2} alt="" />
            </div>{" "}
            <div className=" w-[23%]">
              <img src={beforenam2} alt="" />
            </div>{" "}
            <div className=" w-[23%]">
              <img src={beforenam2} alt="" />
            </div>{" "}
            <div className=" w-[23%]">
              <img src={beforenam2} alt="" />
            </div>{" "}
            <div className=" w-[23%]">
              <img src={beforenam2} alt="" />
            </div>{" "}
            <div className=" w-[23%]">
              <img src={beforenam2} alt="" />
            </div>{" "}
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "Học viên nữ",
      children: (
        <div className="flex w-[85%] px-5   mx-auto border justify-start">
          <div className=" flex  mt-[40px] mb-[40px] px-5 flex-wrap gap-6 mx-auto  justify-start">
            <div className=" w-[23%] ">
              <img src={beforenu1} alt="" />
            </div>{" "}
            <div className=" w-[23%]">
              <img src={beforenu2} alt="" />
            </div>{" "}
            <div className=" w-[23%]">
              <img src={beforenu3} alt="" />
            </div>{" "}
            <div className=" w-[23%]">
              <img src={beforenu4} alt="" />
            </div>{" "}
            <div className=" w-[23%] ">
              <img src={beforenu1} alt="" />
            </div>{" "}
            <div className=" w-[23%]">
              <img src={beforenu2} alt="" />
            </div>{" "}
            <div className=" w-[23%]">
              <img src={beforenu3} alt="" />
            </div>{" "}
            <div className=" w-[23%]">
              <img src={beforenu4} alt="" />
            </div>{" "}
            <div className=" w-[23%]">
              <img src={beforenu4} alt="" />
            </div>{" "}
            <div className=" w-[23%]">
              <img src={beforenu4} alt="" />
            </div>{" "}
            <div className=" w-[23%]">
              <img src={beforenu4} alt="" />
            </div>{" "}
            <div className=" w-[23%]">
              <img src={beforenu4} alt="" />
            </div>{" "}
            <div className=" w-[23%]">
              <img src={beforenu4} alt="" />
            </div>{" "}
            <div className=" w-[23%]">
              <img src={beforenu4} alt="" />
            </div>{" "}
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="homepage">
        <Header />
      </div>
      <div className="relative">
        <div className="relative">
          <img className="w-full h-[475px] " src={Tranformation} alt="" />
        </div>
        <div className="absolute top-40  left-[30%]">
          <h2 className="text-[60px] text-white font-bold   ">
            TRANSFORMATION
          </h2>
          <p className="w-[50%] tracking-wide text-sm text-white">
            Sức khỏe không chỉ là một trạng thái cơ thể, mà là một tình trạng
            toàn diện của tâm hồn, tâm trí và cơ thể. Chăm sóc sức khỏe không
            chỉ là việc duy trì cơ thể khỏe mạnh, mà còn là hành trình chăm sóc
            tâm linh và tư duy. Điều quan trọng là học cách yêu thương bản thân,
            dành thời gian lắng nghe cơ thể, và xây dựng những thói quen lành
            mạnh.
          </p>
        </div>
        <img className="w-full" src={Tranformation2} alt="" />
      </div>

      {/* number couting */}
      <div></div>

      {/* beforafteer */}
      <div className="mt-5 text-center  ">
        <Tabs
          className="text-center"
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
          centered
        />
        ;
      </div>
      {/* hình ảnh ở đây */}
    </>
  );
}
