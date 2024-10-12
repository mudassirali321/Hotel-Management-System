using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using Abp.UI;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OPS.Authorization.Users;
using OPS.HotelService.Employee.Dto;

using OPS.HotelService.Doctor.Dto;
using OPS.OPS_Models;

namespace OPS.HotelService.Doctor
{
    public class DoctorService : OPSAppServiceBase
    {
        private readonly IRepository<OPS.OPS_Models.Doctor> _doctorRepository;



        public DoctorService(
            IRepository<OPS.OPS_Models.Doctor>
            addDoctorRepository
            )
        {
            this._doctorRepository = addDoctorRepository;


        }




        [HttpGet]
        public async Task<List<DoctorDto>> getAllDoctor()
        {
        
            var query = await _doctorRepository.GetAll().Select(x => new DoctorDto
            {
               Id = x.Id,
               Name = x.Name,
               FatherName = x.FatherName,
               isActive = x.isActive,
               Cell = x.Cell,
               Age = x.Age,
               Address = x.Address,
               Cnic = x.Cnic,
                Specialist = x.Specialist,


            }).ToListAsync();
            if (query != null)
            {
                return query;
            }

            else
            {
                return null;
            }

        }
        //public async Task<List<AddEmployee>> getAllEmployee()
        //{
        //    var query = await _employeeRepository.GetAll().ToListAsync();
        //    if (query != null)
        //    {
        //        return query;
        //    }

        //    else
        //    {
        //        return null;
        //    }

        //}


        //[HttpPost]
        //public async Task<bool> UpdateEmployee(EmployeeDto input)
        //{
        //    if (input.Id != 0)
        //    {
        //        var query = _employeeRepository.Get(input.Id);
        //        query.Id = input.Id;
        //        query.FirstName = input.FirstName;
        //        query.LastName = input.LastName;
        //        query.EmployeeType = input.EmployeeType;
        //        query.Age = Convert.ToInt32(input.Age);
        //        query.Gender = input.Gender;
        //        query.isActive = input.isActive;
        //        await _employeeRepository.UpdateAsync(query);
        //        await CurrentUnitOfWork.SaveChangesAsync();
        //        return true;

        //    }
        //    //Insert Employee
        //    else
        //    {
        //        var employee = new AddEmployee();
        //        employee.FirstName = input.FirstName;
        //        employee.LastName = input.LastName;
        //        employee.EmployeeType = input.EmployeeType;
        //        employee.Age = Convert.ToInt32(input.Age);
        //        employee.Gender = input.Gender;
        //        employee.isActive = input.isActive;
        //        await _employeeRepository.InsertAsync(employee);
        //        return true;
        //    }
        //}



        [HttpPost]
        public async Task<bool> UpdateAndInsertDoctor(DoctorDto input)
        {
            if (input.Id != 0)
            {
                var query = _doctorRepository.Get(input.Id);
                query.Id = input.Id;
                query.Name = input.Name;
                query.FatherName = input.FatherName;
                query.Cell = input.Cell;
                query.Age = input.Age;
                query.Address =input.Address;
                query.Cnic = input.Cnic;
                query.isActive = input.isActive;
                query.Specialist = input.Specialist;
                await _doctorRepository.UpdateAsync(query);
                //await CurrentUnitOfWork.SaveChangesAsync();

               

                return true;
                

            }
            //Insert Patient1
            else
            {
                var Doctor = new OPS.OPS_Models.Doctor();
                Doctor.Name = input.Name;
                Doctor.FatherName = input.FatherName;
                Doctor.Cell = input.Cell;
                Doctor.Age = input.Age;
                Doctor.Address = input.Address;
                Doctor.Cnic = input.Cnic;
                Doctor.Specialist = input.Specialist;
                Doctor.isActive = input.isActive;
                _doctorRepository.Insert(Doctor);

                return true;
            }
        }


        //[HttpDelete]
        //public async Task<bool> deleteEmployee(int employeeId)
        //{
        //    var employee = _employeeRepository.Get(employeeId);
        //    if (employee != null)
        //    {
        //        await _employeeRepository.DeleteAsync(employeeId);
        //        return true;

        //    }
        //    else
        //    {
        //        throw new UserFriendlyException("Error In Deleting record");
        //    }
        //}

        [HttpDelete]
        public async Task<bool> deleteDoctor(int Id)
        {
            var patient1 = _doctorRepository.Get(Id);
            if (patient1 != null)
            {
                await _doctorRepository.DeleteAsync(Id);
                return true;

            }
            else
            {
                throw new UserFriendlyException("Error In Deleting record");
            }
        }
    }
}

