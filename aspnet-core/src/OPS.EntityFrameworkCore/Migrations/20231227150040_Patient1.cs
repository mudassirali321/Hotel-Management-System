using Microsoft.EntityFrameworkCore.Migrations;

namespace OPS.Migrations
{
    public partial class Patient1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_AddPatient1",
                table: "AddPatient1");

            migrationBuilder.RenameTable(
                name: "AddPatient1",
                newName: "Patient1");

            migrationBuilder.AddColumn<string>(
                name: "FatherName",
                table: "AbpUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Patient1",
                table: "Patient1",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Patient1",
                table: "Patient1");

            migrationBuilder.DropColumn(
                name: "FatherName",
                table: "AbpUsers");

            migrationBuilder.RenameTable(
                name: "Patient1",
                newName: "AddPatient1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AddPatient1",
                table: "AddPatient1",
                column: "Id");
        }
    }
}
