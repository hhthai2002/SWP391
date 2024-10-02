using BussinessObject.Model.ModelCourse;
using HealthExpertAPI.DTO.DTOCourse;

namespace HealthExpertAPI.Extension.ExCourse
{
    public static class TeacherExtensions
    {
        public static TeacherDTO ToTeacherDTO(this Teacher teacher)
        {
            if (teacher == null)
            {
                return null;
            }

            var dto = new TeacherDTO
            {
                teacherId = teacher.teacherId,
                courseId = teacher.courseId
            };

            // Get the teacher's accountEmails by using teacherId
            if (teacher.Accounts != null)
            {
                dto.accountEmails = teacher.Accounts.Select(a => a.email).ToList();
            }

            return dto;
        }

        public static Teacher ToCreateTeacher(this TeacherDTO teacherDTO)
        {
            return new Teacher
            {
                teacherId = teacherDTO.teacherId,
                courseId = teacherDTO.courseId
            };
        }
    }
}
