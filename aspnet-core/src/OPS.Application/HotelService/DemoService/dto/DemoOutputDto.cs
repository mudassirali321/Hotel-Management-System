using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OPS.HotelService.DemoService.dto
{
   public  class DemoOutputDto : EntityDto<int>
    {

        public string FirstName { get; set; }


        public string LastName { get; set; }


        public int Age { get; set; }


        public string Gender { get; set; }
    }
}
