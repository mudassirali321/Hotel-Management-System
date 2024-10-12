using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace OPS.Migrations
{
    public partial class Addemployee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AddPatient1",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PatientName = table.Column<string>(type: "nvarchar(250)", nullable: true),
                    FatherName = table.Column<string>(type: "nvarchar(250)", nullable: true),
                    Age = table.Column<int>(type: "int", maxLength: 10, nullable: false),
                    Cell = table.Column<int>(type: "int", maxLength: 14, nullable: false),
                    Address = table.Column<string>(type: "nvarchar(250)", nullable: true),
                    Disease = table.Column<string>(type: "nvarchar(250)", nullable: true),
                    Cnic = table.Column<int>(type: "int", maxLength: 14, nullable: false),
                    isActive = table.Column<bool>(type: "bit", nullable: false),
                    HasPhoto = table.Column<bool>(type: "bit", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AddPatient1", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AddPatient1");
        }
    }
}
