using BussinessObject.Model.ModelPayment;

namespace HealthExpertAPI.Services
{
    public interface IVnPayService
    {
        string CreatePaymentUrl(HttpContext context, PaymentRequest model);
        PaymentResponse PaymentExecute(IQueryCollection collections);
    }
}
