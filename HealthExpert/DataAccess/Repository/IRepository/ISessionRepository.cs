using BussinessObject.Model.ModelSession;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository.IRepository
{
    public interface ISessionRepository
    {
        Session GetSessionById (string id);
        Session GetSessionByName (string name);
        List<Session> GetAllSession();
        void AddSession(Session session);
        void UpdateSession(string id, Session session);
        void DeleteSession(string id);
    }
}
