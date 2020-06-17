using System.Collections.Generic;

namespace PocAgenda.Entities.Models
{
    public class Contacts
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string UserId { get; set; }
        public virtual List<ContactPhones> Phones { get; set; }
    }
}
