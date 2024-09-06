using BussinessObject.Model.ModelUser;
using HealthExpertAPI.DTO.DTOAccount;
using HealthExpertAPI.DTO.DTOBMI;
using Microsoft.Identity.Client;

namespace HealthExpertAPI.Extension.ExBMI
{
    public static class BMIExtensions
    {
        public static BMIDTO ToBMIDTO(this BMI bmi)
        {
            return new BMIDTO
            {
                bmiId = bmi.bmiId,
                weight = bmi.weight,
                height = bmi.height,
                bmiValue = bmi.bmiValue,
                bmiStatus = bmi.bmiStatus,
                createDate = bmi.bmiDate,
                accountId = bmi.accountId
            };
        }

        public static BMI ToRegisterBMI(this BMIDTO bmiDTO)
        {
            return new BMI
            {
                bmiId = bmiDTO.bmiId,
                weight = bmiDTO.weight,
                height = bmiDTO.height,
                bmiValue = bmiDTO.bmiValue,
                bmiStatus = bmiDTO.bmiStatus,
                bmiDate = bmiDTO.createDate,
                accountId = bmiDTO.accountId
            };
        }

        public static BMI ToUpdateBMI(this BMIDTOUpdate bmiDTO)
        {
            return new BMI
            {
                weight = bmiDTO.weight,
                height = bmiDTO.height,
                bmiValue = bmiDTO.bmiValue,
                bmiStatus = bmiDTO.bmiStatus,
                bmiDate = bmiDTO.createDate,
            };
        }

    }
}
