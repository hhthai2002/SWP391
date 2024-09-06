using BussinessObject.Model.ModelUser;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BussinessObject.Model.Authen
{
    public class Role
    {
        [Key]
        public int roleId { get; set; }
        [Required] public string roleName {  get; set; }

        [JsonIgnore]
        public virtual ICollection<Account> account { get; set; }
    }
}
