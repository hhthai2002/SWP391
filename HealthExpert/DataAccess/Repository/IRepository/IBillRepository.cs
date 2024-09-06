using BussinessObject.Model.ModelPayment;

namespace DataAccess.Repository.IRepository
{
    public interface IBillRepository
    {
        List<Bill> GetAllBills();
        Bill GetBillById(Guid id);
        void InsertBill(Bill bill);
        void UpdateBill(Guid id, Bill bill);
        void DeleteBill(Guid id);
    }
}
