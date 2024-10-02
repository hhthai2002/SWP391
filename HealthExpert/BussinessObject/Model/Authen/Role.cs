using BussinessObject.Model.ModelUser;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BussinessObject.Model.Authen
{
    public class Role
    {
        [Key]
        public int roleId { get; set; }
        [Required] public string roleName { get; set; }

        [JsonIgnore]
        public virtual ICollection<Account> Account { get; set; }
    }
}
