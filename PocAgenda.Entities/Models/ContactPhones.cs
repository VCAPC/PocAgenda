using System;
using System.Collections.Generic;
using System.Text;

namespace PocAgenda.Entities.Models
{
    public class ContactPhones
    {
        public int Id { get; set; }
        public int ContactId { get; set; }
        public int PhoneTypeId { get; set; }
        public virtual Contacts Contact { get; set; }
    }
}
