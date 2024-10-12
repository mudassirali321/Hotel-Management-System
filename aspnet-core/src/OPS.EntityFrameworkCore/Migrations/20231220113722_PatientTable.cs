using Microsoft.EntityFrameworkCore.Migrations;

namespace OPS.Migrations
{
    public partial class PatientTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                           name: "Patients",
                           columns: table => new
                           {
                               Id = table.Column<int>(type: "int", nullable: false)
                                   .Annotation("SqlServer:Identity", "1, 1"),
                               PatientName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                               FatherName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                               Cell = table.Column<string>(type: "nvarchar(max)", nullable: true),
                               Age = table.Column<int>(type: "int", nullable: false),
                               Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                               Cnic = table.Column<int>(type: "int", nullable: false),
                               Disease = table.Column<string>(type: "nvarchar(max)", nullable: true)
                           },
                           constraints: table =>
                           {
                               table.PrimaryKey("PK_Patients", x => x.Id);
                           });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
     name: "Patients");
        }
    }
}
