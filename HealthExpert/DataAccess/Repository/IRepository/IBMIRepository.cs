using BussinessObject.Model.ModelUser;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository.IRepository
{
    public interface IBMIRepository
    {
        List<BMI> GetBMI();
        BMI GetBMIById(int bmiId);
        void AddBMI(BMI bmi);
        void UpdateBMI(BMI bmi);
        void DeleteBMI(int bmiId);
    }
}
