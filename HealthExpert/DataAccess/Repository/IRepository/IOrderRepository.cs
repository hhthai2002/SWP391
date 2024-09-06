using BussinessObject.Model.ModelPayment;

namespace DataAccess.Repository.IRepository
{
    public interface IOrderRepository
    {
        List<Order> GetAllOrders();
        Order GetOrderById(Guid id);
        void AddOrder(Order order);
        void UpdateOrder(Guid id, Order order);
        void DeleteOrder(Guid id);
    }
}
