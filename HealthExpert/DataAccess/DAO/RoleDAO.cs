using BussinessObject.ContextData;
using BussinessObject.Model.Authen;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DAO
{
    public class RoleDAO
    {
        //Get Role List Data
        public static List<Role> GetRoleList()
        {
            var listRole = new List<Role>();
            try
            {
                using (var ctx = new HealthExpertContext())
                {
                    listRole = ctx.roles.ToList();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return listRole;
        }

        //Get Role Data by Id
        public static Role GetRoleById(int id)
        {
            var role = new Role();
            try
            {
                using (var ctx = new HealthExpertContext())
                {
                    role = ctx.roles.FirstOrDefault(role => role.roleId == id);
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return role;
        }
    }
}
