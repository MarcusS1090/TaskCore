using Microsoft.EntityFrameworkCore;
using TaskCore.Entidades;

namespace TaskCore
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet <Tarea> Tareas { get; set; }
    }
}
