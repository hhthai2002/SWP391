using AutoMapper;
using BussinessObject.ContextData;
using BussinessObject.Model.ModelCourse;
using DataAccess.Repository;
using DataAccess.Repository.IRepository;
using HealthExpertAPI.DTO.DTOAccount;
using HealthExpertAPI.DTO.DTOCourse;
using HealthExpertAPI.DTO.DTOEnrollment;
using HealthExpertAPI.Extension.ExCourse;
using HealthExpertAPI.Extension.ExEnrollment;
using HealthExpertAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HealthExpertAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly HealthExpertContext _context = new HealthExpertContext();
        private readonly HealthServices service = new HealthServices();
        private readonly ICourseRepository _repository = new CourseRepository();
        private readonly IBillRepository _billRepository = new BillRepository();

        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public CourseController(IConfiguration configuration, IMapper mapper, HealthExpertContext context)
        {
            _configuration = configuration;
            _mapper = mapper;
            _context = context;
        }

        //Create Course
        [HttpPost]
        [AllowAnonymous]
        public IActionResult CreateCourse(CourseDTO courseDTO)
        {
            if (_context.Courses.Any(c => c.courseName == courseDTO.courseName))
            {
                return BadRequest("Course Exist!!");
            }

            Course course = courseDTO.ToCreateCourse();
            _repository.AddCourse(course);
            return Ok();
        }

        //Get Courses
        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetCourses()
        {
            var Courses = _repository.GetCourses();
            return Ok(Courses);
        }

        //Get Course by Id
        [HttpGet("{courseId}")]
        [AllowAnonymous]
        public IActionResult GetCourseById(string courseId)
        {
            var course = _repository.GetCourseById(courseId);
            if (course == null)
            {
                return BadRequest("Course not found!!");
            }
            return Ok(course);
        }

        //Add Teachers to Course
        [HttpPost("add-teacher")]
        [AllowAnonymous]
        public IActionResult AddTeachers(List<TeacherDTO> courseTeachers)
        {
            try
            {
                if (courseTeachers == null)
                {
                    return BadRequest("No course teachers provided.");
                }

                List<string> messages = new List<string>();

                foreach (var teacher in courseTeachers)
                {
                    if (teacher.accountEmails == null)
                    {
                        messages.Add($"No account emails provided for course teacher with courseId {teacher.courseId}");
                        continue;
                    }

                    var course = _context.Courses.Find(teacher.courseId);
                    if (course == null)
                    {
                        messages.Add($"Course with ID {teacher.courseId} not found!!");
                        continue;
                    }

                    // Check if the course already has a teacher
                    var existingTeacher = _context.Teachers
                        .Include(cm => cm.Accounts)
                        .FirstOrDefault(cm => cm.courseId == teacher.courseId);

                    if (existingTeacher != null)
                    {
                        messages.Add($"Course with ID {teacher.courseId} already has a teacher!");
                        continue;
                    }

                    bool teacherFound = false; // Flag to track if teacher is found

                    foreach (var email in teacher.accountEmails)
                    {
                        var user = _context.Accounts.FirstOrDefault(x => x.email.Equals(email));
                        if (user == null)
                        {
                            messages.Add($"User with email {email} not found!!");
                            continue;
                        }

                        // Check if user has roleId == 4
                        if (user.roleId != 4)
                        {
                            messages.Add($"User with email {email} is not a normal User!!");
                            continue;
                        }

                        // Check if user is already a course teacher for another course
                        var isTeacherForOtherCourse = _repository.IsTeacher(email, teacher.courseId);
                        if (isTeacherForOtherCourse)
                        {
                            messages.Add($"User with email {email} is already a Course Teacher for another course.");
                            continue;
                        }

                        _repository.AddTeacherByEmail(email, teacher.courseId);
                        messages.Add($"User with email {email} added as a Course Teacher for course {teacher.courseId}");
                        teacherFound = true; // Set flag to true if teacher is found
                        break; // Exit loop since teacher is found
                    }

                    if (!teacherFound)
                    {
                        messages.Add($"No suitable user found to be a Course Teacher for course {teacher.courseId}");
                    }
                }

                return Ok(messages);
            }
            catch (Exception ex)
            {
                return BadRequest("Failed to add course teachers: " + ex.Message);
            }
        }


        //Update Course
        [HttpPut("{courseId}")]
        [AllowAnonymous]
        public IActionResult UpdateCourse(string courseId, CourseDTOUpdate courseDTO)
        {
            var existingCourse = _repository.GetCourseById(courseId);
            if (existingCourse == null)
            {
                return NotFound("Course not found!!");
            }

            // Update properties of existingCourse with values from courseDTO
            Course updateCourse = courseDTO.ToUpdateCourse();
            updateCourse.courseId = courseId;
            _repository.UpdateCourse(updateCourse);
            return Ok();
        }


        //Delete Course
        [HttpDelete("{courseId}")]
        [AllowAnonymous]
        public IActionResult DeleteCourse(string courseId)
        {
            var course = _repository.GetCourseById(courseId);
            if (course == null)
            {
                return NotFound("Course not found!!");
            }

            _repository.DeleteCourse(courseId);
            return Ok();
        }

        //Get Course Teachers by CourseId
        [HttpGet("teachers/{courseId}")]
        [AllowAnonymous]
        public IActionResult GetTeachers(string courseId)
        {
            var course = _repository.GetCourseById(courseId);
            if (course == null)
            {
                return NotFound("Course not found!!");
            }

            var courseTeachers = _context.Teachers
                .Include(cm => cm.Accounts) // Ensure Accounts are included
                .Where(c => c.courseId == courseId)
                .Select(c => c.ToTeacherDTO())
                .ToList();

            var courseDTO = new CourseWithTeachersDTO
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
                typeId = course.typeId,

                teachers = courseTeachers
            };

            return Ok(courseDTO);
        }


        //Get Course Teachers by Email
        [HttpGet("teachers/email/{email}")]
        [AllowAnonymous]
        public IActionResult GetTeachersByEmail(string email)
        {
            var user = _context.Accounts.FirstOrDefault(x => x.email.Equals(email));
            if (user == null)
            {
                return NotFound($"User with email {email} not found!!");
            }

            var courseTeachers = _context.Teachers;
            return Ok(courseTeachers);
        }

        //Delete Course Teacher by Email
        [HttpDelete("teachers/email/{email}")]
        [AllowAnonymous]
        public IActionResult DeleteTeacherByEmail(string email)
        {
            var user = _context.Accounts.FirstOrDefault(x => x.email.Equals(email));
            if (user == null)
            {
                return NotFound($"User with email {email} not found!!");
            }

            var courseTeachers = _context.Teachers.Where(
                cm => cm.Accounts.Any(a => a.email.Equals(email))).ToList();
            if (courseTeachers == null)
            {
                return NotFound($"User with email {email} is not a course teacher!!");
            }

            foreach (var courseTeacher in courseTeachers)
            {
                _context.Teachers.Remove(courseTeacher);
            }
            user.roleId = 4; // Assuming the role id for user is 4
            _context.SaveChanges();
            return Ok();
        }


        //Enroll in course by accountId and courseId
        [HttpPost("enroll/{accountId}/{courseId}")]
        [AllowAnonymous]
        public IActionResult EnrollInCourse(Guid accountId, string courseId)
        {
            var course = _context.Courses.Find(courseId);
            if (course == null)
            {
                return BadRequest("Course not found!!");
            }

            var user = _context.Accounts.Find(accountId);
            if (user == null)
            {
                return BadRequest("User not found!!");
            }

            var enrollment = _context.Enrollments.FirstOrDefault(e => e.accountId == accountId && e.courseId == courseId);
            if (enrollment != null)
            {
                return BadRequest("User is already enrolled in this course!!");
            }

            var newEnrollment = new Enrollment
            {
                accountId = accountId,
                courseId = courseId,
                enrollDate = DateTime.Now,
                enrollStatus = true
            };

            _context.Enrollments.Add(newEnrollment);
            _context.SaveChanges();
            return Ok();
        }

        //Get List of Enrollments
        [HttpGet("Enrollments")]
        [AllowAnonymous]
        public IActionResult GetEnrollments()
        {
            var Enrollments = _repository.GetEnrollments().Select(Enrollments => Enrollments.ToEnrollmentDTO());
            return Ok(Enrollments);
        }

        //Update enrollStatus of Enrollment by accountId and courseId
        [HttpPut("Enrollments/{accountId}/{courseId}")]
        [AllowAnonymous]
        public IActionResult UpdateEnrollStatus(Guid accountId, string courseId, EnrollmentDTOUpdate enrollmentDTO)
        {
            var enrollment = _context.Enrollments.FirstOrDefault(e => e.accountId == accountId && e.courseId == courseId);
            if (enrollment == null)
            {
                return NotFound("Enrollment not found!!");
            }

            enrollment.enrollStatus = enrollmentDTO.enrollStatus;
            _context.SaveChanges();
            return Ok();
        }

        //Get courseId by orderId
        [HttpGet("order/{orderId}")]
        [AllowAnonymous]
        public IActionResult GetCourseIdByOrderId(Guid orderId)
        {
            var order = _context.Orders.FirstOrDefault(c => c.orderId == orderId);
            if (order == null)
            {
                return NotFound("Course not found!!");
            }
            return Ok(order.courseId);
        }

        [HttpPost("increase-student-number/{courseId}")]
        [AllowAnonymous]
        public IActionResult IncreaseStudentNumber(string courseId)
        {
            var course = _context.Courses.Find(courseId);
            if (course == null)
            {
                return NotFound("Course not found!!");
            }

            // Kiểm tra xem có enrollment mới nào được tạo ra không
            var newEnrollment = _context.Enrollments.Any(e => e.courseId == courseId && e.enrollStatus);

            if (newEnrollment)
            {
                // Tăng giá trị studentNumber lên một
                course.studentNumber++;

                // Lưu các thay đổi vào cơ sở dữ liệu
                _context.SaveChanges();

                return Ok("Student number increased successfully.");
            }
            else
            {
                return BadRequest("No new Enrollments found for this course.");
            }
        }

        [HttpGet("count-student-number/{courseId}")]
        [AllowAnonymous]
        public IActionResult CountStudentNumber(string courseId)
        {
            var course = _context.Courses.Find(courseId);
            if (course == null)
            {
                return NotFound("Course not found!!");
            }

            // Đếm số lượng Enrollments cho khóa học này
            var enrollmentCount = _context.Enrollments.Count(e => e.courseId == courseId && e.enrollStatus);

            return Ok(enrollmentCount);
        }

        // Get Course Name by Id
        [HttpGet("name/{courseId}")]
        [AllowAnonymous]
        public IActionResult GetCourseNameById(string courseId)
        {
            var course = _repository.GetCourseById(courseId);
            if (course == null)
            {
                return NotFound("Course not found!!");
            }

            return Ok(course.courseName);
        }

        [HttpGet("{courseId}/users")]
        [AllowAnonymous]
        public IActionResult GetUsersInCourse(string courseId)
        {
            try
            {
                var course = _repository.GetCourseById(courseId);
                if (course == null)
                {
                    return NotFound("Course not found!!");
                }

                var usersInCourse = _context.Enrollments
                    .Where(e => e.courseId == courseId && e.enrollStatus)
                    .Select(e => new
                    {
                        accountId = e.accountId,
                        enrollDate = e.enrollDate
                    })
                    .ToList();

                var userDetails = _context.Accounts
                    .Where(a => usersInCourse.Select(u => u.accountId).Contains(a.accountId))
                    .Select(a => new
                    {
                        accountId = a.accountId,
                        userName = a.userName,
                        email = a.email
                    })
                    .ToList();

                var usersWithEnrollDate = userDetails.Select(u => new
                {
                    userName = u.userName,
                    email = u.email,
                    enrollDate = usersInCourse.FirstOrDefault(e => e.accountId == u.accountId)?.enrollDate
                }).ToList();

                return Ok(usersWithEnrollDate);
            }
            catch (Exception ex)
            {
                return BadRequest("Failed to retrieve users in course: " + ex.Message);
            }
        }

        ////Get Current Progress
        //[HttpGet("current-progress/{accountId}")]
        //public async Task<IActionResult> GetCurrentProgress(Guid accountId)
        //{
        //    var account = await _context.Accounts.FindAsync(accountId);
        //    if (account == null)
        //    {
        //        return NotFound($"Account with ID {accountId} not found.");
        //    }

        //    var currentProgress = new CurrentProgressDTO
        //    {
        //        accountId = account.accountId,
        //        currentCourseId = account.CurentCourseId,
        //        currentSessionId = account.CurrentSessionId,
        //        currentLessonId = account.CurrentLessonId
        //    };

        //    return Ok(currentProgress);
        //}

        ////update Current Progress
        //[HttpPost("update-progress/{accountId}")]
        //public async Task<IActionResult> UpdateCurrentProgress(Guid accountId, [FromBody] UpdateProgressDTO request)
        //{
        //    var account = await _context.Accounts.FindAsync(accountId);
        //    if (account == null)
        //    {
        //        return NotFound($"Account with ID {accountId} not found.");
        //    }

        //    var course = await _context.Courses.FindAsync(request.courseId);
        //    if (course == null)
        //    {
        //        return NotFound($"Course with ID {request.courseId} not found.");
        //    }

        //    var session = await _context.Sessions.FindAsync(request.sessionId);
        //    if (session == null)
        //    {
        //        return NotFound($"Session with ID {request.sessionId} not found.");
        //    }

        //    var lesson = await _context.lessons.FindAsync(request.lessonId);
        //    if (lesson == null)
        //    {
        //        return NotFound($"Lesson with ID {request.lessonId} not found.");
        //    }

        //    account.CurentCourseId = course.courseId;
        //    account.CurrentSessionId = session.sessionId;
        //    account.CurrentLessonId = lesson.lessonId;

        //    await _context.SaveChangesAsync();

        //    return Ok();
        //}
        // Get Current Progress
        [HttpGet("current-progress/{accountId}")]
        public async Task<IActionResult> GetCurrentProgress(Guid accountId, [FromQuery] string courseId)
        {
            var account = await _context.Accounts.FindAsync(accountId);
            if (account == null)
            {
                return NotFound($"Account with ID {accountId} not found.");
            }

            IQueryable<CurrentProgress> progressQuery = _context.CurrentProgresses
                .Where(cp => cp.AccountId == accountId);

            // Filter the query by courseId if it is provided
            if (!string.IsNullOrEmpty(courseId))
            {
                progressQuery = progressQuery
                    .Where(cp => cp.courseId == courseId);
            }

            var currentProgressList = await progressQuery.ToListAsync();

            var progressDTOList = currentProgressList.Select(cp => new CurrentProgressDTO
            {
                accountId = cp.AccountId,
                currentCourseId = cp.courseId,
                currentSessionId = cp.CurrentSessionId,
                currentLessonId = cp.CurrentLessonId
            }).ToList();

            return Ok(progressDTOList);
        }

        // Update Current Progress
        [HttpPost("update-progress/{accountId}")]
        public async Task<IActionResult> UpdateCurrentProgress(Guid accountId, UpdateProgressDTO request)
        {
            var account = await _context.Accounts.FindAsync(accountId);
            if (account == null)
            {
                return NotFound($"Account with ID {accountId} not found.");
            }

            var session = await _context.Sessions.FindAsync(request.sessionId);
            if (session == null)
            {
                return NotFound($"Session with ID {request.sessionId} not found.");
            }

            var lesson = await _context.Lessons.FindAsync(request.lessonId);
            if (lesson == null)
            {
                return NotFound($"Lesson with ID {request.lessonId} not found.");
            }

            // Check if a CurrentProgress record already exists for the account
            var currentProgress = await _context.CurrentProgresses.FirstOrDefaultAsync(cp => cp.AccountId == accountId && cp.courseId == request.courseId);

            if (currentProgress == null)
            {
                // Create a new CurrentProgress record for the account
                currentProgress = new CurrentProgress
                {
                    AccountId = accountId,
                    courseId = request.courseId,
                    CurrentSessionId = request.sessionId,
                    CurrentLessonId = request.lessonId
                };

                _context.CurrentProgresses.Add(currentProgress);
            }
            else
            {
                // Update the existing CurrentProgress record
                currentProgress.CurrentSessionId = request.sessionId;
                currentProgress.CurrentLessonId = request.lessonId;
            }

            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}