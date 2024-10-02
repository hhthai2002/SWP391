using BussinessObject.ContextData;
using BussinessObject.Model.ModelUser;

namespace DataAccess.DAO
{
    //Create BMIDao
    public class BMIDao
    {
        public static void AddBMI(BMI bmi)
        {
            using (var context = new HealthExpertContext())
            {
                context.Bmis.Add(bmi);
                context.SaveChanges();
            }
        }

        public static void DeleteBMI(int bmiId)
        {
            using (var context = new HealthExpertContext())
            {
                var bmi = context.Bmis.Find(bmiId);
                context.Bmis.Remove(bmi);
                context.SaveChanges();
            }
        }

        public static List<BMI> GetBMI()
        {
            using (var context = new HealthExpertContext())
            {
                return context.Bmis.ToList();
            }
        }

        public static BMI GetBMIById(int bmiId)
        {
            using (var context = new HealthExpertContext())
            {
                return context.Bmis.Find(bmiId);
            }
        }

        public static void UpdateBMI(BMI bmi)
        {
            using (var context = new HealthExpertContext())
            {
                context.Bmis.Update(bmi);
                context.SaveChanges();
            }
        }
    }
}
