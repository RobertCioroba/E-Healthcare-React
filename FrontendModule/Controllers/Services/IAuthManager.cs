using E_Healthcare.Models;

namespace FrontendModule.Controllers.Services
{
    public interface IAuthManager
    {
        void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt);
        string CreateToken(User user);
        bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt);
    }
}