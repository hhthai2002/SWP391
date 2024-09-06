using BussinessObject.ContextData;
using BussinessObject.Model.ModelUser;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DAO
{
    //Create BMIDao
    public class BMIDao
    {
        public static void AddBMI(BMI bmi)
        {
            using (var context = new HealthExpertContext())
            {
                context.bmis.Add(bmi);
                context.SaveChanges();
            }
        }

        public static void DeleteBMI(int bmiId)
        {
            using (var context = new HealthExpertContext())
            {
                var bmi = context.bmis.Find(bmiId);
                context.bmis.Remove(bmi);
                context.SaveChanges();
            }
        }

        public static List<BMI> GetBMI()
        {
            using (var context = new HealthExpertContext())
            {
                return context.bmis.ToList();
            }
        }

        public static BMI GetBMIById(int bmiId)
        {
            using (var context = new HealthExpertContext())
            {
                return context.bmis.Find(bmiId);
            }
        }

        public static void UpdateBMI(BMI bmi)
        {
            using (var context = new HealthExpertContext())
            {
                context.bmis.Update(bmi);
                context.SaveChanges();
            }
        }
    }
}
