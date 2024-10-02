import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Menuleft from "../../components/MenuLeft";
import Header from "../../components/Header";
import { Table, Modal, Button } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Autosuggest from 'react-autosuggest';
import * as XLSX from 'xlsx';

export default function ManageCourse() {
  const { courseId } = useParams();
  const [course, setCourse] = useState([]);
  const [revenue, setRevenue] = useState(null);
  const [learners, setLearners] = useState([]);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [revenueByMonth, setRevenueByMonth] = useState([]);
  //Thêm trạng thái mới để lưu giữ tháng được chọn:
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  //Thêm một state mới để lưu trữ năm được chọn:
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [bills, setBills] = useState([]);
  const [orders, setOrders] = useState([]);
  const [checkManager, setCheckManager] = useState(false);
  const [roleId, setRoleId] = useState("");

  useEffect(() => {
    const roleIdFromLocalStorage = localStorage.getItem("roleId");
    setRoleId(roleIdFromLocalStorage);
    if (roleIdFromLocalStorage && roleIdFromLocalStorage === "3") {
      setCheckManager(true);
    }
    if (roleIdFromLocalStorage && roleIdFromLocalStorage === "4") {
      navigate('/home');
    }
  }, []);


  useEffect(() => {
    const fetchBills = async () => {
      try {
        const billsRes = await axios.get(`https://localhost:7158/api/Bill/getbills`);
        setBills(billsRes.data);
      } catch (error) {
        console.error("Error fetching bills: ", error);
      }
    };
    fetchBills();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersRes = await axios.get(`https://localhost:7158/api/order/getorders`);
        setOrders(ordersRes.data);
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`https://localhost:7158/api/Course/${courseId}`);
        setCourse(response.data);
      } catch (error) {
        console.error("Error fetching course details: ", error);
      }
    };
    fetchCourse();
  }, [courseId]);

  useEffect(() => {
    const fetchLearners = async () => {
      try {
        const learnersRes = await axios.get(`https://localhost:7158/api/course/${courseId}/users`);
        setLearners(learnersRes.data);
      } catch (error) {
        console.error("Error fetching learners: ", error);
      }
    };
    fetchLearners();
  }, [courseId]);

  useEffect(() => {
    if (course) {
      const courseRevenue = course.studentNumber * course.price;
      setRevenue(courseRevenue);
    }
  }, [course]);

  //Search user
  const handleSearchValueChange = (event, { newValue }) => {
    setSearchValue(newValue);
  };
  //Get suggestions by user mail
  const handleSuggestionsFetchRequested = ({ value }) => {
    axios.get(`https://localhost:7158/api/Account/GetAccountByEmail/${value}`)
      .then((response) => {
        setSuggestions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching suggestions: ", error);
      });
  };
  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) => {
    return suggestion.email;
  };

  const renderSuggestion = (suggestion) => {
    return (
      <div>
        {suggestion.email}
      </div>
    );
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    setSelectedUser(suggestion);
    setShowConfirmationModal(true);
  };

  const handleUserSelection = async (email) => {
    const teacherDTO = {
      courseId: courseId,
      teacherId: 0,
      accountEmails: [email]
    };

    try {
      const response = await axios.post(`https://localhost:7158/api/Course/add-manager`, [teacherDTO]);
      console.log(response.data);
      if (response.status === 200) {
        window.alert(response.data);
      } else {
        window.alert(response.data);
      }
    } catch (error) {
      console.error("Error adding course manager: ", error);
    }
  };

  //Gọi hàm calculateRevenueByMonth trong useEffect
  useEffect(() => {
    calculateRevenueByMonth(learners);
  }, [learners]);

  //Thay đổi useEffect để gọi hàm calculateRevenueByMonthAndYear khi có sự thay đổi trong selectedMonth và selectedYear:
  useEffect(() => {
    calculateRevenueByMonthAndYear(learners, selectedMonth, selectedYear);
  }, [learners, selectedMonth, selectedYear]);

  const formattedRevenue = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(revenue);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  //hàm để tính tổng doanh thu theo tháng dựa trên danh sách học viên:
  const calculateRevenueByMonth = (learners) => {
    const revenueByMonth = {};

    for (const learner of learners) {
      const enrollDate = new Date(learner.enrollDate);
      const month = enrollDate.getMonth();
      const year = enrollDate.getFullYear();

      // Kiểm tra nếu năm của enrollDate khớp với năm được chọn
      if (year === selectedYear) {
        const key = `${month}-${year}`;

        if (revenueByMonth[key]) {
          revenueByMonth[key] += course.price;
        } else {
          revenueByMonth[key] = course.price;
        }
      }
    }

    setRevenueByMonth(revenueByMonth);
  };

  //Tạo một hàm mới để tính tổng doanh thu theo tháng và năm được chọn:
  const calculateRevenueByMonthAndYear = (learners, selectedMonth, selectedYear) => {
    const revenueByMonth = {};

    for (const learner of learners) {
      const enrollDate = new Date(learner.enrollDate);
      const month = enrollDate.getMonth();
      const year = enrollDate.getFullYear();

      // Kiểm tra nếu năm và tháng của enrollDate khớp với năm và tháng được chọn
      if (year === selectedYear && month === selectedMonth) {
        const key = `${month}-${year}`;

        if (revenueByMonth[key]) {
          revenueByMonth[key] += course.price;
        } else {
          revenueByMonth[key] = course.price;
        }
      }
    }

    setRevenueByMonth(revenueByMonth);
  };

  //Thêm một phần tử giao diện người dùng cho phép người dùng chọn tháng:
  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };
  //Tạo một hàm xử lý sự kiện khi người dùng thay đổi năm:
  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  //Tạo một hàm để hiển thị danh sách các năm cho người dùng chọn:
  const renderYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [currentYear + 2, currentYear + 1, currentYear, currentYear - 1, currentYear - 2]; // Chọn 3 năm gần nhất

    return (
      <select value={selectedYear} onChange={handleYearChange}>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    );
  };
  //</>
  const renderMonthOptions = () => {
    const currentYear = new Date().getFullYear();
    const months = [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ];

    return (
      <select value={selectedMonth} onChange={handleMonthChange}>
        {months.map((month, index) => (
          <option key={index} value={index}>
            {`${month}`}
          </option>
        ))}
      </select>
    );
  };
  const renderRevenueByMonth = () => {
    const selectedKey = `${selectedMonth}-${selectedYear}`;

    if (!revenueByMonth[selectedKey]) {
      return <div>Không có doanh thu cho tháng và năm này.</div>;
    }

    const revenue = revenueByMonth[selectedKey];
    const formattedRevenue = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(revenue);

    return (
      <div className="text-lg">
        {formattedRevenue}
      </div>
    );
  };

  //</>

  const learnerColumns = [
    {
      title: "Tên người dùng",
      dataIndex: "userName",
      key: "userName"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Ngày tham gia",
      dataIndex: "enrollDate",
      key: "enrollDate",
      render: (text) => formatDate(text),
    }
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "courseId",
      key: "courseId",
      render: (text, record) => (
        <a onClick={() => navigate(`/manageSession/${record.courseId}`)}>{record.courseId}</a>
      ),
    },
    {
      title: "Tên khóa học",
      dataIndex: "courseName",
      key: "courseName",
    },
    {
      title: "Số lượng học viên",
      dataIndex: "studentNumber",
      key: "studentNumber",
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      key: "price",
      render: (text) => (
        <span>{new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(text)}</span>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Người tạo",
      dataIndex: "createBy",
      key: "createBy",
    },
    {
      title: "Ngôn ngữ",
      dataIndex: "language",
      key: "language",
    },
    {
      title: "Ngày tạo",
      dataIndex: "dateUpdate",
      key: "dateUpdate",
      render: (text) => {
        const date = new Date(text);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      },
    },
    {
      title: "BMI MIN",
      dataIndex: "bmiMin",
      key: "bmiMin",
    },
    {
      title: "BMI MAX",
      dataIndex: "bmiMax",
      key: "bmiMax",
    }
  ];

  //Xuất excel
  const exportToExcel = () => {
    // Filter hóa đơn theo tháng và năm được chọn
    const selectedKey = `${selectedMonth}-${selectedYear}`;
    const filteredBills = bills.filter(bill => {
      const billMonth = new Date(bill.billTime).getMonth();
      const billYear = new Date(bill.billTime).getFullYear();
      return billMonth === selectedMonth && billYear === selectedYear;
    });

    // Lấy thông tin từ bảng order
    const orderInfo = filteredBills.map(bill => {
      const order = orders.find(order => order.orderId === bill.orderId);
      return {
        billId: bill.billId,
        orderId: bill.orderId,
        courseId: order ? order.courseId : "", // Lấy courseId từ order
        // Thêm các thông tin khác từ bill
        amount: bill.amount,
        billTime: bill.billTime,
        bankCode: bill.bankCode,
        bankTranNo: bill.bankTranNo,
        cardType: bill.cardType,
        orderInfo: bill.orderInfo,
      };
    });

    // Tạo workbook mới
    const wb = XLSX.utils.book_new();
    // Tạo worksheet từ dữ liệu orderInfo
    const ws = XLSX.utils.json_to_sheet(orderInfo);
    // Thêm worksheet vào workbook
    XLSX.utils.book_append_sheet(wb, ws, "Order Info");
    // Lưu workbook thành file Excel
    XLSX.writeFile(wb, `Course_${courseId}_Bills_${selectedMonth}_${selectedYear}.xlsx`);
  };


  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="w-full">
        <Header />
      </div>
      <div className="w-full flex mt-16">
        <div className="w-[20%] h-full">
          <div className="home-page">
            <Menuleft />
          </div>
        </div>
        <div className="w-[80%] mt-3">
          <h2 className="font-bold text-2xl">{course.courseName}</h2>
          <div className="flex justify-between items-center">
            <div className="box w-[350px] rounded-md bg-orange-400 text-black font-bold py-3 px-4 rounded opacity-100 transition-opacity mt-3">
              Tổng doanh thu <br /> {course.courseName}: <br /> {formattedRevenue}
            </div>

            <div className="box w-[450px] rounded-md bg-orange-400 text-black font-bold py-3 px-4 rounded opacity-100 transition-opacity mt-3">
              Tổng doanh thu của {renderMonthOptions()} Năm {renderYearOptions()} <br /> {course.courseName}: <br /> {renderRevenueByMonth()}
              {/* <Button type="primary" style={{ backgroundColor: 'white', color: 'black' }} onClick={exportToExcel}>Xuất Excel</Button> */}
            </div>

            {checkManager ?
              <div></div>
              :
              <div className="mx-10 w-[350px] bg-white p-6 rounded-lg z-1000 border border-orange-400 opacity-100 transition-opacity mt-3 mr-10">
                <h2 className="font-bold text-2xl mb-5">Thêm quản lí</h2>
                <div className="">
                  <div className="max-h-[150px] overflow-y-auto absolute z-10 bg-white border border-gray-300 rounded-lg shadow-md">
                    <Autosuggest
                      suggestions={suggestions}
                      onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
                      onSuggestionsClearRequested={handleSuggestionsClearRequested}
                      getSuggestionValue={getSuggestionValue}
                      renderSuggestion={renderSuggestion}
                      inputProps={{
                        placeholder: 'Enter email to search',
                        value: searchValue,
                        onChange: handleSearchValueChange,
                        className: "w-full px-4 py-2 focus:outline-none"
                      }}
                      onSuggestionSelected={onSuggestionSelected}
                    />
                  </div>
                </div>
              </div>
            }

          </div>
          <div className=" w-full top-30 mt-10">
            <Table
              columns={columns}
              dataSource={[course]}
              rowKey={(record) => record.courseId}
            />
            <h2 className="font-bold text-2xl">Danh sách người học</h2>
            <Table
              columns={learnerColumns}
              dataSource={learners}
            />
          </div>
          {/* <div className=" absolute w-full top-100 mt-10">

            </div> */}
        </div>
      </div>
      <Modal
        visible={showConfirmationModal}
        onCancel={() => setShowConfirmationModal(false)}
        okButtonProps={{
          style: { backgroundColor: "blue" },
        }}
        onOk={() => {
          setShowConfirmationModal(false);
          if (selectedUser) {
            console.log("Selected email:", selectedUser.email);
            handleUserSelection(selectedUser.email);
          }
        }}
        title="Xác nhận"
      >
        {selectedUser && (
          <p>Bạn có chắc chắn muốn chỉ định người dùng <strong>{selectedUser.userName}</strong> làm người quản lý khóa học không?</p>
        )}
      </Modal>
    </>
  );
}
