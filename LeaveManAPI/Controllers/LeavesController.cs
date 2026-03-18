using System.Linq;
using LeaveManAPI.Data;
using LeaveManAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LeaveManAPI.DTOs;
using System.Security.Claims;

namespace LeaveManAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeavesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LeavesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Leave>>> GetLeaves()
        {
            return await _context.Leaves.ToListAsync();
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> ApplyLeave(LeaveRequest request)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            var leave = new Leave
            {
                FromDate = request.FromDate,
                ToDate = request.ToDate,
                Reason = request.Reason,
                Status = "Pending",
                UserId = userId
            };

            _context.Leaves.Add(leave);
            await _context.SaveChangesAsync();

            return Ok(leave);
        }

        [HttpGet("my-leaves")]
        [Authorize]
        public async Task<IActionResult> GetMyLeaves()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            var leaves = await _context.Leaves
                .Where(l => l.UserId == userId)
                .ToListAsync();

            return Ok(leaves);
        }
        
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateLeave(int id, LeaveRequest request)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            var leave = await _context.Leaves.FindAsync(id);

            if (leave == null)
                return NotFound();

            if (leave.UserId != userId)
                return Unauthorized();

            if (leave.Status != "Pending")
                return BadRequest("Only pending leave can be updated");

            leave.FromDate = request.FromDate;
            leave.ToDate = request.ToDate;
            leave.Reason = request.Reason;

            await _context.SaveChangesAsync();

            return Ok(leave);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> CancelLeave(int id)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            var leave = await _context.Leaves.FindAsync(id);

            if (leave == null)
                return NotFound();

            if (leave.UserId != userId)
                return Unauthorized();

            if (leave.Status != "Pending")
                return BadRequest("Only pending leave can be cancelled");

            _context.Leaves.Remove(leave);

            await _context.SaveChangesAsync();

            return Ok("Leave cancelled");
        }



//adminrole

        [Authorize(Roles = "Admin")]
        [HttpPut("approve/{id}")]
        public async Task<IActionResult> ApproveLeave(int id)
        {
            var leave = await _context.Leaves.FindAsync(id);

            if (leave == null)
                return NotFound();

            leave.Status = "Approved";

            await _context.SaveChangesAsync();

            return Ok(leave);
        }
        [Authorize(Roles = "Admin")]
        [HttpPut("reject/{id}")]
        public async Task<IActionResult> RejectLeave(int id)
        {
            var leave = await _context.Leaves.FindAsync(id);

            if (leave == null)
                return NotFound();

            leave.Status = "Rejected";

            await _context.SaveChangesAsync();

            return Ok(leave);
        }

        //choose userid
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Leave>>> GetUserLeaves(int userId)
        {
            return await _context.Leaves
                .Where(x => x.UserId == userId)
                .ToListAsync();
        }
    }
}