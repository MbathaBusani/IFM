using Microsoft.EntityFrameworkCore;
using Uncoded.Models;

namespace Uncoded.Data
{
    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions<DBContext> options) : base(options)
        {

        }

        public DbSet<User> User { get; set; }
        public DbSet<Subject> Subject { get; set; }
        public DbSet<Grade> Grade { get; set; }
        public DbSet<CurriculumPackage> CurriculumPackage { get; set; }

    }
}
