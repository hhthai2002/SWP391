using BussinessObject.ContextData;
using BussinessObject.Model.ModelSession;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DAO
{
    public class SessionDAO
    {
        //Get Session By Id
        public static Session GetSessionById(string id)
        {
            var session = new Session();
            try
            {
                using (var ctx = new HealthExpertContext())
                {
                    session = ctx.sessions.FirstOrDefault(session => session.sessionId == id);
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return session;
        }

        //Get All Session
        public static List<Session> GetAllSession()
        {
            var listSession = new List<Session>();
            try
            {
                using (var ctx = new HealthExpertContext())
                {
                    listSession = ctx.sessions.ToList();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return listSession;
        }

        //Get Session by Session Name
        public static Session GetSessionByName(string name)
        {
            var session = new Session();
            try
            {
                using (var ctx = new HealthExpertContext())
                {
                    session = ctx.sessions.FirstOrDefault(session => session.sessionName == name);
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return session;
        }

        //Add Session
        public static void AddSession(Session session)
        {
            try
            {
                using (var ctx = new HealthExpertContext())
                {
                    ctx.sessions.Add(session);
                    ctx.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        //Update Session
        public static void UpdateSession(string id, Session session)
        {
            try
            {
                using (var ctx = new HealthExpertContext())
                {
                    if (GetSessionById(id) != null)
                    {
                        ctx.sessions.Add(session);
                        ctx.Entry(session).State =
                            Microsoft.EntityFrameworkCore.EntityState.Modified;
                        ctx.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        //Delete Session
        public static void DeleteSession(string id)
        {
            try
            {
                using (var ctx = new HealthExpertContext())
                {
                    if (GetSessionById(id) != null)
                    {
                        ctx.sessions.Remove(GetSessionById(id));
                        ctx.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}