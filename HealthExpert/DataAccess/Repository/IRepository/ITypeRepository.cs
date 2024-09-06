namespace DataAccess.Repository.IRepository
{
    public interface ITypeRepository
    {
        BussinessObject.Model.ModelCourse.Type GetTypeById (string id);
        List<BussinessObject.Model.ModelCourse.Type> GetAllType();
        void AddType(BussinessObject.Model.ModelCourse.Type type);
        void UpdateType(string id, BussinessObject.Model.ModelCourse.Type type);
        void DeleteType(string id);
        BussinessObject.Model.ModelCourse.Type GetTypeByName(string name);
    }
}
