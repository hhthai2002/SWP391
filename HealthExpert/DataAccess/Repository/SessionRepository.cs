using BussinessObject.Model.ModelSession;
using DataAccess.DAO;
using DataAccess.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository
{
    public class SessionRepository : ISessionRepository
    {
        public void AddSession(Session session) => SessionDAO.AddSession(session);

        public void DeleteSession(string id) => SessionDAO.DeleteSession(id);

        public List<Session> GetAllSession() => SessionDAO.GetAllSession();

        public Session GetSessionById(string id) => SessionDAO.GetSessionById(id);

        public Session GetSessionByName(string name) => SessionDAO.GetSessionByName(name);

        public void UpdateSession(string id, Session session) => SessionDAO.UpdateSession(id, session);
    }
}
