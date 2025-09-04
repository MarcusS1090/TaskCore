using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskCore.Migrations
{
    /// <inheritdoc />
    public partial class ArchivoAdjuntoTitulo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Titutlo",
                table: "ArchivosAdjuntos",
                newName: "Titulo");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Titulo",
                table: "ArchivosAdjuntos",
                newName: "Titutlo");
        }
    }
}
