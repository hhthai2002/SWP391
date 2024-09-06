using BussinessObject.Model.ModelPayment;
using DataAccess.DAO;
using DataAccess.Repository.IRepository;

namespace DataAccess.Repository
{
    public class OrderRepository : IOrderRepository
    {
        public void AddOrder(Order order) => OrderDAO.AddOrder(order);

        public void DeleteOrder(Guid id) => OrderDAO.DeleteOrder(id);

        public List<Order> GetAllOrders() => OrderDAO.GetAllOrder();

        public Order GetOrderById(Guid id) => OrderDAO.GetOrderById(id);

        public void UpdateOrder(Guid id, Order order) => OrderDAO.UpdateOrder(id, order);
    }
}
