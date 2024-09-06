using HealthExpertAPI.Helper;
using Microsoft.AspNetCore.StaticFiles;

namespace HealthExpertAPI.Services
{
    public class ManageFile : IManageFile
    {
        public async Task<(byte[], string, string)> DownloadFile(string FileName)
        {
            try
            {
                var _GetFilePath = Common.GetFilePath(FileName);
                var provider = new FileExtensionContentTypeProvider();
                if (!provider.TryGetContentType(_GetFilePath, out var _ContentType))
                {
                    _ContentType = "application/octet-stream";
                }
                var _ReadAllBytesAsync = await File.ReadAllBytesAsync(_GetFilePath);
                return (_ReadAllBytesAsync, _ContentType, Path.GetFileName(_GetFilePath));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<string> UploadFile(IFormFile _IFormFile)
        {
            try
            {
                var _GetFilePath = Common.GetFilePath(_IFormFile.FileName);
                using (var _FileStream = new FileStream(_GetFilePath, FileMode.Create))
                {
                    await _IFormFile.CopyToAsync(_FileStream);
                }
                return _IFormFile.FileName;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
