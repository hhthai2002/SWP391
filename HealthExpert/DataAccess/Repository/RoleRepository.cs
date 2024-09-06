using BussinessObject.Model.Authen;
using DataAccess.DAO;
using DataAccess.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository
{
    public class RoleRepository : IRoleRepository
    {
        public List<Role> GetAllRoles() => RoleDAO.GetRoleList();

        public Role GetRoleById(int id) => RoleDAO.GetRoleById(id);
    }
}
