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

        public virtual DbSet<Account> Accounts { get; set; }
        public virtual DbSet<Avatar> Avatars { get; set; }
        public virtual DbSet<Photo> Photos { get; set; }
        public virtual DbSet<Accomplishment> Accomplishments { get; set; }
        public virtual DbSet<BMI> Bmis { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<Session> Sessions { get; set; }
        public virtual DbSet<Lesson> Lessons { get; set; }
        public virtual DbSet<Course> Courses { get; set; }
        public virtual DbSet<Enrollment> Enrollments { get; set; }
        public virtual DbSet<Feedback> Feedbacks { get; set; }
        public virtual DbSet<ServiceCenter> ServiceCenters { get; set; }
        public virtual DbSet<Teacher> Teachers { get; set; }
        public virtual DbSet<Model.ModelCourse.Type> Types { get; set; }
        public virtual DbSet<Course_Teacher_Mapping> GetCourse_Teacher_Mappings { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<Bill> Bills { get; set; }
        public virtual DbSet<OrderStatus> OrderStatuses { get; set; }
        public virtual DbSet<Post> Posts { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Post_Like> Post_Likes { get; set; }
        public virtual DbSet<Post_Meta> Post_Metas { get; set; }
        public virtual DbSet<Nutrition> Nutritions { get; set; }
        public virtual DbSet<CurrentProgress> CurrentProgresses { get; set; }
        public virtual DbSet<PostDetail> PostDetails { get; set; }

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

            modelBuilder.Entity<ServiceCenter>().HasKey(CourseAdmin => new { CourseAdmin.accountId, CourseAdmin.courseId });
            modelBuilder.Entity<Enrollment>().HasKey(Enrollment => new { Enrollment.accountId, Enrollment.courseId });
            modelBuilder.Entity<Feedback>().HasKey(Feedback => new { Feedback.accountId, Feedback.courseId });
            modelBuilder.Entity<Teacher>().HasKey(Teacher => new { Teacher.teacherId, Teacher.courseId });
            modelBuilder.Entity<Course_Teacher_Mapping>().HasKey(Course_Teacher_Mapping => new { Course_Teacher_Mapping.courseId, Course_Teacher_Mapping.teacherId });
            modelBuilder.Entity<Post_Category>().HasKey(Post_Category => new { Post_Category.postId, Post_Category.categoryId });

            modelBuilder.Entity<Role>().HasData(
                new Role { roleId = 1, roleName = "Administration" },
                new Role { roleId = 2, roleName = "ServiceCenter" },
                new Role { roleId = 3, roleName = "Teacher" },
                new Role { roleId = 4, roleName = "Learner" }
                );
        }
    }
}
