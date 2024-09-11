using System.ComponentModel.DataAnnotations;

namespace BussinessObject.Model.ModelCourse
{
    public class Type
    {
        [Key] public string typeId { get; set; }
        [Required] public string typeName { get; set; }
        [Required] public string typeDescription { get; set; }
    }
}
