import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PayCourse = () => {
    const [accountId, setAccountId] = useState(null);
    const { id } = useParams(); // id là courseId
    const [result, setResult] = useState('');
    const paymentMethod = "VnPay";
    const [orderId, setOrderId] = useState(null);
    const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

    // Lấy accountId từ localStorage
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) {
            console.error("Không có người dùng trong localStorage!");
            return;
        }

        const fetchAccountId = async () => {
            try {
                const response = await axios.get(
                    `https://localhost:7158/api/Account/GetAccountIdByUserName/${user}`
                );
                setAccountId(response.data);
            } catch (error) {
                console.error("Lỗi khi tải người dùng:", error);
            }
        };

        fetchAccountId();
    }, []);

    // Tạo order khi click "Buy"
    const payCourse = async () => {
        const orderDTO = { courseId: id, accountId: accountId };

        try {
            // Create Order
            const addResponse = await axios.post('https://localhost:7158/api/Order/AddOrder', orderDTO);
            const createdOrder = addResponse.data.order;
            setOrderId(createdOrder.orderId);

            setResult('Đã tạo đơn hàng. Đang xử lý thanh toán...');

            // Gửi request thanh toán
            const checkoutResponse = await axios.post(`https://localhost:7158/api/Order/CheckoutOrder?payment=${paymentMethod}`);
            if (checkoutResponse.status === 200) {
                window.location.href = checkoutResponse.data;
                setIsPaymentSuccess(true); // Thanh toán thành công
            } else {
                setResult('Không thể bắt đầu thanh toán.');
            }
        } catch (error) {
            setResult('Lỗi trong quá trình thanh toán: ' + error.response.data);
        }
    };


    // Kiểm tra nếu thanh toán thành công
    const checkPaymentStatus = async () => {
        try {
            const orderRes = await axios.get(`https://localhost:7158/api/order/getorders`);
            const matchingOrders = orderRes.data.filter(
                (order) => order.accountId === accountId && order.courseId === id
              ); // Kiểm tra nếu có bill cho orderId hiện tại

              if (matchingOrders.length > 0) {
                const billRes = await axios.get(`https://localhost:7158/api/Bill/getbills`);
                const matchingBill = billRes.data.find((bill) =>
                  matchingOrders.some((order) => bill.orderId === order.orderId)
                );
                if (matchingBill){
                    enrollCourse();
                }
                else{
                    console.log("Not paid yet")
                }
            }
        } catch (error) {
            setResult('Lỗi khi kiểm tra trạng thái thanh toán: ' + error.response.data);
        }
    };

    const enrollCourse = async () => {
        try {
            const enrollResponse = await axios.post(`https://localhost:7158/api/Course/enroll/${accountId}/${id}`);
            setResult('Đã ghi danh vào khóa học thành công!');
            await axios.post(`https://localhost:7158/api/Course/increase-student-number/${id}`); // Tăng số lượng học viên
        } catch (error) {
            setResult('Lỗi khi ghi danh khóa học: ' + error.response.data);
        }
    };

    useEffect(() => {
            checkPaymentStatus();
    });

    return (
        <div>
            <button className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={payCourse}>
                Mua khóa học
            </button>
            <p>{result}</p>
        </div>
    );
};

export default PayCourse;
