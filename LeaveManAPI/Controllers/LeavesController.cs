using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LeaveManAPI.Data;
using LeaveManAPI.Models;
using System.Linq;

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

        // GET: api/leaves
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Leave>>> GetLeaves()
        {
            return await _context.Leaves.ToListAsync();
        }

        // POST: api/leaves
        [HttpPost]
        public async Task<ActionResult<Leave>> ApplyLeave(Leave leave)
        {
            leave.Status = "Pending";

            _context.Leaves.Add(leave);
            await _context.SaveChangesAsync();

            return Ok(leave);
        }

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
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Leave>>> GetUserLeaves(int userId)
        {
            return await _context.Leaves
                .Where(x => x.UserId == userId)
                .ToListAsync();
        }
    }
}