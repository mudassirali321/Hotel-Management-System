using Abp.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OPS.HotelService.Cruds
{
    public class CrudAppService : OPSAppServiceBase
    {
        private readonly IRepository<Crud> _crudRepository;

        public CrudAppService(IRepository<Crud> crudRepository)
        {
            _crudRepository = crudRepository;
        }

        public async Task CreateCrud(Crud input)
        {
            var crud = new Crud
            {
                Name = input.Name,
                IsActive = input.IsActive,
                Phone = input.Phone,
                Date = input.Date,
            };
            await _crudRepository.InsertAsync(crud);
        }
    }
}
