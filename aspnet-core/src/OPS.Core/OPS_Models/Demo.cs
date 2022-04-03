using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OPS.OPS_Models
{
    [Table("Demos")]
    public class Demo : Entity<int>
    {
       
        public string FirstName { get; set; }

      
        public string LastName { get; set; }

      
        public int Age { get; set; }

       
        public string Gender { get; set; }
    }
}