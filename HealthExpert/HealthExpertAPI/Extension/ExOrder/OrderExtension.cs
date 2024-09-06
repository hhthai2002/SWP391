using BussinessObject.Model.ModelPayment;
using HealthExpertAPI.DTO.DTOOrder;

namespace HealthExpertAPI.Extension.ExOrder
{
    public static class OrderExtension
    {
        public static OrderDTO ToOrderDTO(this Order order)
        {
            return new OrderDTO
            {
                orderId = order.orderId,
                orderTime = order.orderTime,
                price = order.price,
                discount = order.discount,
                accountId = order.accountId,
                courseId = order.courseId,
            };
        }

        public static Order ToCreateOrder(this CreateOrderDTO orderDTO)
        {
            return new Order
            {
                orderTime = orderDTO.orderTime,
                price = orderDTO.price,
                discount = orderDTO.discount,
                accountId = orderDTO.accountId,
                courseId = orderDTO.courseId,
            };
        }

        public static BillDTO ToBillDTO(this Bill bill)
        {
            return new BillDTO
            {
                billId = bill.billId,
                orderId = bill.orderId,
                accountId = bill.accountId,
                amount = bill.amount,
                bankCode = bill.bankCode,
                bankTranNo = bill.bankTranNo,
                cardType = bill.cardType,
                orderInfo = bill.orderInfo,
                payDate = bill.payDate,
            };
        }

        public static Bill ToCreateBill(this CreateBillDTO billDTO)
        {
            return new Bill
            {
                orderId = billDTO.orderId,
                accountId = billDTO.accountId,
                amount = billDTO.amount,
                bankCode = billDTO.bankCode,
                bankTranNo = billDTO.bankTranNo,
                cardType = billDTO.cardType,
                orderInfo = billDTO.orderInfo,
                billTime = billDTO.billTime,
                payDate = billDTO.payDate,
            };
        }
    }
}
