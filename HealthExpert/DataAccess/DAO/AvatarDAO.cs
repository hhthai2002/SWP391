using BussinessObject.ContextData;
using BussinessObject.Model.ModelUser;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DAO
{
    public class AvatarDAO
    {
        //Add Avatar
        public void AddAvatar(Avatar avatar)
        {
            using (var context = new HealthExpertContext())
            {
                context.avatars.Add(avatar);
                context.SaveChanges();
            }
        }
        //update Avatar
        public void UpdateAvatar(Avatar avatar)
        {
            using (var context = new HealthExpertContext())
            {
                var result = context.avatars.SingleOrDefault(x => x.avatarId == avatar.avatarId);
                if (result != null)
                {
                    context.Entry<Avatar>(result).State =
                        Microsoft.EntityFrameworkCore.EntityState.Modified;
                    context.SaveChanges();
                }
            }
        }

        //Delete Avatar
        public void DeleteAvatar(int avatarId)
        {
            using (var context = new HealthExpertContext())
            {
                var result = context.avatars.SingleOrDefault(x => x.avatarId == avatarId);
                if (result != null)
                {
                    context.avatars.Remove(result);
                    context.SaveChanges();
                }
            }
        }
    }
}
