using Azure.Storage.Blobs;
using BussinessObject.ContextData;
using HealthExpertAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace HealthExpertAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddAutoMapper(typeof(Program).Assembly);
            builder.Services.AddDbContext<HealthExpertContext>();
            builder.Services.AddHttpContextAccessor();
            builder.Services.AddTransient<IManageFile, ManageFile>();
            builder.Services.AddSingleton<IVnPayService, VnPayService>();
            builder.Services.AddScoped(_ =>
            {
                return new BlobServiceClient(builder.Configuration.GetConnectionString("AzureBlobStorage"));
            });
            builder.Services.AddScoped<IFileService, FileService>();

            // Configure upload path
            var uploadPath = builder.Configuration.GetValue<string>("UploadPath");
            if (!string.IsNullOrEmpty(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }

            //Config Cookie
            builder.Services.ConfigureApplicationCookie(options =>
            {
                options.Cookie.SameSite =  SameSiteMode.None;
                options.Cookie.SecurePolicy = CookieSecurePolicy.None;
            });

            //Add Auth
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddCookie()
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.SaveToken = true;
                    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = builder.Configuration["Jwt:Issuer"],
                        ValidAudience = builder.Configuration["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(
                                            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])
                                        )
                    };

                    options.Events = new()
                    {
                        OnMessageReceived = context =>
                        {
                            var request = context.HttpContext.Request;
                            var cookies = request.Cookies;
                            if (cookies.TryGetValue("access_token",
                                            out var accessTokenValue))
                            {
                                context.Token = accessTokenValue;
                            }
                            return Task.CompletedTask;

                        }

                    };
                });

            //Add Cor
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAllHeaders",
                    builder =>
                    {
                        builder
                               .WithOrigins("http://localhost:5500", "https://sandbox.vnpayment.vn", "http://localhost:3000", "http://20.2.73.15")
                               //.AllowAnyOrigin()
                               .AllowAnyHeader()
                               .AllowAnyMethod()
                               .AllowCredentials();
                    });
            });

            builder.Services.AddMvc();
            
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseCors("AllowAllHeaders");

            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}