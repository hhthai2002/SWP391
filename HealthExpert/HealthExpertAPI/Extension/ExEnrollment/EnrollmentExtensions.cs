using BussinessObject.Model.ModelCourse;
using HealthExpertAPI.DTO.DTOEnrollment;

namespace HealthExpertAPI.Extension.ExEnrollment
{
    public static class EnrollmentExtensions

    {
        public static EnrollmentDTO ToEnrollmentDTO(this Enrollment enrollment)
        {
            return new EnrollmentDTO
            {
                accountId = enrollment.accountId,
                courseId = enrollment.courseId,
                enrollDate = enrollment.enrollDate,
                enrollStatus = enrollment.enrollStatus
            };
        }

        public static Enrollment ToEnrollment(this EnrollmentDTO enrollmentDTO)
        {
            return new Enrollment
            {
                accountId = enrollmentDTO.accountId,
                courseId = enrollmentDTO.courseId,
                enrollDate = enrollmentDTO.enrollDate,
                enrollStatus = enrollmentDTO.enrollStatus
            };
        }

        public static EnrollmentDTOUpdate ToEnrollmentDTOUpdate(this Enrollment enrollment)
        {
            return new EnrollmentDTOUpdate
            {
                enrollStatus = enrollment.enrollStatus,
                dateUpdate = enrollment.enrollDate
            };
        }
    }
}
