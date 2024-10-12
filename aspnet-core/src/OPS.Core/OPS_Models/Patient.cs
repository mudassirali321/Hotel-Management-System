using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OPS.OPS_Models
{
    [Table("Patients")]
    public class Patient : Entity<int>
    {
        // public int Id { get; set; }
        public string PatientName { get; set; }
        public string FatherName { get; set; }
        public string Cell { get; set; }
        public int Age { get; set; }
        public string Address { get; set; }
        public int Cnic { get; set; }
        public string Disease { get; set; }
    }
}
