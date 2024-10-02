using BussinessObject.ContextData;
using BussinessObject.Model.Authen;

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
                    listRole = ctx.Roles.ToList();
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
                    role = ctx.Roles.FirstOrDefault(role => role.roleId == id);
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
