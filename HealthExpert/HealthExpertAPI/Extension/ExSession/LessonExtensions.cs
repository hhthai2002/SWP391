using BussinessObject.Model.ModelSession;
using HealthExpertAPI.DTO.DTOLesson;

namespace HealthExpertAPI.Extension.ExSession
{
    public static class LessonExtensions
    {
        public static LessonDTO ToLessonDTO(this Lesson lesson)
        {
            return new LessonDTO
            {
                lessonId = lesson.lessonId,
                videoFile = lesson.videoFile,
                caption = lesson.caption,
                cover = lesson.cover,
                sessionId = lesson.sessionId,
                isActive = lesson.isActive 
            };
        }

        public static Lesson ToLessonUpdate(this LessonUpdateDTO lessonUpdateDTO)
        {
            return new Lesson
            {
                caption = lessonUpdateDTO.caption,
                cover = lessonUpdateDTO.cover,
                isActive = lessonUpdateDTO.isActive
            };
        }
    }
}
