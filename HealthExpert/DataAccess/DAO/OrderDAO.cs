using BussinessObject.ContextData;
using BussinessObject.Model.ModelPayment;

namespace DataAccess.DAO
{
    public class OrderDAO
    {
        //Get Order List
        public static List<Order> GetAllOrder()
        {
            var listOrder = new List<Order>();
            try
            {
                using (var ctx = new HealthExpertContext())
                {
                    listOrder = ctx.orders.ToList();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return listOrder;
        }

        //Get Order by Id
        public static Order GetOrderById(Guid id)
        {
            var order = new Order();
            try
            {
                using (var ctx = new HealthExpertContext())
                {
                    order = ctx.orders.FirstOrDefault(x => x.orderId == id);
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return order;
        }

        //Add Order
        public static void AddOrder(Order order)
        {
            try
            {
                using (var ctx = new HealthExpertContext())
                {
                    ctx.orders.Add(order);
                    ctx.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        //Update Order
        public static void UpdateOrder(Guid id, Order order)
        {
            try
            {
                using (var ctx = new HealthExpertContext())
                {
                    if(GetOrderById(id) != null)
                    {
                        ctx.orders.Add(order);
                        ctx.Entry(order).State =
                            Microsoft.EntityFrameworkCore.EntityState.Modified;
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        //Delete Order
        public static void DeleteOrder(Guid id)
        {
            try
            {
                using (var ctx = new HealthExpertContext())
                {
                    if (GetOrderById(id) != null)
                    {
                        ctx.orders.Remove(GetOrderById(id));
                        ctx.SaveChanges();
                    }
                }
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
