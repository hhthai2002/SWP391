using BussinessObject.ContextData;
using BussinessObject.Model.ModelNutrition;

namespace DataAccess.DAO
{
    public class NutritionDAO
    {
        //Add Nutrition by sessionId
        public static void AddNutrition(string sessionId, Nutrition nutrition)
        {
            try
            {
                using (var ctx = new HealthExpertContext())
                {
                    var session = ctx.Sessions.FirstOrDefault(session => session.sessionId == sessionId);
                    session.Nutritions.Add(nutrition);
                    ctx.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        //Add Nutrition
        public static void AddNutrition(Nutrition nutrition)
        {
            try
            {
                using (var ctx = new HealthExpertContext())
                {
                    ctx.Nutritions.Add(nutrition);
                    ctx.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        //Get Nutrition By Id
        public static Nutrition GetNutritionById(string id)
        {
            var nutrition = new Nutrition();
            try
            {
                using (var ctx = new HealthExpertContext())
                {
                    nutrition = ctx.Nutritions.FirstOrDefault(nutrition => nutrition.nutriId == id);
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return nutrition;
        }

        //Get All Nutrition
        public static List<Nutrition> GetAllNutritions()
        {
            var listNutrition = new List<Nutrition>();
            try
            {
                using (var ctx = new HealthExpertContext())
                {
                    listNutrition = ctx.Nutritions.ToList();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return listNutrition;
        }

        //Get Nutrition by Nutrition Title
        public static Nutrition GetNutritionByTitle(string name)
        {
            var nutrition = new Nutrition();
            try
            {
                using (var ctx = new HealthExpertContext())
                {
                    nutrition = ctx.Nutritions.FirstOrDefault(nutrition => nutrition.title == name);
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return nutrition;
        }

        //Remove Nutrition
        public static void DeleteNutrition(string id)
        {
            try
            {
                using (var ctx = new HealthExpertContext())
                {
                    var nutrition = ctx.Nutritions.FirstOrDefault(nutrition => nutrition.nutriId == id);
                    nutrition.isActive = false;
                    ctx.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        //Update Nutrition
        public static void UpdateNutrition(string id, Nutrition nutrition)
        {
            try
            {
                using (var ctx = new HealthExpertContext())
                {
                    var nutritionToUpdate = ctx.Nutritions.FirstOrDefault(nutrition => nutrition.nutriId == id);
                    nutritionToUpdate.title = nutrition.title;
                    nutritionToUpdate.description = nutrition.description;
                    nutritionToUpdate.isActive = nutrition.isActive;
                    ctx.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
