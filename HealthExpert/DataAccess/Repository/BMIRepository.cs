using BussinessObject.Model.ModelUser;
using DataAccess.DAO;
using DataAccess.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository
{
    public class BMIRepository : IBMIRepository
    {
        //create AddBMI using new variable weight and height to culculate bmiValue
        public void AddBMI(BMI bmi)
        {
            bmi.bmiValue = bmi.weight / (bmi.height * bmi.height);
            if (bmi.bmiValue < 18.5)
            {
                bmi.bmiStatus = "Underweight";
            }
            else if (bmi.bmiValue >= 18.5 && bmi.bmiValue <= 24.9)
            {
                bmi.bmiStatus = "Normal";
            }
            else if (bmi.bmiValue >= 25 && bmi.bmiValue <= 29.9)
            {
                bmi.bmiStatus = "Overweight";
            }
            else
            {
                bmi.bmiStatus = "Obese";
            }
            BMIDao.AddBMI(bmi);
        }

        public void DeleteBMI(int bmiId)
        {
            BMIDao.DeleteBMI(bmiId);
        }

        public List<BMI> GetBMI()
        {
            return BMIDao.GetBMI();
        }

        public BMI GetBMIById(int bmiId)
        {
            return BMIDao.GetBMIById(bmiId);
        }

        public void UpdateBMI(BMI updatedBMI)
        {
            // Retrieve the BMI record you want to update
            BMI existingBMI = BMIDao.GetBMIById(updatedBMI.bmiId);

            if (existingBMI != null)
            {
                // Update the necessary fields of the existing BMI record
                existingBMI.weight = updatedBMI.weight;
                existingBMI.height = updatedBMI.height;

                // Recalculate BMI value and status
                existingBMI.bmiValue = existingBMI.weight / (existingBMI.height * existingBMI.height);
                if (existingBMI.bmiValue < 18.5)
                {
                    existingBMI.bmiStatus = "Underweight";
                }
                else if (existingBMI.bmiValue >= 18.5 && existingBMI.bmiValue <= 24.9)
                {
                    existingBMI.bmiStatus = "Normal";
                }
                else if (existingBMI.bmiValue >= 25 && existingBMI.bmiValue <= 29.9)
                {
                    existingBMI.bmiStatus = "Overweight";
                }
                else
                {
                    existingBMI.bmiStatus = "Obese";
                }

                // Update the BMI record in the data store
                BMIDao.UpdateBMI(existingBMI);
            }
            else
            {
                throw new Exception("BMI record with the specified ID doesn't exist.");
            }
        }

    }
}
