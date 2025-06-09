using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskCore.Migrations
{
    /// <inheritdoc />
    public partial class AdminRol : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                IF NOT EXISTS(Select Id from AspNetRoles where Id = 'c2a7e6f9-635e-43b9-baae-68b7e08f13be')
                BEGIN

                INSERT AspNetRoles (Id, [Name], [NormalizedName])
                VALUES ('c2a7e6f9-635e-43b9-baae-68b7e08f13be','admin', 'ADMIN')
                END
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"DELETE AspNetRoles Where  Id = 'c2a7e6f9-635e-43b9-baae-68b7e08f13be'");
        }
    }
}
