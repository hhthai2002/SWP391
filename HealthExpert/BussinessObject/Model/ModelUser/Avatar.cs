using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BussinessObject.Model.ModelUser
{
    public class Avatar
    {
        [Key]
        public int avatarId { get; set; }
        public string? avatarName { get; set; }
        public string avatarPath { get; set; }
        public DateTime uploadDate { get; set; } = DateTime.Now;
        public bool isActive { get; set; }
        public Guid accountId { get; set; }
        [JsonIgnore]
        public virtual Account? account { get; set; }
    }
}
