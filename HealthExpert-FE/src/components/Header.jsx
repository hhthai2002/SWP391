import React, { useEffect, useState } from "react";
import Logo from "../img/logo.png";
import { useNavigate } from "react-router-dom";
import { Avatar, Menu, Dropdown, Spin } from "antd";
import Bmi from "../page/Services/bmi";
import { UserOutlined } from "@ant-design/icons";

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
  const [loading, setLoading] = useState(false); // Trạng thái loading

  const isUserLoggedIn = localStorage.getItem("user");

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        setScrollPosition(currentScrollY);

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
    setLoading(true);
    setTimeout(() => {
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
      setLoading(false);
    }, 1000);
  };

  const handleLinkClick = (href, event) => {
    event.preventDefault();
    setLoading(true); // Hiển thị loading khi click
    setTimeout(() => {
      navigate(href);
      setLoading(false); // Tắt loading sau khi điều hướng
    }, 500);
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
              <a href="/manageCourse" onClick={(e) => handleLinkClick("/manageCourse", e)}>Quản lý khóa học</a>
            </Menu.Item>
            {checkManager ? (
              <Menu.Item>
                <a href="/profile" onClick={(e) => handleLinkClick("/profile", e)}>Trang Cá Nhân</a>
              </Menu.Item>
            ) : (
              <div></div>
            )}
          </>
        ) : (
          <Menu.Item>
            <a href="/profile" onClick={(e) => handleLinkClick("/profile", e)}>Trang Cá Nhân</a>
          </Menu.Item>
        )}
        <Menu.Item>
          <a href="/resetpassword" onClick={(e) => handleLinkClick("/resetpassword", e)}>Đổi Mật Khẩu</a>
        </Menu.Item>
        <Menu.Item>
          <a href="/createPost" onClick={(e) => handleLinkClick("/createPost", e)}>Đăng bài</a>
        </Menu.Item>
        <Menu.Item onClick={handleLogout}>Đăng xuất</Menu.Item>
      </Menu>
    );
  }

  function ServiceMenu(props) {
    return (
      <Menu {...props}>
        <Menu.Item>
          <a href="/gym" onClick={(e) => handleLinkClick("/gym", e)}>Gym</a>
        </Menu.Item>
        <Menu.Item>
          <a href="/dance" onClick={(e) => handleLinkClick("/dance", e)}>Dance</a>
        </Menu.Item>
        <Menu.Item>
          <a href="/yoga" onClick={(e) => handleLinkClick("/yoga", e)}>Yoga</a>
        </Menu.Item>
        <Menu.Item>
          <a href="/boxing" onClick={(e) => handleLinkClick("/boxing", e)}>Boxing</a>
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
              onClick={(e) => handleLinkClick("/home", e)}
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
              onClick={(e) => handleLinkClick("/tranformation", e)}
              className="lg:hover:text-[#FFA500] text-gray-500 block font-semibold text-[20px]"
            >
              Thay đổi
            </a>
          </li>
          <li className="max-lg:border-b max-lg:py-2 px-3">
            <a
              href="/listPost"
              onClick={(e) => handleLinkClick("/listPost", e)}
              className="lg:hover:text-[#FFA500] text-gray-500 block font-semibold text-[20px]"
            >
              Chia sẻ
            </a>
          </li>
          {!checkRole && (
            <li className="max-lg:border-b max-lg:py-2 px-3">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toggleBmiForm();
                }}
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
              <a href="/signup">
                <button className="bg-orange-400 text-white font-semibold py-1 px-4 rounded-md hover:bg-orange-500">
                  Đăng ký
                </button>
              </a>
              <a href="/signin">
                <button className="bg-gray-300 text-black font-semibold py-1 px-4 rounded-md hover:bg-gray-400">
                  Đăng nhập
                </button>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Hiệu ứng loading */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <Spin size="large" />
        </div>
      )}
    </header>
  );
};

export default Header;
