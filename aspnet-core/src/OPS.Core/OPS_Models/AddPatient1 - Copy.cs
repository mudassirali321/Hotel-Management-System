using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace OPS.OPS_Models
{
    [Table("Patient1")]
    public class AddPatient1 : Entity<int>,IFullAudited
    {
        [Column(TypeName = "nvarchar(250)")]
        public string PatientName { get; set; }
      
        [Column(TypeName = "nvarchar(250)")]
        public string FatherName { get; set; }

        [MaxLength(10)]
        [Column(TypeName = "int")]
        public int Age { get; set; }

        [MaxLength(14)]
        [Column(TypeName = "int")]
        public int Cell { get; set; }

        [Column(TypeName = "nvarchar(250)")]
        public string Address { get; set; }

        [Column(TypeName = "nvarchar(250)")]
        public string Disease { get; set; }

        [MaxLength(14)]
        [Column(TypeName = "int")]
        public int Cnic { get; set; }

        [Column(TypeName = "bit")]
        public bool isActive { get; set; }

        //[Column(TypeName = "image")]
        //public string? Image { get; set; }
        public bool HasPhoto { get; set; }
        public long? CreatorUserId { get  ; set  ; }
        public DateTime CreationTime { get  ; set  ; }
        public long? LastModifierUserId { get  ; set  ; }
        public DateTime? LastModificationTime { get  ; set  ; }
        public long? DeleterUserId { get  ; set  ; }
        public DateTime? DeletionTime { get  ; set  ; }
        public bool IsDeleted { get  ; set  ; }
    }
}
