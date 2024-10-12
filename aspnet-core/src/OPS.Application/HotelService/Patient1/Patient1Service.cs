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

using OPS.HotelService.Patient1.Dto;
using OPS.OPS_Models;

namespace OPS.HotelService.Patient1
{
    public class Patient1Service : OPSAppServiceBase
    {
        private readonly IRepository<AddPatient1> _patient1Repository;



        public Patient1Service(
            IRepository<AddPatient1>
            addPatient1Repository
            )
        {
            this._patient1Repository = addPatient1Repository;


        }




        [HttpGet]
        public async Task<List<Patient1Dto>> getAllPatient1()
        {
        
            var query = await _patient1Repository.GetAll().Select(x => new Patient1Dto
            {
               Id = x.Id,
               PatientName = x.PatientName,
               FatherName = x.FatherName,
               isActive = x.isActive,
               Cell = x.Cell,
               Age = x.Age,
               Address = x.Address,
               Cnic = x.Cnic,
               Disease = x.Disease,


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
        public async Task<bool> UpdatePatient1(Patient1Dto input)
        {
            if (input.Id != 0)
            {
                var query = _patient1Repository.Get(input.Id);
                query.Id = input.Id;
                query.PatientName = input.PatientName;
                query.FatherName = input.FatherName;
                query.Cell = input.Cell;
                query.Age = input.Age;
                query.Address =input.Address;
                query.Cnic = input.Cnic;
              //  query.IsActive = input.isActive;
                query.Disease = input.Disease;
                await _patient1Repository.UpdateAsync(query);
                //await CurrentUnitOfWork.SaveChangesAsync();

               

                return true;
                

            }
            //Insert Patient1
            else
            {
                var Patient1 = new AddPatient1();
                Patient1.PatientName = input.PatientName;
                Patient1.FatherName = input.FatherName;
                Patient1.Cell = input.Cell;
                Patient1.Age = input.Age;
                Patient1.Address = input.Address;
                Patient1.Cnic = input.Cnic;
                Patient1.Disease = input.Disease;

                _patient1Repository.Insert(Patient1);

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
        public async Task<bool> deletePatient1(int Id)
        {
            var patient1 = _patient1Repository.Get(Id);
            if (patient1 != null)
            {
                await _patient1Repository.DeleteAsync(Id);
                return true;

            }
            else
            {
                throw new UserFriendlyException("Error In Deleting record");
            }
        }
    }
}

