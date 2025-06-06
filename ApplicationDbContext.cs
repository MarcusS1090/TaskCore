using Microsoft.EntityFrameworkCore;
using TaskCore.Entidades;

namespace TaskCore
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //modelBuilder.Entity<Tarea>(entity =>
            //{
            //    entity.Property(t => t.Titulo)
            //        .IsRequired()
            //        .HasMaxLength(100);
            //    entity.Property(t => t.Descripcion)
            //        .HasMaxLength(250);
            //});
        }
        public DbSet <Tarea> Tareas { get; set; }
        public DbSet<Paso> Pasos { get; set; }
        public DbSet<ArchivoAdjunto> ArchivosAdjuntos { get; set; }
    }
}
