using DataAccess.DAO;
using DataAccess.Repository.IRepository;

namespace DataAccess.Repository
{
    public class TypeRepository : ITypeRepository
    {
        public void AddType(BussinessObject.Model.ModelCourse.Type type) => TypeDAO.AddType(type);

        public void DeleteType(string id) => TypeDAO.DeleteType(id);

        public List<BussinessObject.Model.ModelCourse.Type> GetAllType() => TypeDAO.GetTypeList();

        public BussinessObject.Model.ModelCourse.Type GetTypeById(string id) => TypeDAO.GetTypeById(id);

        public BussinessObject.Model.ModelCourse.Type GetTypeByName(string name) => TypeDAO.GetTypeByName(name);

        public void UpdateType(string id, BussinessObject.Model.ModelCourse.Type type) => TypeDAO.UpdateType(id, type);
    }
}
