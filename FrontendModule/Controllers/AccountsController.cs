﻿using E_Healthcare.Data;
using E_Healthcare.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace E_Healthcare.Controllers
{
    [Route("api/account")]
    [ApiController]
    [Authorize]
    public class AccountsController : ControllerBase
    { 
        private readonly DataContext _context;
        public AccountsController(DataContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("getAllAccounts")]
        public async Task<ActionResult<List<Account>>> Get()
        {
            return Ok(await _context.Accounts.ToListAsync());
        }

        [Authorize(Roles = "Admin,User")]
        [HttpGet("getAccountById/{id}")]
        public async Task<ActionResult<List<Account>>> Get(int id)
        {
            var account = await _context.Accounts.FindAsync(id);
            if (account == null)
                return BadRequest("Account not found");

            return Ok(account);
        }

        [Authorize(Roles = "Admin,User")]
        [HttpPut("editAccount/{request}")]
        public async Task<ActionResult<List<Account>>> UpdateAccount(Account request)
        {
            var account = await _context.Accounts.FindAsync(request.ID);
            if (account == null)
                return BadRequest("Account not found");

            account.AccNumber = request.AccNumber;
            account.Amount = request.Amount;
            account.Email = request.Email;

            await _context.SaveChangesAsync();

            return Ok(await _context.Accounts.ToListAsync()); ;
        }
    }
}
