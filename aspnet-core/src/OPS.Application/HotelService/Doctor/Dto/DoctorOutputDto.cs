using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OPS.HotelService.Doctor.Dto
{
    public class DoctorOutputDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string FatherName { get; set; }

        public string Cell { get; set; }

        public int Age { get; set; }
        public string Address { get; set; }
        public bool isActive { get; set; }
        public string Cnic { get; set; }
        public string Specialist { get; set; }
    }
}
