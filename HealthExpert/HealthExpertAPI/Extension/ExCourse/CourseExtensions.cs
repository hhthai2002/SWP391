using BussinessObject.Model.ModelCourse;
using HealthExpertAPI.DTO.DTOCourse;

namespace HealthExpertAPI.Extension.ExCourse
{
    public static class CourseExtensions
    {
        public static CourseDTO ToCourseDTO(this Course course)
        {
            return new CourseDTO
            {
                courseId = course.courseId,
                courseName = course.courseName,
                price = course.price,
                rating = course.rating,
                description = course.description,
                studentNumber = course.studentNumber,
                certificate = course.certificate,
                createBy = course.createBy,
                dateUpdate = course.dateUpdate,
                language = course.language,
                bmiMin = course.bmiMin,
                bmiMax = course.bmiMax,
                typeId = course.typeId
            };
        }

        public static Course ToCreateCourse(this CourseDTO courseDTO)
        {
            return new Course
            {
                courseId = courseDTO.courseId,
                courseName = courseDTO.courseName,
                price = courseDTO.price,
                rating = courseDTO.rating,
                description = courseDTO.description,
                studentNumber = 0,
                certificate = courseDTO.certificate,
                createBy = courseDTO.createBy,
                dateUpdate = courseDTO.dateUpdate,
                language = courseDTO.language,
                bmiMin = courseDTO.bmiMin,
                bmiMax = courseDTO.bmiMax,
                typeId = courseDTO.typeId
            };
        }
        public static Course ToUpdateCourse(this CourseDTOUpdate courseDTO)
        {
            return new Course
            {
                courseName = courseDTO.courseName,
                price = courseDTO.price,
                rating = courseDTO.rating,
                description = courseDTO.description,
                studentNumber = courseDTO.studentNumber,
                certificate = courseDTO.certificate,
                createBy = courseDTO.createBy,
                dateUpdate = courseDTO.dateUpdate,
                language = courseDTO.language,
                bmiMin = courseDTO.bmiMin,
                bmiMax = courseDTO.bmiMax,
                typeId = courseDTO.typeId
            };
        }
    }
}
