using E_Healthcare.Data;
using E_Healthcare.Models;
using E_Healthcare.Models.Dto;
using FrontendModule.Controllers.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace E_Healthcare.Controllers
{
    [Route("api/authentication")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public static User user = new();
        private static User adminAccount = new User
        {
            Email = "admin@admin.com",
            IsAdmin = true,
            AdminPassword = "admin"
        };

        private readonly IConfiguration _configuration;
        private readonly DataContext _context;
        private readonly IAuthManager _authManager;

        public AuthController(IConfiguration configuration, DataContext context, IAuthManager authController)
        {
            _configuration = configuration;
            _context = context;
            _authManager = authController;
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(RegisterDto request)
        {
            _authManager.CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

            //creating the user
            user.FirstName = request.FirstName;
            user.LastName = request.LastName;
            user.Phone = request.Phone;
            user.IsAdmin = false;
            user.AdminPassword = String.Empty;
            user.Address = request.Address;
            user.DateOfBirth = request.DateOfBirth;
            user.Email = request.Email;
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            //creating the account for founds details
            Account account = new();
            account.AccNumber = user.ID;
            account.Amount = 1000;
            account.Email = user.Email;

            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();

            //creating the cart and assign it to the user
            Cart cart = new();
            cart.OwnerID = user.ID;
            cart.Owner = user;

            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();

            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(LoginDto request)
        {
            if (!_context.Users.Any(x => x.Email == request.Email) && adminAccount.Email != request.Email)
            {
                return BadRequest("User not found.");
            }

            User currentUser = new();
            //admin case
            if (request.Email.Equals(adminAccount.Email))
            {
                if (!request.Password.Equals(adminAccount.AdminPassword))
                {
                    return BadRequest("Wrong password.");
                }

                currentUser.Email = request.Email;
                currentUser.IsAdmin = true;
            }
            //user case
            else
            {
                currentUser = _context.Users.FirstOrDefault(x => x.Email == request.Email);

                if (!_authManager.VerifyPasswordHash(request.Password, currentUser.PasswordHash, currentUser.PasswordSalt))
                {
                    return BadRequest("Wrong password.");
                }
            }

            string token = _authManager.CreateToken(currentUser);

            var json = JsonConvert.SerializeObject(token);

            return Ok(json);
        }   
    }
}
