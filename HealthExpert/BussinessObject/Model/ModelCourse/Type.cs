using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessObject.Model.ModelCourse
{
    public class Type
    {
        [Key] public string typeId { get; set; }
        [Required] public string typeName { get; set; }
        [Required] public string typeDescription { get; set; }
    }
}
