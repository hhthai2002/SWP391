import React, { useEffect, useState } from "react";
import Logo from "../img/logo.png";
import Post from "./Post";
import { useNavigate } from "react-router-dom";
import { Avatar, Menu, Dropdown } from "antd";
import { Button, Modal } from "antd";
import {
  UserOutlined,
  SolutionOutlined,
  LockOutlined,
  TranslationOutlined,
  PoweroffOutlined
} from "@ant-design/icons";
import Bmi from "../page/Services/bmi"
import ModalCreatCourse from "./ModalCreatCourse";

const Header = () => {
  const navigate = useNavigate()
  const [postOpen, setPostOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkRole, setCheckRole] = useState(false);
  const [checkManager, setCheckManager] = useState(false);
  const [showBmiForm, setShowBmiForm] = useState(false);
  const [username, setUsername] = useState("");
  const [roleId, setRoleId] = useState(""); // State to track whether user is logged in
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const isUserLoggedIn = localStorage.getItem("user");

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    //localStorage.removeItem("ProposeCourse");

    fetch(`https://localhost:7158/api/Account/GetListAccount`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer YOUR_ACCESS_TOKEN",
      }
    })
      .then(response => {
        if (!response.ok) {
          console.error(`Lỗi load dữ liệu!`);
          alert("Lỗi load dữ liệu!");
          throw new Error("Lỗi load dữ liệu!");
        }
        return response.json();
      })
      .then(data => {

        if (Array.isArray(data)) {
          const foundUser = data.find(accountList => accountList.userName === isUserLoggedIn);
          if (foundUser) {
            localStorage.setItem("roleId", foundUser.roleId);
          } else {
            console.error("Lỗi load dữ liệu!");
          }
        } else {
          console.error("Lỗi load dữ liệu!");
        }
      })
      .catch(error => {
        console.error("Lỗi load dữ liệu!", error);
      })
      .finally(() => {
        setIsLoaded(true);
      });

    // Check if user is logged in using your preferred method (e.g., checking local storage)


  }, []);

  useEffect(() => {
    if (isLoaded && isUserLoggedIn) {
      setLoggedIn(true);
      //console.log(localStorage.getItem("user"));
      setUsername(localStorage.getItem("user"));
      const roleIdFromLocalStorage = localStorage.getItem("roleId");
      setRoleId(roleIdFromLocalStorage);
      if (roleIdFromLocalStorage && roleIdFromLocalStorage === "2") {
        setCheckRole(true);
      } else if (roleIdFromLocalStorage === "3") {
        setCheckManager(true);
      }
    }
    // if (!isReloaded) {
    //   setIsReloaded(true);
    //window.location.reload();
    setIsLoaded(false);
    // }
  }, [isLoaded, isUserLoggedIn]);

  // useEffect(() => {
  //   if (checkRole === true && reloadNeeded === true) {
  //     window.location.reload();
  //     setReloadNeeded(false);
  //   }
  // }, [checkRole, reloadNeeded]);

  // useEffect(() => {
  //   if (reloadNeeded) {
  //     window.location.reload();
  //     setReloadNeeded(false); // Đảm bảo rằng reload chỉ xảy ra một lần
  //   }
  // }, [reloadNeeded]);

  // Function to handle logout
  const handleLogout = () => {
    // Perform logout logic here
    localStorage.removeItem("user"); // Assuming you set userName in localStorage during login
    localStorage.removeItem("currentCourse");
    localStorage.removeItem("currentSession");
    localStorage.removeItem("accountId");
    localStorage.removeItem("roleId");
    setLoggedIn(false);
    setUsername("");
    const route = '/home'; // Specify the desired route path
    navigate(route, { replace: true });
    window.location.reload();
  };

  const toggleBmiForm = () => {
    setShowBmiForm(!showBmiForm);
  };

  function WidgetMenu(props) {
    return (
      <Menu {...props}>
        {checkManager || checkRole ? (
          <>
            <Menu.Item>
              <a href="/manageCourse">
                Quản lý khóa học
              </a>
            </Menu.Item>
            {checkManager ? (
              <Menu.Item>
                <a href="/profile">Trang Cá Nhân</a>
              </Menu.Item>
            )

              : (<div></div>)

            }
          </>
        ) : (
          <Menu.Item>
            <a href="/profile">Trang Cá Nhân</a>
          </Menu.Item>
        )}
        <Menu.Item>
          <a href="/resetpassword">Đổi Mật Khẩu</a>
        </Menu.Item>
        <Menu.Item>
          <a href="/createPost">Đăng bài</a>
        </Menu.Item>
        <Menu.Item onClick={handleLogout}>
          Đăng xuất
        </Menu.Item>
      </Menu>
    );
  }

  function ServiceMenu(props) {
    return (
      <Menu {...props}>
        <Menu.Item >
          <a href="/gym">Gym</a>
        </Menu.Item>
        <Menu.Item>
          <a href="/dance">Dance</a>
        </Menu.Item>
        <Menu.Item>
          <a href="/yoga">Yoga</a>
        </Menu.Item>
        <Menu.Item >
          <a href="/boxing">Boxing</a>
        </Menu.Item>

      </Menu>
    );
  }

  return (
    <header className=" border-b py-1.2 px-1.2 sm:px-10 bg-white font-[sans-serif] min-h-[70px]">
      <div className="flex flex-wrap items-center gap-x-2 max-lg:gap-y-6">
        <a href="/" >
          <img src={Logo} alt="logo" className="w-16 h-16 rounded-full" />
        </a>
        <div className="flex lg:ml-6 max-lg:w-full">
          {/* <div className="flex xl:w-80 max-xl:w-full bg-gray-100 px-6 py-3 rounded outline outline-transparent focus-within:outline-[#FFA500]">
            <input
              type="text"
              placeholder="Search something..."
              className="w-full text-sm bg-transparent rounded outline-none pr-2"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192.904 192.904"
              width="16px"
              className="cursor-pointer fill-gray-400"
            >
              <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
            </svg>
          </div> */}
        </div>

        <ul
          id="collapseMenu"
          className="lg:!flex lg:ml-14 lg:space-x-5 max-lg:space-y-2 max-lg:hidden max-lg:py-4 max-lg:w-full"
        >
          <li className="max-lg:border-b max-lg:py-2 px-3">
            <a
              href="/home"
              className="lg:hover:text-[#FFA500] text-gray-500 block font-semibold text-[15px]"
            >
              Trang chủ
            </a>
          </li>
          <li className="max-lg:border-b max-lg:py-2 px-3">
            <Dropdown overlay={<ServiceMenu />}>
              <a
                href="#"
                className="lg:hover:text-[#FFA500] text-gray-500 block font-semibold text-[15px]"
              >
                Dịch vụ
              </a>
            </Dropdown>
          </li>
          <li className="max-lg:border-b max-lg:py-2 px-3">
            <a
              href="/tranformation"
              className="lg:hover:text-[#FFA500] text-gray-500 block font-semibold text-[15px]"
            >
              Thay đổi
            </a>
          </li>
          {/* <li className="max-lg:border-b max-lg:py-2 px-3">
            <a
              href="#"
              className="lg:hover:text-[#FFA500] text-gray-500 block font-semibold text-[15px]"
            >
              Tin tức
            </a>
          </li> */}
          <li className="max-lg:border-b max-lg:py-2 px-3">
            <a
              href="/listPost"
              className="lg:hover:text-[#FFA500] text-gray-500 block font-semibold text-[15px]"
            >
              Chia sẻ
            </a>
          </li>
          {checkRole ?
            <div></div>
            :
            <li className="max-lg:border-b max-lg:py-2 px-3">
              <a
                href="#"
                onClick={toggleBmiForm}
                className="lg:hover:text-[#FFA500] text-gray-500 block font-semibold text-[15px]"
              >
                Tìm kiếm thông minh
              </a>
              {showBmiForm && <Bmi onClose={toggleBmiForm} />}
            </li>
          }

        </ul>
        <div className="ml-auto flex mr-3">
          {
            loggedIn ?
              <div className="lg:!flex lg:ml-14 lg:space-x-5 max-lg:space-y-2 max-lg:hidden max-lg:py-4 max-lg:w-full">
                <p className="mr-2 text-gray-700">{username}</p>
                <Dropdown overlay={<WidgetMenu />}>
                  <Avatar icon={<UserOutlined />} />
                </Dropdown>
              </div>
              :
              <div>
                <a href="/signin">
                  {" "}
                  <button className="bg-orange-500 text-white py-2 px-4 rounded transition-opacity hover:bg-opacity-80 mr-1">
                    Đăng nhập
                  </button>
                </a>
                <a href="/signup">
                  {" "}
                  <button className="bg-orange-500 text-white py-2 px-4 rounded transition-opacity hover:bg-opacity-80 ml-4">
                    Đăng ký
                  </button>
                </a>
              </div>
          }
        </div>
      </div>
    </header>
  );
};

export default Header;
