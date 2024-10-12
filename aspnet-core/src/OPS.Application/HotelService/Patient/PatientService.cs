using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.UI;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OPS.HotelService.HotelTable.FoodItem.FoodItemDto;
using OPS.OPS_Models;



namespace OPS.HotelService.FoodItem
{
    public class PatientService : OPSAppServiceBase
    {
        private readonly IRepository<Patient> _PatientRepository;
        public PatientService(IRepository<Patient> foodItemRepository)
        {
            this._PatientRepository = foodItemRepository;
        }

        [Authorize]
        public async Task<List<PatientDto>> getAllPatients()
        {


            var Patients = await _PatientRepository.GetAll()
                .Select(obj=>
                new PatientDto { 
                PatientName = obj.PatientName,
                Address = obj.Address,
                Age = obj.Age,
                Cell= obj.Cell,
                Cnic = obj.Cnic,
                FatherName = obj.FatherName,
                Id = obj.Id,
                Disease = obj.Disease
                }).ToListAsync();
                
                
                
               //.Where(x => x.IsDeleted == false).Include(y => y.ItemCategoryFk)
               //                                 .Select(z => new DoctorDto
               //                                 {
               //                                     Id = z.Id,
               //                                     Title = z.Title,
               //                                     Description = z.Description,
               //                                     isActive = z.isActive,
               //                                     SalePrice = z.SalePrice,
               //                                     SaleTaxPrice = z.SaleTaxPrice,
               //                                     HasPhoto = z.HasPhoto,
               //                                     Image = z.Image,
               //                                     ItemCategoryId = z.ItemCategoryId,
               //                                     ItemCatagoryName = z.ItemCategoryFk.Title
               //                                 }).ToListAsync();
           
            
                if (Patients != null)
                {
                return Patients;
                }

                else
                {
                    return null;
                }
            

          

        }

        //   [HttpGet]
        //   public async Task<List<DoctorDto>> getAllActiveItems()
        //   {
        //       var activeItems = await _DoctorRepository.GetAll().Where(x =>x.IsDeleted==false && x.isActive == true).Include(y => y.ItemCategoryFk)
        //                                        .Select(z => new DoctorDto
        //                                        {
        //                                            Id = z.Id,
        //                                            Title = z.Title,
        //                                            Description = z.Description,
        //                                            isActive = z.isActive,
        //                                            SalePrice = z.SalePrice,
        //                                            SaleTaxPrice = z.SaleTaxPrice,
        //                                            Image = z.Image,
        //                                            HasPhoto=z.HasPhoto,
        //                                            ItemCategoryId = z.ItemCategoryId,
        //                                            ItemCatagoryName = z.ItemCategoryFk.Title
        //                                        }).ToListAsync();
        //       if (activeItems != null)
        //       {
        //           return activeItems;
        //       }
        //
        //       else
        //       {
        //           return null;
        //       }
        //
        //   }
        //  
        public async Task<List<PatientDto>> getPatientsById(int patientId)
        {

            var Patients = await _PatientRepository.GetAll().Where(obj=>obj.Id == patientId)
                .Select(obj =>
                new PatientDto
                {
                    PatientName = obj.PatientName,
                    Address = obj.Address,
                    Age = obj.Age,
                    Cell = obj.Cell,
                    Cnic = obj.Cnic,
                    FatherName = obj.FatherName,
                    Id = obj.Id,
                    Disease = obj.Disease
                }).ToListAsync();

            if (Patients != null)
            {
                return Patients;
            }
            else
            {
                return null;
            }

        }
        //   public async Task<List<DoctorDto>> getItemOnCategory(int categoryId)
        //   {
        //
        //       var itemOnCategory = await _DoctorRepository.GetAll().Where(x => x.ItemCategoryId == categoryId && x.IsDeleted == false).Include(y => y.ItemCategoryFk)
        //                                            .Select(z => new DoctorDto
        //                                            {
        //                                                Id = z.Id,
        //                                                Title = z.Title,
        //                                                Description = z.Description,
        //                                                isActive = z.isActive,
        //                                                SalePrice = z.SalePrice,
        //                                                SaleTaxPrice = z.SaleTaxPrice,
        //                                                Image = z.Image,
        //                                                HasPhoto= z.HasPhoto,
        //                                                ItemCategoryId = z.ItemCategoryId,
        //                                                ItemCatagoryName = z.ItemCategoryFk.Title
        //                                            }).ToListAsync();
        //       if (itemOnCategory != null)
        //       {
        //           return itemOnCategory;
        //       }
        //       else
        //       {
        //           return null;
        //       }
        //
        //   }
        //   public async Task<List<DoctorDto>> getActiveItemsOnCategory(int categoryId)
        //   {
        //
        //       var activeItemOnCategory = await _DoctorRepository.GetAll().Where(x => x.ItemCategoryId == categoryId && x.isActive == true && x.IsDeleted==false).Include(y => y.ItemCategoryFk)
        //                                            .Select(z => new DoctorDto
        //                                            {
        //                                                Id = z.Id,
        //                                                Title = z.Title,
        //                                                Description = z.Description,
        //                                                isActive = z.isActive,
        //                                                SalePrice = z.SalePrice,
        //                                                SaleTaxPrice = z.SaleTaxPrice,
        //                                                 Image = z.Image,
        //                                                HasPhoto= z.HasPhoto,
        //                                                ItemCategoryId = z.ItemCategoryId,
        //                                                ItemCatagoryName = z.ItemCategoryFk.Title
        //                                            }).ToListAsync();
        //       if (activeItemOnCategory != null)
        //       {
        //           return activeItemOnCategory;
        //       }
        //       else
        //       {
        //           return null;
        //       }
        //
        //   }
        [HttpPost]
        public async Task<int> updateDoctor(PatientDto input)
        {
            int patientId = 0;
            if (input.Id != 0)
            {
                var item = _PatientRepository.Get(input.Id);
                item.Id = input.Id;
                item.PatientName = input.PatientName;
                item.Age = input.Age;
                item.Cnic = input.Cnic;
                item.Address = input.Address;
                item.Cell = input.Cell;
                item.Disease = input.Disease;
                item.FatherName = input.FatherName;
                var updatePatient = await _PatientRepository.UpdateAsync(item);

                if (updatePatient != null)
                {
                    return patientId = updatePatient.Id;

                }


            }
            //Insert Employee
            else
               
            {
                int doctorId = 0;
                var item = new Patient();
                item.PatientName = input.PatientName;
                item.Age = input.Age;
                item.Cnic = input.Cnic;
                item.Address = input.Address;
                item.Cell = input.Cell;
                item.Disease = input.Disease;
                item.FatherName = input.FatherName;
                var insertDoctor = await _PatientRepository.InsertAsync(item);
                await CurrentUnitOfWork.SaveChangesAsync();
                if (insertDoctor != null)
                {
                    return doctorId = insertDoctor.Id;
                }
            }
            return 0;

        }

           [HttpDelete]
           public async Task<bool> deletepatient(int doctorId)
           {
        
        
               var item = _PatientRepository.Get(doctorId);
               if (item != null)
               {
            await _PatientRepository.DeleteAsync(item);
                   return true;
               }
               else
               {
                   throw new UserFriendlyException("Error In Deleting record");
               }
           }








    }
}
