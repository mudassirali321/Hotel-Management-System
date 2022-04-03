using Abp.Domain.Repositories;
using OPS.HotelService.DemoService.dto;
using OPS.OPS_Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OPS.HotelService.DemoService
{
    public class DemoAppService : OPSAppServiceBase
    {
        private readonly IRepository<Demo> _demoreposotry;
        public DemoAppService(IRepository<Demo> demoreposotry)
        {
          
            _demoreposotry = demoreposotry;
        }

        public async Task<List<DemoOutputDto>> GetAll()
        {
            var query = _demoreposotry.GetAll().Select(z=>new DemoOutputDto() {
               Age =z.Age,
               FirstName=z.FirstName,
               Gender=z.Gender
            }).ToList();
            return query;
        }

        public async Task CreateOrUpdate(DemoOutputDto input)
        {
            if (input.Id>0)
            {
                await Update(input);
            }
            else
            {
                var query = new Demo();
                query.FirstName = input.FirstName;
                query.LastName = input.LastName;
                await _demoreposotry.InsertAsync(query);
            }
        }
        private async Task Update(DemoOutputDto input)
        {
            var query = await _demoreposotry.GetAsync(input.Id);
            query.FirstName = input.FirstName;
            query.LastName = input.LastName;
            await _demoreposotry.UpdateAsync(query);
        }
    }
}
