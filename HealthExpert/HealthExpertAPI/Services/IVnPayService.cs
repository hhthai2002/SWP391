using BussinessObject.Model.ModelPayment;

namespace HealthExpertAPI.Services
{
    public interface IVnPayService
    {
        string CreatePaymentUrl(HttpContext context, PaymentRequest model);
        Payment PaymentExecute(IQueryCollection collections);
    }
}
