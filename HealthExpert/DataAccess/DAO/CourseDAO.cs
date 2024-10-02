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
                context.Courses.Add(course);
                context.SaveChanges();
            }
        }

        public static void DeleteCourse(string courseId)
        {
            using (var context = new HealthExpertContext())
            {
                var course = context.Courses.Find(courseId);
                context.Courses.Remove(course);
                context.SaveChanges();
            }
        }

        public static List<Course> GetCourses()
        {
            using (var context = new HealthExpertContext())
            {
                return context.Courses.ToList();
            }
        }

        public static Course GetCourseById(string courseId)
        {
            using (var context = new HealthExpertContext())
            {
                return context.Courses.Find(courseId);
            }
        }

        public static void UpdateCourse(Course course)
        {
            using (var context = new HealthExpertContext())
            {
                context.Courses.Update(course);
                context.SaveChanges();
            }
        }

        //Add Course Manager
        public static void AddCourseManagerByEmail(string email, string courseId)
        {
            using (var context = new HealthExpertContext())
            {
                var user = context.Accounts.FirstOrDefault(x => x.email == email);
                if (user != null)
                {
                    var roleId = 3; // Assuming the role id for course manager is 3
                    var courseManager = new Teacher
                    {
                        teacherId = GenerateUniqueCourseManagerId(),
                        courseId = courseId
                    };
                    courseManager.Accounts = new List<Account> { user };
                    user.roleId = roleId;
                    context.Teachers.Add(courseManager);
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
                int existingCount = context.Teachers.Count();
                return existingCount + 1;
            }
        }

        public static void AddEnrollment(Enrollment enrollment)
        {
            using (var context = new HealthExpertContext())
            {
                context.Enrollments.Add(enrollment);
                context.SaveChanges();
            }
        }

        //Get List of Enrollments
        public static List<Enrollment> GetEnrollments()
        {
            using (var context = new HealthExpertContext())
            {
                return context.Enrollments.ToList();
            }
        }

        //Update Enrollment
        public static void UpdateEnrollment(Enrollment enrollment)
        {
            try
            {
                using (var ctx = new HealthExpertContext())
                {
                    ctx.Enrollments.Add(enrollment);
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
                    ctx.Enrollments.Remove(enrollment);
                    ctx.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        //Check if user already a course manager with email and courseId
        public static bool IsTeacher(string email, string courseId)
        {
            using (var context = new HealthExpertContext())
            {
                var teacher = context.Teachers.FirstOrDefault(
                                       cm => cm.Accounts.Any(a => a.email.Equals(email) && cm.courseId.Equals(courseId)));
                return teacher != null;
            }
        }
    }
}