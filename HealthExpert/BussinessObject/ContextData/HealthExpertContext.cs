using BussinessObject.Model.Authen;
using BussinessObject.Model.ModelCourse;
using BussinessObject.Model.ModelNutrition;
using BussinessObject.Model.ModelPayment;
using BussinessObject.Model.ModelPost;
using BussinessObject.Model.ModelSession;
using BussinessObject.Model.ModelUser;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace BussinessObject.ContextData
{
    public class HealthExpertContext : DbContext
    {
        public HealthExpertContext()
        {
        }

        public virtual DbSet<Account> accounts { get; set; }
        public virtual DbSet<Avatar> avatars { get; set; }
        public virtual DbSet<Photo> photos { get; set; }
        public virtual DbSet<Accomplishment> accomplishments { get; set; }
        public virtual DbSet<BMI> bmis { get; set; }
        public virtual DbSet<Role> roles { get; set; }
        public virtual DbSet<Session> sessions { get; set; }
        public virtual DbSet<Lesson> lessons { get; set; }
        public virtual DbSet<Course> courses { get; set; }
        public virtual DbSet<Enrollment> enrollments { get; set; }
        public virtual DbSet<Feedback> feedbacks { get; set; }
        public virtual DbSet<CourseAdmin> courseAdmins { get; set; }
        public virtual DbSet<CourseManagement> courseManagements { get; set; }
        public virtual DbSet<Model.ModelCourse.Type> types { get; set; }
        public virtual DbSet<Course_CourseManager_Mapping> course_CourseManager_Mappings { get; set; }
        public virtual DbSet<Order> orders { get; set; }
        public virtual DbSet<Bill> bills { get; set; }
        public virtual DbSet<OrderStatus> orderStatuses { get; set; }
        public virtual DbSet<Post> posts { get; set; }
        public virtual DbSet<Category> categories { get; set; }
        public virtual DbSet<Post_Like> post_Likes { get; set; }
        public virtual DbSet<Post_Meta> post_Metas { get; set; }
        public virtual DbSet<Nutrition> nutritions { get; set; }
        public virtual DbSet<CurrentProgress> CurrentProgresses { get; set; }
        public virtual DbSet<PostDetail> postDetails { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            IConfiguration configuration = builder.Build();
            optionsBuilder.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Lesson>()
            .Property(l => l.viewProgress)
            .HasColumnType("decimal(18, 2)");

            modelBuilder.Entity<CourseAdmin>().HasKey(CourseAdmin => new { CourseAdmin.accountId, CourseAdmin.courseId });
            modelBuilder.Entity<Enrollment>().HasKey(Enrollment => new { Enrollment.accountId, Enrollment.courseId });
            modelBuilder.Entity<Feedback>().HasKey(Feedback => new { Feedback.accountId, Feedback.courseId });
            modelBuilder.Entity<CourseManagement>().HasKey(CourseManagement => new { CourseManagement.courseManagerId, CourseManagement.courseId });
            modelBuilder.Entity<Course_CourseManager_Mapping>().HasKey(Course_CourseManager_Mapping => new { Course_CourseManager_Mapping.courseId, Course_CourseManager_Mapping.courseManagerId });
            modelBuilder.Entity<Post_Category>().HasKey(Post_Category => new { Post_Category.postId, Post_Category.categoryId });

            modelBuilder.Entity<Role>().HasData(
                new Role { roleId = 1, roleName = "Administration" },
                new Role { roleId = 2, roleName = "CourseAdmin" },
                new Role { roleId = 3, roleName = "CourseManager" },
                new Role { roleId = 4, roleName = "Learner" }
                );

            modelBuilder.Entity<Course>().HasData(
                new Course
                {
                    courseId = "C001",
                    courseName = "Course 1",
                    price = 10,
                    rating = 5,
                    description = "This is course 1",
                    studentNumber = 100,
                    certificate = "Certificate 1",
                    createBy = "admin",
                    dateUpdate = DateTime.Now,
                    language = "English",
                    bmiMax = 20,
                    bmiMin = 10,
                    typeId = 1
                }
                );
        }
    }
}
