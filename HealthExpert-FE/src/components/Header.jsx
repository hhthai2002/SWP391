import React, { useEffect, useState } from "react";
import Logo from "../img/logo.png";
import { useNavigate } from "react-router-dom";
import { Avatar, Menu, Dropdown } from "antd";
import Bmi from "../page/Services/bmi";
import {
  UserOutlined,
} from "@ant-design/icons";

const Header = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkRole, setCheckRole] = useState(false);
  const [checkManager, setCheckManager] = useState(false);
  const [showBmiForm, setShowBmiForm] = useState(false);
  const [username, setUsername] = useState("");
  const [roleId, setRoleId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0); // Track scroll position
  const [showHeader, setShowHeader] = useState(true); // Show or hide header

  const isUserLoggedIn = localStorage.getItem("user");

  useEffect(() => {
    const handleScroll = () => {
      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        setScrollPosition(currentScrollY);

        // Show header on scroll up and hide on scroll down
        if (currentScrollY < scrollPosition) {
          setShowHeader(true); // Scrolling up
        } else {
          setShowHeader(false); // Scrolling down
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  useEffect(() => {
    fetch(`https://localhost:7158/api/Account/GetListAccount`, {
      method: "GET",
      headers: {
        Authorization: "Bearer YOUR_ACCESS_TOKEN",
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.error(`Lỗi load dữ liệu!`);
          alert("Lỗi load dữ liệu!");
          throw new Error("Lỗi load dữ liệu!");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          const foundUser = data.find(
            (accountList) => accountList.userName === isUserLoggedIn
          );
          if (foundUser) {
            localStorage.setItem("roleId", foundUser.roleId);
          } else {
            console.error("Lỗi load dữ liệu!");
          }
        } else {
          console.error("Lỗi load dữ liệu!");
        }
      })
      .catch((error) => {
        console.error("Lỗi load dữ liệu!", error);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }, []);

  useEffect(() => {
    if (isLoaded && isUserLoggedIn) {
      setLoggedIn(true);
      setUsername(localStorage.getItem("user"));
      const roleIdFromLocalStorage = localStorage.getItem("roleId");
      setRoleId(roleIdFromLocalStorage);
      if (roleIdFromLocalStorage && roleIdFromLocalStorage === "2") {
        setCheckRole(true);
      } else if (roleIdFromLocalStorage === "3") {
        setCheckManager(true);
      }
    }
    setIsLoaded(false);
  }, [isLoaded, isUserLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("currentCourse");
    localStorage.removeItem("currentSession");
    localStorage.removeItem("accountId");
    localStorage.removeItem("roleId");
    setLoggedIn(false);
    setUsername("");
    const route = "/home";
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
              <a href="/manageCourse">Quản lý khóa học</a>
            </Menu.Item>
            {checkManager ? (
              <Menu.Item>
                <a href="/profile">Trang Cá Nhân</a>
              </Menu.Item>
            ) : (
              <div></div>
            )}
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
        <Menu.Item onClick={handleLogout}>Đăng xuất</Menu.Item>
      </Menu>
    );
  }

  function ServiceMenu(props) {
    return (
      <Menu {...props}>
        <Menu.Item>
          <a href="/gym">Gym</a>
        </Menu.Item>
        <Menu.Item>
          <a href="/dance">Dance</a>
        </Menu.Item>
        <Menu.Item>
          <a href="/yoga">Yoga</a>
        </Menu.Item>
        <Menu.Item>
          <a href="/boxing">Boxing</a>
        </Menu.Item>
      </Menu>
    );
  }

  return (
    <header
      className={`border-b py-1.2 px-1.2 sm:px-10 bg-white font-[sans-serif] min-h-[70px] fixed top-0 left-0 right-0 z-50 shadow-lg transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`} // Apply sliding effect
    >
      <div className="flex flex-wrap items-center gap-x-2 max-lg:gap-y-6">
        <a href="/">
          <img src={Logo} alt="logo" className="w-16 h-16 rounded-full" />
        </a>
        <ul
          id="collapseMenu"
          className="lg:!flex lg:ml-14 lg:space-x-5 max-lg:space-y-2 max-lg:hidden max-lg:py-4 max-lg:w-full"
        >
          <li className="max-lg:border-b max-lg:py-2 px-3">
            <a
              href="/home"
              className="lg:hover:text-[#FFA500] text-gray-500 block font-semibold text-[20px]"
            >
              Trang chủ
            </a>
          </li>
          <li className="max-lg:border-b max-lg:py-2 px-3">
            <Dropdown overlay={<ServiceMenu />}>
              <a
                href="#"
                className="lg:hover:text-[#FFA500] text-gray-500 block font-semibold text-[20px]"
              >
                Dịch vụ
              </a>
            </Dropdown>
          </li>
          <li className="max-lg:border-b max-lg:py-2 px-3">
            <a
              href="/tranformation"
              className="lg:hover:text-[#FFA500] text-gray-500 block font-semibold text-[20px]"
            >
              Thay đổi
            </a>
          </li>
          <li className="max-lg:border-b max-lg:py-2 px-3">
            <a
              href="/listPost"
              className="lg:hover:text-[#FFA500] text-gray-500 block font-semibold text-[20px]"
            >
              Chia sẻ
            </a>
          </li>
          {!checkRole && (
            <li className="max-lg:border-b max-lg:py-2 px-3">
              <a
                href="#"
                onClick={toggleBmiForm}
                className="lg:hover:text-[#FFA500] text-gray-500 block font-semibold text-[20px]"
              >
                Tìm khóa học phù hợp
              </a>
              {showBmiForm && <Bmi onClose={toggleBmiForm} />}
            </li>
          )}
        </ul>
        <div className="ml-auto flex mr-3">
          {loggedIn ? (
            <div className="lg:!flex lg:ml-14 lg:space-x-5 max-lg:space-y-2 max-lg:hidden max-lg:py-4 max-lg:w-full">
              <p className="mr-2 text-orange-400 text-xl">
                <strong>{username}</strong>
              </p>
              <Dropdown overlay={<WidgetMenu />}>
                <Avatar icon={<UserOutlined />} />
              </Dropdown>
            </div>
          ) : (
            <div>
              <a href="/signin">
                <button className="bg-orange-500 text-white py-2 px-4 rounded transition-opacity hover:bg-opacity-80 mr-1">
                  Đăng nhập
                </button>
              </a>
              <a href="/signup">
                <button className="bg-orange-500 text-white py-2 px-4 rounded transition-opacity hover:bg-opacity-80">
                  Đăng ký
                </button>
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
