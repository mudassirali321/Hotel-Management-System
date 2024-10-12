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

using OPS.HotelService.Disease.Dto;
using OPS.OPS_Models;
using OPS.HotelService.Doctor.Dto;

namespace OPS.HotelService.Disease
{
    public class DiseaseService : OPSAppServiceBase
    {
        private readonly IRepository<OPS.OPS_Models.Disease> _diseaseRepository;



        public DiseaseService(
            IRepository<OPS.OPS_Models.Disease>
            addDiseaseRepository
            )
        {
            this._diseaseRepository = addDiseaseRepository;


        }




        [HttpGet]
        public async Task<List<DiseaseDto>> getAllDisease()
        {
        
            var query = await _diseaseRepository.GetAll().Select(x => new DiseaseDto
            {
               Id = x.Id,
               Title = x.Title,
               IsEnabled = x.IsEnabled.ToString(),
               isActive = x.isActive,
               Symptoms = x.Symptoms,


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
        public async Task<bool> UpdateAndInsertDisease(DiseaseDto input)
        {
            if (input.Id != 0)
            {
                var query = _diseaseRepository.Get(input.Id);
                query.Id = input.Id;
                query.Title = input.Title;
                query.IsEnabled = input.IsEnabled=="True"? true: false;
                query.Symptoms = input.Symptoms;
                query.isActive = input.isActive;
                await _diseaseRepository.UpdateAsync(query);
                //await CurrentUnitOfWork.SaveChangesAsync();

               

                return true;
                

            }
            //Insert Patient1
            else
            {
                var Disease = new OPS.OPS_Models.Disease();
                Disease.Title = input.Title;
                Disease.IsEnabled = input.IsEnabled == "True" ? true : false;
                Disease.Symptoms = input.Symptoms;
                Disease.isActive = input.isActive;
                _diseaseRepository.Insert(Disease);

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
        public async Task<bool> deleteDisease(int Id)
        {
            var disease = _diseaseRepository.Get(Id);
            if (disease != null)
            {
                await _diseaseRepository.DeleteAsync(Id);
                return true;

            }
            else
            {
                throw new UserFriendlyException("Error In Deleting record");
            }
        }
    }
}

