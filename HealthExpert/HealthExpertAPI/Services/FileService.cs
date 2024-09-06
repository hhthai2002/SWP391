using Azure.Storage.Blobs;
using BussinessObject.Model.ModelSession;

namespace HealthExpertAPI.Services
{
    public class FileService : IFileService
    {
        private readonly BlobServiceClient _blobServiceClient;

        public FileService(BlobServiceClient blobServiceClient)
        {
            _blobServiceClient = blobServiceClient;
        }

        public async Task Upload(FileModels fileModels)
        {
            var containerInstance = _blobServiceClient.GetBlobContainerClient("healthexpertvideos2");

            var blobInstance = containerInstance.GetBlobClient(fileModels.VideoFile.FileName);

            await blobInstance.UploadAsync(fileModels.VideoFile.OpenReadStream());
        }

        public async Task<Stream> Get(string name)
        {
            var containerInstance = _blobServiceClient.GetBlobContainerClient("healthexpertvideos2");
            var blobInstance = containerInstance.GetBlobClient(name);

            var downloadContent = await blobInstance.DownloadAsync();
            return downloadContent.Value.Content;
        }
    }
}
