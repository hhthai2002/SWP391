using BussinessObject.ContextData;
using BussinessObject.Model.ModelCourse;
using BussinessObject.Model.ModelUser;

namespace DataAccess.DAO
{
    //CourseDAO
    public class CourseDAO
    {
        public static void AddCourse(Course course)
        {
            using (var context = new HealthExpertContext())
            {
                context.courses.Add(course);
                context.SaveChanges();
            }
        }

        public static void DeleteCourse(string courseId)
        {
            using (var context = new HealthExpertContext())
            {
                var course = context.courses.Find(courseId);
                context.courses.Remove(course);
                context.SaveChanges();
            }
        }

        public static List<Course> GetCourses()
        {
            using (var context = new HealthExpertContext())
            {
                return context.courses.ToList();
            }
        }

        public static Course GetCourseById(string courseId)
        {
            using (var context = new HealthExpertContext())
            {
                return context.courses.Find(courseId);
            }
        }

        public static void UpdateCourse(Course course)
        {
            using (var context = new HealthExpertContext())
            {
                context.courses.Update(course);
                context.SaveChanges();
            }
        }

        //Add Course Manager
        public static void AddCourseManagerByEmail(string email, string courseId)
        {
            using (var context = new HealthExpertContext())
            {
                var user = context.accounts.FirstOrDefault(x => x.email == email);
                if (user != null)
                {
                    var roleId = 3; // Assuming the role id for course manager is 3
                    var courseManager = new CourseManagement
                    {
                        courseManagerId = GenerateUniqueCourseManagerId(),
                        courseId = courseId
                    };
                    courseManager.accounts = new List<Account> { user };
                    user.roleId = roleId;
                    context.courseManagements.Add(courseManager);
                    context.SaveChanges();
                }
                else
                {
                    // Handle the case where user is null
                    // For example, you might throw an exception or log an error
                    // This depends on your application's requirements
                    throw new Exception("User with email " + email + " not found.");
                }
            }
        }

        private static int GenerateUniqueCourseManagerId()
        {
            using (var context = new HealthExpertContext())
            {
                int existingCount = context.courseManagements.Count();
                return existingCount + 1;
            }
        }

        public static void AddEnrollment(Enrollment enrollment)
        {
            using (var context = new HealthExpertContext())
            {
                context.enrollments.Add(enrollment);
                context.SaveChanges();
            }
        }

        //Get List of Enrollments
        public static List<Enrollment> GetEnrollments()
        {
            using (var context = new HealthExpertContext())
            {
                return context.enrollments.ToList();
            }
        }

        //Update Enrollment
        public static void UpdateEnrollment(Enrollment enrollment)
        {
            try
            {
                using (var ctx = new HealthExpertContext())
                {
                    ctx.enrollments.Add(enrollment);
                    ctx.Entry(enrollment).State =
                        Microsoft.EntityFrameworkCore.EntityState.Modified;
                    ctx.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        //Delete Enrollment
        public static void DeleteEnrollment(Enrollment enrollment)
        {
            try
            {
                using (var ctx = new HealthExpertContext())
                {
                    ctx.enrollments.Remove(enrollment);
                    ctx.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        //Check if user already a course manager with email and courseId
        public static bool IsCourseManager(string email, string courseId)
        {
            using (var context = new HealthExpertContext())
            {
                var courseManager = context.courseManagements.FirstOrDefault(
                                       cm => cm.accounts.Any(a => a.email.Equals(email) && cm.courseId.Equals(courseId)));
                return courseManager != null;
            }
        }
    }
}