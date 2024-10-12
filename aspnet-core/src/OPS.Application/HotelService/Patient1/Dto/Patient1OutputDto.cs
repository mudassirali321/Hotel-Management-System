using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OPS.HotelService.Patient1.Dto
{
    public class Patient1OutputDto
    {
        public long Id { get; set; }
        public string PatientName { get; set; }
        public string FatherName { get; set; }

        public string Cell { get; set; }

        public int Age { get; set; }
        public string Address { get; set; }
        public bool isActive { get; set; }
        public string Cnic { get; set; }
        public string Disease { get; set; }
    }
}
