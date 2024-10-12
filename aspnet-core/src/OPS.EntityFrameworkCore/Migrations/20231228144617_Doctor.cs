using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace OPS.Migrations
{
    public partial class Doctor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Specialist",
                table: "Doctors",
                type: "nvarchar(250)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Doctors",
                type: "nvarchar(250)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "FatherName",
                table: "Doctors",
                type: "nvarchar(250)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Cell",
                table: "Doctors",
                type: "int",
                maxLength: 14,
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "Doctors",
                type: "nvarchar(250)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreationTime",
                table: "Doctors",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<long>(
                name: "CreatorUserId",
                table: "Doctors",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "DeleterUserId",
                table: "Doctors",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletionTime",
                table: "Doctors",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "HasPhoto",
                table: "Doctors",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Doctors",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModificationTime",
                table: "Doctors",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "LastModifierUserId",
                table: "Doctors",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "isActive",
                table: "Doctors",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreationTime",
                table: "Doctors");

            migrationBuilder.DropColumn(
                name: "CreatorUserId",
                table: "Doctors");

            migrationBuilder.DropColumn(
                name: "DeleterUserId",
                table: "Doctors");

            migrationBuilder.DropColumn(
                name: "DeletionTime",
                table: "Doctors");

            migrationBuilder.DropColumn(
                name: "HasPhoto",
                table: "Doctors");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Doctors");

            migrationBuilder.DropColumn(
                name: "LastModificationTime",
                table: "Doctors");

            migrationBuilder.DropColumn(
                name: "LastModifierUserId",
                table: "Doctors");

            migrationBuilder.DropColumn(
                name: "isActive",
                table: "Doctors");

            migrationBuilder.AlterColumn<string>(
                name: "Specialist",
                table: "Doctors",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(250)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Doctors",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(250)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "FatherName",
                table: "Doctors",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(250)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Cell",
                table: "Doctors",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldMaxLength: 14);

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "Doctors",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(250)",
                oldNullable: true);
        }
    }
}
