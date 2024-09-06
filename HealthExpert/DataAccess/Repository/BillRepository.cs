using BussinessObject.Model.ModelPayment;
using DataAccess.DAO;
using DataAccess.Repository.IRepository;

namespace DataAccess.Repository
{
    public class BillRepository : IBillRepository
    {
        public void DeleteBill(Guid id) => BillDAO.DeleteBill(id);

        public List<Bill> GetAllBills() => BillDAO.GetBills();

        public Bill GetBillById(Guid id) => BillDAO.GetBillById(id);

        public void InsertBill(Bill bill) => BillDAO.InsertBill(bill);

        public void UpdateBill(Guid id, Bill bill) => BillDAO.UpdateBill(id, bill);
    }
}
