using BussinessObject.Model.Authen;
using DataAccess.DAO;
using DataAccess.Repository.IRepository;

namespace DataAccess.Repository
{
    public class RoleRepository : IRoleRepository
    {
        public List<Role> GetAllRoles() => RoleDAO.GetRoleList();

        public Role GetRoleById(int id) => RoleDAO.GetRoleById(id);
    }
}
