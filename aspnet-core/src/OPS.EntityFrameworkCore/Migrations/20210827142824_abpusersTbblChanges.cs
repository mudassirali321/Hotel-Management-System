using Microsoft.EntityFrameworkCore.Migrations;

namespace OPS.Migrations
{
    public partial class abpusersTbblChanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Age",
                table: "AbpUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "EmployeeType",
                table: "AbpUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Gender",
                table: "AbpUsers",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Age",
                table: "AbpUsers");

            migrationBuilder.DropColumn(
                name: "EmployeeType",
                table: "AbpUsers");

            migrationBuilder.DropColumn(
                name: "Gender",
                table: "AbpUsers");
        }
    }
}
