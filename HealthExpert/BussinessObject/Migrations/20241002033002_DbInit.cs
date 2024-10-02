using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BussinessObject.Migrations
{
    /// <inheritdoc />
    public partial class DbInit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    categoryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    content = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.categoryId);
                });

            migrationBuilder.CreateTable(
                name: "Nutritions",
                columns: table => new
                {
                    nutriId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    isActive = table.Column<bool>(type: "bit", nullable: false),
                    sessionId = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Nutritions", x => x.nutriId);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    roleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    roleName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.roleId);
                });

            migrationBuilder.CreateTable(
                name: "ServiceCenters",
                columns: table => new
                {
                    courseId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    accountId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceCenters", x => new { x.accountId, x.courseId });
                });

            migrationBuilder.CreateTable(
                name: "Teachers",
                columns: table => new
                {
                    courseId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    teacherId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Teachers", x => new { x.teacherId, x.courseId });
                });

            migrationBuilder.CreateTable(
                name: "Courses",
                columns: table => new
                {
                    courseId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    courseName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    price = table.Column<double>(type: "float", nullable: false),
                    rating = table.Column<double>(type: "float", nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    studentNumber = table.Column<int>(type: "int", nullable: false),
                    certificate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    createBy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    dateUpdate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    language = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    bmiMin = table.Column<double>(type: "float", nullable: false),
                    bmiMax = table.Column<double>(type: "float", nullable: false),
                    typeId = table.Column<int>(type: "int", nullable: false),
                    ServiceCenteraccountId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ServiceCentercourseId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Courses", x => x.courseId);
                    table.ForeignKey(
                        name: "FK_Courses_ServiceCenters_ServiceCenteraccountId_ServiceCentercourseId",
                        columns: x => new { x.ServiceCenteraccountId, x.ServiceCentercourseId },
                        principalTable: "ServiceCenters",
                        principalColumns: new[] { "accountId", "courseId" });
                });

            migrationBuilder.CreateTable(
                name: "Accounts",
                columns: table => new
                {
                    accountId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    userName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    fullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    password = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    gender = table.Column<bool>(type: "bit", nullable: false),
                    birthDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    createDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    bankNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    bankName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    isActive = table.Column<bool>(type: "bit", nullable: false),
                    roleId = table.Column<int>(type: "int", nullable: false),
                    passwordHash = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    passwordSalt = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    verificationToken = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    verifiedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    passwordResetToken = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    resetTokenExpires = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ServiceCenteraccountId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ServiceCentercourseId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    teacherId = table.Column<int>(type: "int", nullable: true),
                    TeachercourseId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accounts", x => x.accountId);
                    table.ForeignKey(
                        name: "FK_Accounts_Roles_roleId",
                        column: x => x.roleId,
                        principalTable: "Roles",
                        principalColumn: "roleId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Accounts_ServiceCenters_ServiceCenteraccountId_ServiceCentercourseId",
                        columns: x => new { x.ServiceCenteraccountId, x.ServiceCentercourseId },
                        principalTable: "ServiceCenters",
                        principalColumns: new[] { "accountId", "courseId" });
                    table.ForeignKey(
                        name: "FK_Accounts_Teachers_teacherId_TeachercourseId",
                        columns: x => new { x.teacherId, x.TeachercourseId },
                        principalTable: "Teachers",
                        principalColumns: new[] { "teacherId", "courseId" });
                });

            migrationBuilder.CreateTable(
                name: "GetCourse_Teacher_Mappings",
                columns: table => new
                {
                    courseId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    teacherId = table.Column<int>(type: "int", nullable: false),
                    teacherId1 = table.Column<int>(type: "int", nullable: false),
                    TeachercourseId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GetCourse_Teacher_Mappings", x => new { x.courseId, x.teacherId });
                    table.ForeignKey(
                        name: "FK_GetCourse_Teacher_Mappings_Courses_courseId",
                        column: x => x.courseId,
                        principalTable: "Courses",
                        principalColumn: "courseId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GetCourse_Teacher_Mappings_Teachers_teacherId1_TeachercourseId",
                        columns: x => new { x.teacherId1, x.TeachercourseId },
                        principalTable: "Teachers",
                        principalColumns: new[] { "teacherId", "courseId" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    orderId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    orderTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    price = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    discount = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    accountId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    courseId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.orderId);
                    table.ForeignKey(
                        name: "FK_Orders_Courses_courseId",
                        column: x => x.courseId,
                        principalTable: "Courses",
                        principalColumn: "courseId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Sessions",
                columns: table => new
                {
                    sessionId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    sessionName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    dateStart = table.Column<DateTime>(type: "datetime2", nullable: false),
                    dateEnd = table.Column<DateTime>(type: "datetime2", nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    learnProgress = table.Column<bool>(type: "bit", nullable: false),
                    scoreResult = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    courseId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sessions", x => x.sessionId);
                    table.ForeignKey(
                        name: "FK_Sessions_Courses_courseId",
                        column: x => x.courseId,
                        principalTable: "Courses",
                        principalColumn: "courseId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Types",
                columns: table => new
                {
                    typeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    typeName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    typeDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    courseId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Types", x => x.typeId);
                    table.ForeignKey(
                        name: "FK_Types_Courses_courseId",
                        column: x => x.courseId,
                        principalTable: "Courses",
                        principalColumn: "courseId");
                });

            migrationBuilder.CreateTable(
                name: "Accomplishments",
                columns: table => new
                {
                    acplId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    acpltName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    acplDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    receptDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    isActive = table.Column<bool>(type: "bit", nullable: false),
                    accountId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accomplishments", x => x.acplId);
                    table.ForeignKey(
                        name: "FK_Accomplishments_Accounts_accountId",
                        column: x => x.accountId,
                        principalTable: "Accounts",
                        principalColumn: "accountId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Avatars",
                columns: table => new
                {
                    avatarId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    avatarName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    avatarPath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    uploadDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    isActive = table.Column<bool>(type: "bit", nullable: false),
                    accountId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Avatars", x => x.avatarId);
                    table.ForeignKey(
                        name: "FK_Avatars_Accounts_accountId",
                        column: x => x.accountId,
                        principalTable: "Accounts",
                        principalColumn: "accountId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Bmis",
                columns: table => new
                {
                    bmiId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    weight = table.Column<double>(type: "float", nullable: false),
                    height = table.Column<double>(type: "float", nullable: false),
                    bmiValue = table.Column<double>(type: "float", nullable: false),
                    bmiStatus = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    bmiDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    isActive = table.Column<bool>(type: "bit", nullable: false),
                    accountId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bmis", x => x.bmiId);
                    table.ForeignKey(
                        name: "FK_Bmis_Accounts_accountId",
                        column: x => x.accountId,
                        principalTable: "Accounts",
                        principalColumn: "accountId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CurrentProgresses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AccountId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    courseId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CurrentSessionId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CurrentLessonId = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CurrentProgresses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CurrentProgresses_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "accountId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CurrentProgresses_Courses_courseId",
                        column: x => x.courseId,
                        principalTable: "Courses",
                        principalColumn: "courseId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Enrollments",
                columns: table => new
                {
                    accountId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    courseId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    enrollDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    enrollStatus = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Enrollments", x => new { x.accountId, x.courseId });
                    table.ForeignKey(
                        name: "FK_Enrollments_Accounts_accountId",
                        column: x => x.accountId,
                        principalTable: "Accounts",
                        principalColumn: "accountId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Enrollments_Courses_courseId",
                        column: x => x.courseId,
                        principalTable: "Courses",
                        principalColumn: "courseId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Feedbacks",
                columns: table => new
                {
                    accountId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    courseId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    feedbackId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    detail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    createDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Feedbacks", x => new { x.accountId, x.courseId });
                    table.ForeignKey(
                        name: "FK_Feedbacks_Accounts_accountId",
                        column: x => x.accountId,
                        principalTable: "Accounts",
                        principalColumn: "accountId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Feedbacks_Courses_courseId",
                        column: x => x.courseId,
                        principalTable: "Courses",
                        principalColumn: "courseId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Photos",
                columns: table => new
                {
                    photoId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    photoName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    photoPath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    uploadDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    isActive = table.Column<bool>(type: "bit", nullable: false),
                    accountId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Photos", x => x.photoId);
                    table.ForeignKey(
                        name: "FK_Photos_Accounts_accountId",
                        column: x => x.accountId,
                        principalTable: "Accounts",
                        principalColumn: "accountId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Posts",
                columns: table => new
                {
                    postId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    accountId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    imageFile = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    likeCount = table.Column<int>(type: "int", nullable: false),
                    createdAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    updatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    publishAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    isActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Posts", x => x.postId);
                    table.ForeignKey(
                        name: "FK_Posts_Accounts_accountId",
                        column: x => x.accountId,
                        principalTable: "Accounts",
                        principalColumn: "accountId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Bills",
                columns: table => new
                {
                    billId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    orderId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    accountId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    billTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    bankCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    bankTranNo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    cardType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    orderInfo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    payDate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    responseCode = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bills", x => x.billId);
                    table.ForeignKey(
                        name: "FK_Bills_Accounts_accountId",
                        column: x => x.accountId,
                        principalTable: "Accounts",
                        principalColumn: "accountId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Bills_Orders_orderId",
                        column: x => x.orderId,
                        principalTable: "Orders",
                        principalColumn: "orderId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderStatuses",
                columns: table => new
                {
                    orderStatusId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    time = table.Column<DateTime>(type: "datetime2", nullable: false),
                    status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    orderId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderStatuses", x => x.orderStatusId);
                    table.ForeignKey(
                        name: "FK_OrderStatuses_Orders_orderId",
                        column: x => x.orderId,
                        principalTable: "Orders",
                        principalColumn: "orderId");
                });

            migrationBuilder.CreateTable(
                name: "Lessons",
                columns: table => new
                {
                    lessonId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    videoFile = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    caption = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    cover = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    sessionId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    isActive = table.Column<bool>(type: "bit", nullable: false),
                    viewProgress = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lessons", x => x.lessonId);
                    table.ForeignKey(
                        name: "FK_Lessons_Sessions_sessionId",
                        column: x => x.sessionId,
                        principalTable: "Sessions",
                        principalColumn: "sessionId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "NutritionSession",
                columns: table => new
                {
                    NutritionsnutriId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    SessionssessionId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NutritionSession", x => new { x.NutritionsnutriId, x.SessionssessionId });
                    table.ForeignKey(
                        name: "FK_NutritionSession_Nutritions_NutritionsnutriId",
                        column: x => x.NutritionsnutriId,
                        principalTable: "Nutritions",
                        principalColumn: "nutriId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NutritionSession_Sessions_SessionssessionId",
                        column: x => x.SessionssessionId,
                        principalTable: "Sessions",
                        principalColumn: "sessionId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Post_Category",
                columns: table => new
                {
                    postId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    categoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Post_Category", x => new { x.postId, x.categoryId });
                    table.ForeignKey(
                        name: "FK_Post_Category_Categories_categoryId",
                        column: x => x.categoryId,
                        principalTable: "Categories",
                        principalColumn: "categoryId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Post_Category_Posts_postId",
                        column: x => x.postId,
                        principalTable: "Posts",
                        principalColumn: "postId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Post_Likes",
                columns: table => new
                {
                    postLikeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    postId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    userName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    createdAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Post_Likes", x => x.postLikeId);
                    table.ForeignKey(
                        name: "FK_Post_Likes_Posts_postId",
                        column: x => x.postId,
                        principalTable: "Posts",
                        principalColumn: "postId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Post_Metas",
                columns: table => new
                {
                    postMetaId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    postId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    hashTag = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    content = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Post_Metas", x => x.postMetaId);
                    table.ForeignKey(
                        name: "FK_Post_Metas_Posts_postId",
                        column: x => x.postId,
                        principalTable: "Posts",
                        principalColumn: "postId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PostDetails",
                columns: table => new
                {
                    postDetailId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    postId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    postTitle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    postDescription = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostDetails", x => x.postDetailId);
                    table.ForeignKey(
                        name: "FK_PostDetails_Posts_postId",
                        column: x => x.postId,
                        principalTable: "Posts",
                        principalColumn: "postId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "roleId", "roleName" },
                values: new object[,]
                {
                    { 1, "Administration" },
                    { 2, "ServiceCenter" },
                    { 3, "Teacher" },
                    { 4, "Learner" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Accomplishments_accountId",
                table: "Accomplishments",
                column: "accountId");

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_roleId",
                table: "Accounts",
                column: "roleId");

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_ServiceCenteraccountId_ServiceCentercourseId",
                table: "Accounts",
                columns: new[] { "ServiceCenteraccountId", "ServiceCentercourseId" });

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_teacherId_TeachercourseId",
                table: "Accounts",
                columns: new[] { "teacherId", "TeachercourseId" });

            migrationBuilder.CreateIndex(
                name: "IX_Avatars_accountId",
                table: "Avatars",
                column: "accountId");

            migrationBuilder.CreateIndex(
                name: "IX_Bills_accountId",
                table: "Bills",
                column: "accountId");

            migrationBuilder.CreateIndex(
                name: "IX_Bills_orderId",
                table: "Bills",
                column: "orderId");

            migrationBuilder.CreateIndex(
                name: "IX_Bmis_accountId",
                table: "Bmis",
                column: "accountId");

            migrationBuilder.CreateIndex(
                name: "IX_Courses_ServiceCenteraccountId_ServiceCentercourseId",
                table: "Courses",
                columns: new[] { "ServiceCenteraccountId", "ServiceCentercourseId" });

            migrationBuilder.CreateIndex(
                name: "IX_CurrentProgresses_AccountId",
                table: "CurrentProgresses",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_CurrentProgresses_courseId",
                table: "CurrentProgresses",
                column: "courseId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Enrollments_courseId",
                table: "Enrollments",
                column: "courseId");

            migrationBuilder.CreateIndex(
                name: "IX_Feedbacks_courseId",
                table: "Feedbacks",
                column: "courseId");

            migrationBuilder.CreateIndex(
                name: "IX_GetCourse_Teacher_Mappings_teacherId1_TeachercourseId",
                table: "GetCourse_Teacher_Mappings",
                columns: new[] { "teacherId1", "TeachercourseId" });

            migrationBuilder.CreateIndex(
                name: "IX_Lessons_sessionId",
                table: "Lessons",
                column: "sessionId");

            migrationBuilder.CreateIndex(
                name: "IX_NutritionSession_SessionssessionId",
                table: "NutritionSession",
                column: "SessionssessionId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_courseId",
                table: "Orders",
                column: "courseId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderStatuses_orderId",
                table: "OrderStatuses",
                column: "orderId");

            migrationBuilder.CreateIndex(
                name: "IX_Photos_accountId",
                table: "Photos",
                column: "accountId");

            migrationBuilder.CreateIndex(
                name: "IX_Post_Category_categoryId",
                table: "Post_Category",
                column: "categoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Post_Likes_postId",
                table: "Post_Likes",
                column: "postId");

            migrationBuilder.CreateIndex(
                name: "IX_Post_Metas_postId",
                table: "Post_Metas",
                column: "postId");

            migrationBuilder.CreateIndex(
                name: "IX_PostDetails_postId",
                table: "PostDetails",
                column: "postId");

            migrationBuilder.CreateIndex(
                name: "IX_Posts_accountId",
                table: "Posts",
                column: "accountId");

            migrationBuilder.CreateIndex(
                name: "IX_Sessions_courseId",
                table: "Sessions",
                column: "courseId");

            migrationBuilder.CreateIndex(
                name: "IX_Types_courseId",
                table: "Types",
                column: "courseId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Accomplishments");

            migrationBuilder.DropTable(
                name: "Avatars");

            migrationBuilder.DropTable(
                name: "Bills");

            migrationBuilder.DropTable(
                name: "Bmis");

            migrationBuilder.DropTable(
                name: "CurrentProgresses");

            migrationBuilder.DropTable(
                name: "Enrollments");

            migrationBuilder.DropTable(
                name: "Feedbacks");

            migrationBuilder.DropTable(
                name: "GetCourse_Teacher_Mappings");

            migrationBuilder.DropTable(
                name: "Lessons");

            migrationBuilder.DropTable(
                name: "NutritionSession");

            migrationBuilder.DropTable(
                name: "OrderStatuses");

            migrationBuilder.DropTable(
                name: "Photos");

            migrationBuilder.DropTable(
                name: "Post_Category");

            migrationBuilder.DropTable(
                name: "Post_Likes");

            migrationBuilder.DropTable(
                name: "Post_Metas");

            migrationBuilder.DropTable(
                name: "PostDetails");

            migrationBuilder.DropTable(
                name: "Types");

            migrationBuilder.DropTable(
                name: "Nutritions");

            migrationBuilder.DropTable(
                name: "Sessions");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Posts");

            migrationBuilder.DropTable(
                name: "Courses");

            migrationBuilder.DropTable(
                name: "Accounts");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "ServiceCenters");

            migrationBuilder.DropTable(
                name: "Teachers");
        }
    }
}
