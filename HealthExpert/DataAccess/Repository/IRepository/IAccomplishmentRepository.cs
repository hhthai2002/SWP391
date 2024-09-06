using BussinessObject.Model.ModelUser;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository.IRepository
{
    public interface IAccomplishmentRepository
    {
        List<Accomplishment> GetAccomplishmentList();
        Accomplishment GetAccomplishmentById(int id);
        void AddAccomplishment(Accomplishment accomplishment);
        void UpdateAccomplishment(Accomplishment accomplishment);
        void DeleteAccomplishment(Accomplishment accomplishment);
    }
}
