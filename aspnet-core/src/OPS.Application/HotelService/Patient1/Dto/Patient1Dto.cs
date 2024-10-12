using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OPS.HotelService.Patient1.Dto
{
   public  class Patient1Dto
    {
         public int Id { get; set; }
        public string PatientName { get; set; }
        public string FatherName { get; set; }

        public int Cell { get; set; }

        public int Age { get; set; }
        public string Address { get; set; }
        public bool isActive { get; set; }
        public int Cnic { get; set; }
        public string Disease { get; set; }

    }
}
