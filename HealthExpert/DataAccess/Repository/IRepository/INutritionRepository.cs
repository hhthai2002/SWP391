using BussinessObject.Model.ModelNutrition;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository.IRepository
{
    public interface INutritionRepository
    {
        void AddNutrition(Nutrition nutrition);
        void UpdateNutrition(string id, Nutrition nutrition);
        void DeleteNutrition(string id);
        List<Nutrition> GetAllNutritions();
        Nutrition GetNutritionById(string id);
        Nutrition GetNutritionByTitle(string title);
        void CreateNutritionBySessonId(Nutrition nutrition);
    }
}
