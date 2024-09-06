using BussinessObject.Model.ModelUser;
using DataAccess.DAO;
using DataAccess.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository
{
    public class AccomplishmentRepository : IAccomplishmentRepository
    {
        public void AddAccomplishment(Accomplishment accomplishment) => AccomplishmentDAO.AddAccomplishment(accomplishment);

        public void DeleteAccomplishment(Accomplishment accomplishment) => AccomplishmentDAO.DeleteAccomplishment(accomplishment);

        public Accomplishment GetAccomplishmentById(int id) => AccomplishmentDAO.GetAccomplishmentById(id);

        public List<Accomplishment> GetAccomplishmentList() => AccomplishmentDAO.GetAccomplishment();

        public void UpdateAccomplishment(Accomplishment accomplishment) => AccomplishmentDAO.UpdateAccomplishment(accomplishment);
    }
}
