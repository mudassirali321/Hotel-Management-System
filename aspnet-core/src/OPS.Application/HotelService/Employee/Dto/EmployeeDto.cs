using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OPS.HotelService.Employee.Dto
{
   public  class EmployeeDto
    {
         public long Id { get; set; }
        public string FirstName { get; set; }
        public string UserName { get; set; }

        public string LastName { get; set; }
        public string EmployeeType { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public bool isActive { get; set; }
        public string EmailAddress { get; set; }
        public string Password { get; set; }

    }
}
