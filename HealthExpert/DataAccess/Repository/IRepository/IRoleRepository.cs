using BussinessObject.Model.Authen;

namespace DataAccess.Repository.IRepository
{
    public interface IRoleRepository
    {
        List<Role> GetAllRoles();
        Role GetRoleById(int id);
    }
}
