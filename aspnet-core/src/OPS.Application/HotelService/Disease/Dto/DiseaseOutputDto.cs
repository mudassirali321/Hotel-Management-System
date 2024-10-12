using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OPS.HotelService.Doctor.Dto
{
    public class DiseaseOutputDto
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string IsEnabled { get; set; }
        public string Symptoms { get; set; }
        public bool isActive { get; set; }

    }
}
