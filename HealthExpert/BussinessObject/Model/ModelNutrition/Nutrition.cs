using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BussinessObject.Model.ModelSession;

namespace BussinessObject.Model.ModelNutrition
{
    public class Nutrition
    {
        [Key]
        public string nutriId { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public bool isActive { get; set; }
        public string sessionId { get; set; }
        public virtual ICollection<Session> Sessions { get; set; }

    }
}
