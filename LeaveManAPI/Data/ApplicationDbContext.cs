using Microsoft.EntityFrameworkCore;
using LeaveManAPI.Models;

namespace LeaveManAPI.Data
{
    public class ApplicationDbContext : DbContext
    {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Leave> Leaves { get; set; }

    }
}