using BussinessObject.ContextData;
using BussinessObject.Model.ModelSession;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DAO
{
    public class LessonDAO
    {
        //Get Lesson List
        public static List<Lesson> GetAllLesson()
        {
            var listLesson = new List<Lesson>();
            try
            {
                using (var ctx = new HealthExpertContext())
                {
                    listLesson = ctx.lessons.ToList();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return listLesson;
        }

        //Get Lesson by Id
        public static Lesson GetLessonById(string id)
        {
            var lesson = new Lesson();
            try
            {
                using (var ctx = new HealthExpertContext())
                {
                    lesson = ctx.lessons.FirstOrDefault(lesson => lesson.lessonId == id);
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return lesson;
        }

        //Get lesson by Name
        public static Lesson GetLessonByName(string name)
        {
            var lesson = new Lesson();
            try
            {
                using (var ctx = new HealthExpertContext())
                {
                    lesson = ctx.lessons.FirstOrDefault(lesson => lesson.caption == name);
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return lesson;
        }

        //Add Lesson
        public static void AddLesson(Lesson lesson)
        {
            try
            {
                using (var ctx = new HealthExpertContext())
                {
                    ctx.lessons.Add(lesson);
                    ctx.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        //Update Lesson
        public static void UpdateLesson(string id, Lesson lesson)
        {
            try
            {
                using (var ctx = new HealthExpertContext())
                {
                    if (GetLessonById(id) != null)
                    {
                        ctx.lessons.Add(lesson);
                        ctx.Entry(lesson).State =
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

        //Delete Lesson
        public static void DeleteLesson(string id)
        {
            try
            {
                using (var ctx = new HealthExpertContext())
                {
                    if (GetLessonById(id) != null)
                    {
                        ctx.lessons.Remove(GetLessonById(id));
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
