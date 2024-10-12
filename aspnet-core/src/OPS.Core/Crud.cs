﻿using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OPS
{
    public  class Crud : FullAuditedEntity
    {
        public string Name { get; set; }
        public bool? IsActive { get; set; }
        public string Phone { get; set; }
        public DateTime? Date { get; set; }

    }
}
