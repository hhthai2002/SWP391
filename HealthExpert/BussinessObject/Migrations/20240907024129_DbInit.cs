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
                name: "categories",
                columns: table => new
                {
                    categoryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    content = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_categories", x => x.categoryId);
                });

            migrationBuilder.CreateTable(
                name: "courseAdmins",
                columns: table => new
                {
                    courseId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    accountId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_courseAdmins", x => new { x.accountId, x.courseId });
                });

            migrationBuilder.CreateTable(
                name: "courseManagements",
                columns: table => new
                {
                    courseId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    courseManagerId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_courseManagements", x => new { x.courseManagerId, x.courseId });
                });

            migrationBuilder.CreateTable(
                name: "nutritions",
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
                    table.PrimaryKey("PK_nutritions", x => x.nutriId);
                });

            migrationBuilder.CreateTable(
                name: "roles",
                columns: table => new
                {
                    roleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    roleName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_roles", x => x.roleId);
                });

            migrationBuilder.CreateTable(
                name: "courses",
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
                    courseAdminaccountId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    courseAdmincourseId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_courses", x => x.courseId);
                    table.ForeignKey(
                        name: "FK_courses_courseAdmins_courseAdminaccountId_courseAdmincourseId",
                        columns: x => new { x.courseAdminaccountId, x.courseAdmincourseId },
                        principalTable: "courseAdmins",
                        principalColumns: new[] { "accountId", "courseId" });
                });

            migrationBuilder.CreateTable(
                name: "accounts",
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
                    courseAdminaccountId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    courseAdmincourseId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    courseManagerId = table.Column<int>(type: "int", nullable: true),
                    courseManagercourseId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_accounts", x => x.accountId);
                    table.ForeignKey(
                        name: "FK_accounts_courseAdmins_courseAdminaccountId_courseAdmincourseId",
                        columns: x => new { x.courseAdminaccountId, x.courseAdmincourseId },
                        principalTable: "courseAdmins",
                        principalColumns: new[] { "accountId", "courseId" });
                    table.ForeignKey(
                        name: "FK_accounts_courseManagements_courseManagerId_courseManagercourseId",
                        columns: x => new { x.courseManagerId, x.courseManagercourseId },
                        principalTable: "courseManagements",
                        principalColumns: new[] { "courseManagerId", "courseId" });
                    table.ForeignKey(
                        name: "FK_accounts_roles_roleId",
                        column: x => x.roleId,
                        principalTable: "roles",
                        principalColumn: "roleId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "course_CourseManager_Mappings",
                columns: table => new
                {
                    courseId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    courseManagerId = table.Column<int>(type: "int", nullable: false),
                    courseManagementcourseManagerId = table.Column<int>(type: "int", nullable: true),
                    courseManagementcourseId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_course_CourseManager_Mappings", x => new { x.courseId, x.courseManagerId });
                    table.ForeignKey(
                        name: "FK_course_CourseManager_Mappings_courseManagements_courseManagementcourseManagerId_courseManagementcourseId",
                        columns: x => new { x.courseManagementcourseManagerId, x.courseManagementcourseId },
                        principalTable: "courseManagements",
                        principalColumns: new[] { "courseManagerId", "courseId" });
                    table.ForeignKey(
                        name: "FK_course_CourseManager_Mappings_courses_courseId",
                        column: x => x.courseId,
                        principalTable: "courses",
                        principalColumn: "courseId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "orders",
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
                    table.PrimaryKey("PK_orders", x => x.orderId);
                    table.ForeignKey(
                        name: "FK_orders_courses_courseId",
                        column: x => x.courseId,
                        principalTable: "courses",
                        principalColumn: "courseId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "sessions",
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
                    table.PrimaryKey("PK_sessions", x => x.sessionId);
                    table.ForeignKey(
                        name: "FK_sessions_courses_courseId",
                        column: x => x.courseId,
                        principalTable: "courses",
                        principalColumn: "courseId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "types",
                columns: table => new
                {
                    typeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    typeName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    typeDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    courseId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_types", x => x.typeId);
                    table.ForeignKey(
                        name: "FK_types_courses_courseId",
                        column: x => x.courseId,
                        principalTable: "courses",
                        principalColumn: "courseId");
                });

            migrationBuilder.CreateTable(
                name: "accomplishments",
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
                    table.PrimaryKey("PK_accomplishments", x => x.acplId);
                    table.ForeignKey(
                        name: "FK_accomplishments_accounts_accountId",
                        column: x => x.accountId,
                        principalTable: "accounts",
                        principalColumn: "accountId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "avatars",
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
                    table.PrimaryKey("PK_avatars", x => x.avatarId);
                    table.ForeignKey(
                        name: "FK_avatars_accounts_accountId",
                        column: x => x.accountId,
                        principalTable: "accounts",
                        principalColumn: "accountId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "bmis",
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
                    table.PrimaryKey("PK_bmis", x => x.bmiId);
                    table.ForeignKey(
                        name: "FK_bmis_accounts_accountId",
                        column: x => x.accountId,
                        principalTable: "accounts",
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
                        name: "FK_CurrentProgresses_accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "accounts",
                        principalColumn: "accountId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CurrentProgresses_courses_courseId",
                        column: x => x.courseId,
                        principalTable: "courses",
                        principalColumn: "courseId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "enrollments",
                columns: table => new
                {
                    accountId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    courseId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    enrollDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    enrollStatus = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_enrollments", x => new { x.accountId, x.courseId });
                    table.ForeignKey(
                        name: "FK_enrollments_accounts_accountId",
                        column: x => x.accountId,
                        principalTable: "accounts",
                        principalColumn: "accountId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_enrollments_courses_courseId",
                        column: x => x.courseId,
                        principalTable: "courses",
                        principalColumn: "courseId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "feedbacks",
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
                    table.PrimaryKey("PK_feedbacks", x => new { x.accountId, x.courseId });
                    table.ForeignKey(
                        name: "FK_feedbacks_accounts_accountId",
                        column: x => x.accountId,
                        principalTable: "accounts",
                        principalColumn: "accountId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_feedbacks_courses_courseId",
                        column: x => x.courseId,
                        principalTable: "courses",
                        principalColumn: "courseId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "photos",
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
                    table.PrimaryKey("PK_photos", x => x.photoId);
                    table.ForeignKey(
                        name: "FK_photos_accounts_accountId",
                        column: x => x.accountId,
                        principalTable: "accounts",
                        principalColumn: "accountId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "posts",
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
                    table.PrimaryKey("PK_posts", x => x.postId);
                    table.ForeignKey(
                        name: "FK_posts_accounts_accountId",
                        column: x => x.accountId,
                        principalTable: "accounts",
                        principalColumn: "accountId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "bills",
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
                    table.PrimaryKey("PK_bills", x => x.billId);
                    table.ForeignKey(
                        name: "FK_bills_accounts_accountId",
                        column: x => x.accountId,
                        principalTable: "accounts",
                        principalColumn: "accountId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_bills_orders_orderId",
                        column: x => x.orderId,
                        principalTable: "orders",
                        principalColumn: "orderId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "orderStatuses",
                columns: table => new
                {
                    orderStatusId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    time = table.Column<DateTime>(type: "datetime2", nullable: false),
                    status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    orderId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_orderStatuses", x => x.orderStatusId);
                    table.ForeignKey(
                        name: "FK_orderStatuses_orders_orderId",
                        column: x => x.orderId,
                        principalTable: "orders",
                        principalColumn: "orderId");
                });

            migrationBuilder.CreateTable(
                name: "lessons",
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
                    table.PrimaryKey("PK_lessons", x => x.lessonId);
                    table.ForeignKey(
                        name: "FK_lessons_sessions_sessionId",
                        column: x => x.sessionId,
                        principalTable: "sessions",
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
                        name: "FK_NutritionSession_nutritions_NutritionsnutriId",
                        column: x => x.NutritionsnutriId,
                        principalTable: "nutritions",
                        principalColumn: "nutriId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NutritionSession_sessions_SessionssessionId",
                        column: x => x.SessionssessionId,
                        principalTable: "sessions",
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
                        name: "FK_Post_Category_categories_categoryId",
                        column: x => x.categoryId,
                        principalTable: "categories",
                        principalColumn: "categoryId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Post_Category_posts_postId",
                        column: x => x.postId,
                        principalTable: "posts",
                        principalColumn: "postId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "post_Likes",
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
                    table.PrimaryKey("PK_post_Likes", x => x.postLikeId);
                    table.ForeignKey(
                        name: "FK_post_Likes_posts_postId",
                        column: x => x.postId,
                        principalTable: "posts",
                        principalColumn: "postId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "post_Metas",
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
                    table.PrimaryKey("PK_post_Metas", x => x.postMetaId);
                    table.ForeignKey(
                        name: "FK_post_Metas_posts_postId",
                        column: x => x.postId,
                        principalTable: "posts",
                        principalColumn: "postId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "postDetails",
                columns: table => new
                {
                    postDetailId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    postId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    postTitle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    postDescription = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_postDetails", x => x.postDetailId);
                    table.ForeignKey(
                        name: "FK_postDetails_posts_postId",
                        column: x => x.postId,
                        principalTable: "posts",
                        principalColumn: "postId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "courses",
                columns: new[] { "courseId", "bmiMax", "bmiMin", "certificate", "courseAdminaccountId", "courseAdmincourseId", "courseName", "createBy", "dateUpdate", "description", "language", "price", "rating", "studentNumber", "typeId" },
                values: new object[] { "C001", 20.0, 10.0, "Certificate 1", null, null, "Course 1", "admin", new DateTime(2024, 9, 7, 9, 41, 29, 493, DateTimeKind.Local).AddTicks(7765), "This is course 1", "English", 10.0, 5.0, 100, 1 });

            migrationBuilder.InsertData(
                table: "roles",
                columns: new[] { "roleId", "roleName" },
                values: new object[,]
                {
                    { 1, "Administration" },
                    { 2, "CourseAdmin" },
                    { 3, "CourseManager" },
                    { 4, "Learner" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_accomplishments_accountId",
                table: "accomplishments",
                column: "accountId");

            migrationBuilder.CreateIndex(
                name: "IX_accounts_courseAdminaccountId_courseAdmincourseId",
                table: "accounts",
                columns: new[] { "courseAdminaccountId", "courseAdmincourseId" });

            migrationBuilder.CreateIndex(
                name: "IX_accounts_courseManagerId_courseManagercourseId",
                table: "accounts",
                columns: new[] { "courseManagerId", "courseManagercourseId" });

            migrationBuilder.CreateIndex(
                name: "IX_accounts_roleId",
                table: "accounts",
                column: "roleId");

            migrationBuilder.CreateIndex(
                name: "IX_avatars_accountId",
                table: "avatars",
                column: "accountId");

            migrationBuilder.CreateIndex(
                name: "IX_bills_accountId",
                table: "bills",
                column: "accountId");

            migrationBuilder.CreateIndex(
                name: "IX_bills_orderId",
                table: "bills",
                column: "orderId");

            migrationBuilder.CreateIndex(
                name: "IX_bmis_accountId",
                table: "bmis",
                column: "accountId");

            migrationBuilder.CreateIndex(
                name: "IX_course_CourseManager_Mappings_courseManagementcourseManagerId_courseManagementcourseId",
                table: "course_CourseManager_Mappings",
                columns: new[] { "courseManagementcourseManagerId", "courseManagementcourseId" });

            migrationBuilder.CreateIndex(
                name: "IX_courses_courseAdminaccountId_courseAdmincourseId",
                table: "courses",
                columns: new[] { "courseAdminaccountId", "courseAdmincourseId" });

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
                name: "IX_enrollments_courseId",
                table: "enrollments",
                column: "courseId");

            migrationBuilder.CreateIndex(
                name: "IX_feedbacks_courseId",
                table: "feedbacks",
                column: "courseId");

            migrationBuilder.CreateIndex(
                name: "IX_lessons_sessionId",
                table: "lessons",
                column: "sessionId");

            migrationBuilder.CreateIndex(
                name: "IX_NutritionSession_SessionssessionId",
                table: "NutritionSession",
                column: "SessionssessionId");

            migrationBuilder.CreateIndex(
                name: "IX_orders_courseId",
                table: "orders",
                column: "courseId");

            migrationBuilder.CreateIndex(
                name: "IX_orderStatuses_orderId",
                table: "orderStatuses",
                column: "orderId");

            migrationBuilder.CreateIndex(
                name: "IX_photos_accountId",
                table: "photos",
                column: "accountId");

            migrationBuilder.CreateIndex(
                name: "IX_Post_Category_categoryId",
                table: "Post_Category",
                column: "categoryId");

            migrationBuilder.CreateIndex(
                name: "IX_post_Likes_postId",
                table: "post_Likes",
                column: "postId");

            migrationBuilder.CreateIndex(
                name: "IX_post_Metas_postId",
                table: "post_Metas",
                column: "postId");

            migrationBuilder.CreateIndex(
                name: "IX_postDetails_postId",
                table: "postDetails",
                column: "postId");

            migrationBuilder.CreateIndex(
                name: "IX_posts_accountId",
                table: "posts",
                column: "accountId");

            migrationBuilder.CreateIndex(
                name: "IX_sessions_courseId",
                table: "sessions",
                column: "courseId");

            migrationBuilder.CreateIndex(
                name: "IX_types_courseId",
                table: "types",
                column: "courseId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "accomplishments");

            migrationBuilder.DropTable(
                name: "avatars");

            migrationBuilder.DropTable(
                name: "bills");

            migrationBuilder.DropTable(
                name: "bmis");

            migrationBuilder.DropTable(
                name: "course_CourseManager_Mappings");

            migrationBuilder.DropTable(
                name: "CurrentProgresses");

            migrationBuilder.DropTable(
                name: "enrollments");

            migrationBuilder.DropTable(
                name: "feedbacks");

            migrationBuilder.DropTable(
                name: "lessons");

            migrationBuilder.DropTable(
                name: "NutritionSession");

            migrationBuilder.DropTable(
                name: "orderStatuses");

            migrationBuilder.DropTable(
                name: "photos");

            migrationBuilder.DropTable(
                name: "Post_Category");

            migrationBuilder.DropTable(
                name: "post_Likes");

            migrationBuilder.DropTable(
                name: "post_Metas");

            migrationBuilder.DropTable(
                name: "postDetails");

            migrationBuilder.DropTable(
                name: "types");

            migrationBuilder.DropTable(
                name: "nutritions");

            migrationBuilder.DropTable(
                name: "sessions");

            migrationBuilder.DropTable(
                name: "orders");

            migrationBuilder.DropTable(
                name: "categories");

            migrationBuilder.DropTable(
                name: "posts");

            migrationBuilder.DropTable(
                name: "courses");

            migrationBuilder.DropTable(
                name: "accounts");

            migrationBuilder.DropTable(
                name: "courseAdmins");

            migrationBuilder.DropTable(
                name: "courseManagements");

            migrationBuilder.DropTable(
                name: "roles");
        }
    }
}
