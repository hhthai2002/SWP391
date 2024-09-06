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
    public class LessonRepository : ILessonRepository
    {
        public void AddLesson(Lesson lesson) => LessonDAO.AddLesson(lesson);

        public void DeleteLesson(string id) => LessonDAO.DeleteLesson(id);

        public List<Lesson> GetAllLesson() => LessonDAO.GetAllLesson();

        public Lesson GetLessonById(string id) => LessonDAO.GetLessonById(id);

        public Lesson GetLessonByName(string name) => LessonDAO.GetLessonByName(name);

        public void UpdateLesson(string id, Lesson lesson) => LessonDAO.UpdateLesson(id, lesson);
    }
}
