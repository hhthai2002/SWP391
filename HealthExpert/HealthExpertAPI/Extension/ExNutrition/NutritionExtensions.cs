using BussinessObject.Model.ModelNutrition;
using HealthExpertAPI.DTO.DTONutrition;

namespace HealthExpertAPI.Extension.ExNutrition
{
    public static class NutritionExtensions
    {
        public static NutritionDTO ToNutritionDTO(this Nutrition nutrition)
        {
            return new NutritionDTO
            {
                nutriId = nutrition.nutriId,
                sessionId = nutrition.sessionId,
                title = nutrition.title,
                description = nutrition.description,
                isActive = nutrition.isActive
            };
        }
        public static Nutrition ToNutrition(this NutritionDTO nutritionDTO)
        {
            return new Nutrition
            {
                nutriId = nutritionDTO.nutriId,
                sessionId = nutritionDTO.sessionId,
                title = nutritionDTO.title,
                description = nutritionDTO.description,
                isActive = nutritionDTO.isActive
            };
        }

        //Update Nutrition
        public static Nutrition ToUpdateNutrition(this NutritionUpdateDTO nutritionUpdateDTO)
        {
            return new Nutrition
            {
                title = nutritionUpdateDTO.title,
                description = nutritionUpdateDTO.description,
                isActive = nutritionUpdateDTO.isActive
            };
        }
    }
}
