using BussinessObject.ContextData;

namespace DataAccess.DAO
{
    public class TypeDAO
    {
        //Get Type List Data
        public static List<BussinessObject.Model.ModelCourse.Type> GetTypeList()
        {
            var listTypers = new List<BussinessObject.Model.ModelCourse.Type>();
            try
            {
                using (var ctx = new HealthExpertContext())
                {
                    listTypers = ctx.types.ToList();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return listTypers;
        }

        //Get Type by Id
        public static BussinessObject.Model.ModelCourse.Type GetTypeById(string id)
        {
            var type = new BussinessObject.Model.ModelCourse.Type();
            try
            {
                using (var ctx = new HealthExpertContext())
                {
                    type = ctx.types.FirstOrDefault(type => type.typeId == id);
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return type;
        }

        //Get Type by Type name
        public static BussinessObject.Model.ModelCourse.Type GetTypeByName(string name)
        {
            var type = new BussinessObject.Model.ModelCourse.Type();
            try
            {
                using (var ctx = new HealthExpertContext())
                {
                    type = ctx.types.FirstOrDefault(type => type.typeName == name);
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return type;
        }

        //Add Type
        public static void AddType(BussinessObject.Model.ModelCourse.Type type)
        {
            try
            {
                using (var ctx = new HealthExpertContext())
                {
                    ctx.types.Add(type);
                    ctx.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        //Update Type
        public static void UpdateType(string id, BussinessObject.Model.ModelCourse.Type type)
        {
            try
            {
                if (GetTypeById(id) != null)
                {
                    using (var ctx = new HealthExpertContext())
                    {
                        ctx.types.Add(type);
                        ctx.Entry(type).State =
                            Microsoft.EntityFrameworkCore.EntityState.Modified;
                        ctx.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        //Delete Type
        public static void DeleteType(string id)
        {
            try
            {
                using (var ctx = new HealthExpertContext())
                {
                    if (GetTypeById(id) != null)
                    {
                        ctx.types.Remove(GetTypeById(id));
                        ctx.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
