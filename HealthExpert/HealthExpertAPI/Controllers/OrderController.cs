using BussinessObject.ContextData;
using BussinessObject.Model.ModelPayment;
using DataAccess.Repository;
using DataAccess.Repository.IRepository;
using HealthExpertAPI.DTO.DTOOrder;
using HealthExpertAPI.Extension.ExOrder;
using HealthExpertAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace HealthExpertAPI.Controllers
{
    [EnableCors("AllowAllHeaders")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _repository = new OrderRepository();
        private readonly IBillRepository _repoBill = new BillRepository();
        private readonly ICourseRepository _repoCourse = new CourseRepository();
        private readonly HealthExpertContext _context;
        private static readonly Random random = new Random();
        private static List<CheckoutDTO> _checkoutDataList = new List<CheckoutDTO>();

        private readonly IVnPayService _service;
        private readonly IConfiguration _configuration;

        public OrderController(IVnPayService service, IConfiguration configuration, HealthExpertContext context)
        {
            _configuration = configuration;
            _service = service;
            _context = context;
        }

        //Get List Order
        [AllowAnonymous]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<List<OrderDTO>> GetOrders()
        {
            var orderList = _repository.GetAllOrders();
            return Ok(orderList);
        }

        //View Checkout Order By Id
        [AllowAnonymous]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<OrderDTO> GetOrderById(Guid id)
        {
            var order = _repository.GetOrderById(id);
            if (order == null)
            {
                return NotFound();
            }
            return Ok(order.ToOrderDTO());
        }

        //Add to Order
        [AllowAnonymous]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult AddOrder(CreateOrderDTO orderDTO)
        {
            var courseExists = _context.courses.Any(c => c.courseId == orderDTO.courseId);
            var accountExists = _context.accounts.Any(a => a.accountId == orderDTO.accountId);

            if (!courseExists || !accountExists)
            {
                return BadRequest("Course or account not found.");
            }

            // Check if the account already has the course
            //var existingOrder = _context.orders
            //    .FirstOrDefault(o => o.accountId == orderDTO.accountId && o.courseId == orderDTO.courseId);

            //if (existingOrder != null)
            //{
            //    return BadRequest("You already have this course.");
            //}

            var course = _context.courses.SingleOrDefault(c => c.courseId == orderDTO.courseId);
            var account = _context.accounts.SingleOrDefault(account => account.accountId == orderDTO.accountId);

            Order order = orderDTO.ToCreateOrder();

            order.price = (decimal?)Convert.ToDouble(course.price);

            _repository.AddOrder(order);
            _context.SaveChanges();

            var checkoutData = new CheckoutDTO
            {
                price = order.price,
                orderId = order.orderId,
                accountId = order.accountId,
                courseId = order.courseId
            };

            var accountId = order.accountId;
            _checkoutDataList.Add(checkoutData);

            //return Ok(order);
            return Ok(new { order, accountId });
        }

        //Remove Order
        [AllowAnonymous]
        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult RemoveOrder(Guid id)
        {
            var order = _repository.GetOrderById(id);
            if (order == null)
            {
                return NotFound();
            }
            _repository.DeleteOrder(id);
            _context.SaveChanges();
            return Ok(order);
        }

        //Checkout Order
        [AllowAnonymous] //[Authorize]
        [HttpPost]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        public IActionResult CheckoutOrder(string payment = "VnPay")
        {
            if (_checkoutDataList.Count == 0)
            {
                return BadRequest("No checkout data available");
            }

            var checkoutData = _checkoutDataList[_checkoutDataList.Count - 1];

            if (payment != "VnPay")
            {
                return BadRequest("Invalid payment method");
            }

            var vnPayModel = new PaymentRequest
            {
                amount = (decimal)checkoutData.price,
                createdDate = DateTime.Now
            };

            var paymentUrl = _service.CreatePaymentUrl(HttpContext, vnPayModel);
            var accountId = checkoutData.accountId;

            var bill = new Bill
            {
                accountId = accountId.HasValue ? accountId.Value : Guid.Empty,
                orderId = checkoutData.orderId,
                amount = Convert.ToInt64(vnPayModel.amount),
            };

            _context.Database.BeginTransaction();
            _context.bills.Add(bill);
            _context.SaveChanges();

            return Ok(paymentUrl);
        }


        //Payment Call Back
        [AllowAnonymous]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult PaymentCallback([FromQuery] PaymentCallbackQueryParams queryParams)
        {
            if (queryParams == null)
            {
                return BadRequest(new { message = "Invalid query parameters" });
            }

            var response = _service.PaymentExecute(Request.Query);

            if (response == null || response.vnPayResponseCode != "00")
            {
                return BadRequest(new { message = "Payment failed" });
            }

            //var checkoutData = _checkoutDataList.FirstOrDefault(c => c.orderId == response.orderId);
            var checkoutData = _checkoutDataList.FirstOrDefault();
            if (checkoutData != null)
            {
                var billDTO = new CreateBillDTO();
                Bill bill = billDTO.ToCreateBill();
                bill.accountId = checkoutData.accountId.HasValue ? checkoutData.accountId.Value : Guid.Empty;
                bill.orderId = checkoutData.orderId;
                bill.amount = Convert.ToInt64(queryParams.vnp_Amount);
                bill.bankCode = Convert.ToString(queryParams.vnp_BankCode);
                bill.bankTranNo = Convert.ToString(queryParams.vnp_BankTranNo);
                bill.cardType = Convert.ToString(queryParams.vnp_CardType);
                bill.orderInfo = Convert.ToString(queryParams.vnp_OrderInfo);

                //var enroll = _context.enrollments.FirstOrDefault(x => x.courseId == checkoutData.courseId);
                //enroll.enrollStatus = true;
                //enroll.accountId = checkoutData.accountId.HasValue ? checkoutData.accountId.Value : Guid.Empty;
                //enroll.courseId = checkoutData.courseId;

                _context.Database.BeginTransaction();
                _repoBill.InsertBill(bill);
                //_repoCourse.UpdateEnrollment(enroll);
                _context.SaveChanges();

                _checkoutDataList.Remove(checkoutData);

                //return Ok(new { message = "Payment successful" });
                var frontendURL = $"http://localhost:3000/detailCourse/{checkoutData.courseId}";
                return Redirect(frontendURL);
            }
            else
            {
                return BadRequest(new { message = "Checkout Data null" });
            }
        }
    }
}
