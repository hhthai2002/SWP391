using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BussinessObject.Model.ModelUser
{
    public class Photo
    {
        [Key]
        public int photoId { get; set; }
        public string? photoName { get; set; }
        public string photoPath { get; set; }
        public DateTime uploadDate { get; set; } = DateTime.Now;
        public bool isActive { get; set; }
        public Guid accountId { get; set; }
        [JsonIgnore]
        public virtual Account? account { get; set; }
    }
}
