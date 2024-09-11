using BussinessObject.Model.ModelSession;

namespace DataAccess.Repository.IRepository
{
    public interface ISessionRepository
    {
        Session GetSessionById(string id);
        Session GetSessionByName(string name);
        List<Session> GetAllSession();
        void AddSession(Session session);
        void UpdateSession(string id, Session session);
        void DeleteSession(string id);
    }
}
