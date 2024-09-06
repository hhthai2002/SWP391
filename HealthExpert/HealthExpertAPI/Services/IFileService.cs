using BussinessObject.Model.ModelSession;

namespace HealthExpertAPI.Services
{
    public interface IFileService
    {
        Task Upload(FileModels fileModels);
        Task<Stream> Get(string name);
    }
}
