using BussinessObject.Model.ModelPayment;
using HealthExpertAPI.Helper;

namespace HealthExpertAPI.Services
{
    public class VnPayService : IVnPayService
    {
        private readonly IConfiguration _config;

        public VnPayService(IConfiguration config)
        {
            _config = config;
        }

        public string CreatePaymentUrl(HttpContext context, PaymentRequest model)
        {
            var tick = DateTime.Now.Ticks.ToString();

            var vnpay = new VnPayLibrary();

            vnpay.AddRequestData("vnp_Version", _config["VnPay:Version"]);
            vnpay.AddRequestData("vnp_Command", _config["VnPay:Command"]);
            vnpay.AddRequestData("vnp_TmnCode", _config["VnPay:TmnCode"]);
            vnpay.AddRequestData("vnp_Amount", (model.amount * 100).ToString());
            //Số tiền thanh toán. Số tiền không mang các ký tự phân tách thập phân, phần nghìn, ký tự tiền tệ.
            //Để gửi số tiền thanh toán là 100,000 VND (một trăm nghìn VNĐ) thì merchant cần nhân thêm 100 lần (khử phần thập phân), sau đó gửi sang VNPAY là: 10000000

            vnpay.AddRequestData("vnp_CreateDate", model.createdDate.ToString("yyyyMMddHHmmss"));
            vnpay.AddRequestData("vnp_CurrCode", _config["VnPay:CurrCode"]);
            vnpay.AddRequestData("vnp_IpAddr", Utils.GetIpAddress(context));
            vnpay.AddRequestData("vnp_Locale", _config["VnPay:Locale"]);

            vnpay.AddRequestData("vnp_OrderInfo", "Thanh toán cho đơn hàng:" + model.orderId);
            vnpay.AddRequestData("vnp_OrderType", "other"); //default value: other
            vnpay.AddRequestData("vnp_ReturnUrl", _config["VnPay:PaymentBackReturnUrl"]);

            vnpay.AddRequestData("vnp_TxnRef", tick);
            // Mã tham chiếu của giao dịch tại hệ thống của merchant. Mã này là duy nhất dùng để phân biệt các đơn hàng gửi sang VNPAY. Không được trùng lặp trong ngày

            var paymentUrl = vnpay.CreateRequestUrl(_config["VnPay:BaseUrl"], _config["VnPay:HashSecret"]);

            return paymentUrl;
        }

        //public PaymentResponse PaymentExecute(IQueryCollection collections)
        public PaymentResponse PaymentExecute(IQueryCollection collections)
        {
            var vnpay = new VnPayLibrary();

            foreach (var (key, value) in collections)
            {
                if (!string.IsNullOrEmpty(key) && key.StartsWith("vnp_"))
                {
                    vnpay.AddResponseData(key, value.ToString());
                }
            }

            var vnp_TransactionId = Convert.ToInt64(vnpay.GetResponseData("vnp_TransactionNo"));
            //var vnp_SecureHash = collections.FirstOrDefault(p => p.Key == "vnp_SecureHash").Value;
            var vnp_ResponseCode = vnpay.GetResponseData("vnp_ResponseCode");
            var vnp_OrderInfo = vnpay.GetResponseData("vnp_OrderInfo");
            var vnp_Amount = Convert.ToInt64(vnpay.GetResponseData("vnp_Amount"));
            //var vnp_SecureHash = collections.FirstOrDefault(p => string.Equals(p.Key, "vnp_SecureHash", StringComparison.OrdinalIgnoreCase)).Value;
            var vnp_SecureHash = collections["vnp_SecureHash"];

            var vnp_TxnRef = Convert.ToInt64(vnpay.GetResponseData("vnp_TxnRef"));
            var orderIdInt = vnp_TxnRef.GetHashCode();
            var vnp_orderId = (new Guid(orderIdInt, 0, 0, new byte[8]));

            //var vnp_TransactionId = Convert.ToInt64(collections.vnp_TransactionNo);
            //var vnp_SecureHash = collections.vnp_SecureHash;
            //var vnp_ResponseCode = collections.vnp_ResponseCode;
            //var vnp_OrderInfo = collections.vnp_OrderInfo;
            //var vnp_Amount = Convert.ToInt64(collections.vnp_Amount);

            //var vnp_TxnRef = Convert.ToInt64(collections.vnp_TxnRef);
            //var orderIdInt = vnp_TxnRef.GetHashCode();
            //var vnp_orderId = (new Guid(orderIdInt, 0, 0, new byte[8]));

            bool checkSignature = vnpay.ValidateSignature(vnp_SecureHash, _config["VnPay:HashSecret"]);
            if (!checkSignature)
            {
                return new PaymentResponse
                {
                   success = false
                };
            }

            return new PaymentResponse
            {
                success = true,
                paymentMethod = "VnPay",
                orderDescription = vnp_OrderInfo,
                orderId = vnp_orderId,
                transactionId = vnp_TransactionId.ToString(),
                token = vnp_SecureHash,
                vnPayResponseCode = vnp_ResponseCode,
            };
        }
    }
}
