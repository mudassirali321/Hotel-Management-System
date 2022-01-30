using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.UI;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OPS.Authorization.Users;
using OPS.HotelService.Employee.Dto;
using OPS.OPS_Models;

namespace OPS.HotelService.Employee
{
    public class EmployeeService : OPSAppServiceBase
    {
        private readonly IRepository<AddEmployee> _employeeRepository;
        private readonly UserManager _userManager;
        private readonly IRepository<User, long> _userRepository;
        private readonly IPasswordHasher<User> _passwordHasher;


        public EmployeeService(
            IRepository<AddEmployee>
            addEmployeeRepository,
            UserManager userManager,
             IPasswordHasher<User> passwordHasher,
            IRepository<User, long> userRepository
            )
        {
            this._employeeRepository = addEmployeeRepository;
            _userManager = userManager;
            _userRepository = userRepository;
            _passwordHasher = passwordHasher;
        }




        [HttpGet]
        public async Task<List<EmployeeDto>> getAllEmployee()
        {
            var query = await _userRepository.GetAll().Select(x => new EmployeeDto
            {
                Id = x.Id,
                FirstName = x.Name,
                LastName = x.Surname,
                isActive = x.IsActive,
                EmailAddress = x.EmailAddress,
                Age = x.Age,
                EmployeeType = x.EmployeeType,
                Gender = x.Gender,
                UserName = x.UserName,
                Password= x.Password


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
        public async Task<bool> UpdateEmployee(EmployeeDto input)
        {
            if (input.Id != 0)
            {
                var query = _userRepository.Get(input.Id);
                query.Id = input.Id;
                query.Name = input.FirstName;
                query.UserName = input.UserName;
                query.Surname = input.LastName;
                query.EmployeeType = input.EmployeeType;
                query.Age = Convert.ToInt32(input.Age);
                query.Gender = input.Gender;
                query.IsActive = input.isActive;
                query.EmailAddress = input.EmailAddress;
                await _userRepository.UpdateAsync(query);
                //await CurrentUnitOfWork.SaveChangesAsync();
                if (input.Password != null)
                {
                    query.Password = _passwordHasher.HashPassword(query, input.Password);
                }
               
                CurrentUnitOfWork.SaveChanges();
                return true;
                

            }
            //Insert Employee
            else
            {
                var employee = new User();
                employee.Name = input.FirstName;
                employee.UserName = input.UserName;
                employee.Surname = input.LastName;
                employee.EmployeeType = input.EmployeeType;
                employee.Age = Convert.ToInt32(input.Age);
                employee.Gender = input.Gender;
                employee.IsActive = input.isActive;
                employee.IsEmailConfirmed = true;
                employee.EmailAddress = input.EmailAddress;


                await _userManager.InitializeOptionsAsync(AbpSession.TenantId);

                CheckErrors(await _userManager.CreateAsync(employee, input.Password));
                CurrentUnitOfWork.SaveChanges();
                //await _employeeRepository.InsertAsync(employee);
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
        public async Task<bool> deleteEmployee(int employeeId)
        {
            var employee = _userRepository.Get(employeeId);
            if (employee != null)
            {
                await _userRepository.DeleteAsync(employeeId);
                return true;

            }
            else
            {
                throw new UserFriendlyException("Error In Deleting record");
            }
        }
    }
}

