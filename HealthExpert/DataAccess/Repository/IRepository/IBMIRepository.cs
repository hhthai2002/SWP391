using BussinessObject.Model.ModelUser;

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
