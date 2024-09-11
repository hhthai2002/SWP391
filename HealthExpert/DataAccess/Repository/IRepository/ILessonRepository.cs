using BussinessObject.Model.ModelSession;

namespace DataAccess.Repository.IRepository
{
    public interface ILessonRepository
    {
        List<Lesson> GetAllLesson();
        Lesson GetLessonById(string id);
        Lesson GetLessonByName(string name);
        void AddLesson(Lesson lesson);
        void UpdateLesson(string id, Lesson lesson);
        void DeleteLesson(string id);
    }
}
