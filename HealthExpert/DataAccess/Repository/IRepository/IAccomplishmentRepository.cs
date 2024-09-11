using BussinessObject.Model.ModelUser;

namespace DataAccess.Repository.IRepository
{
    public interface IAccomplishmentRepository
    {
        List<Accomplishment> GetAccomplishmentList();
        Accomplishment GetAccomplishmentById(int id);
        void AddAccomplishment(Accomplishment accomplishment);
        void UpdateAccomplishment(Accomplishment accomplishment);
        void DeleteAccomplishment(Accomplishment accomplishment);
    }
}
