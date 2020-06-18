using System.Collections.Generic;

namespace PocAgenda.Entities.Models
{
    public class Contacts
    {
        public Contacts()
        {
            Phones = new List<ContactPhones>();
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string UserId { get; set; }
        public ICollection<ContactPhones> Phones { get; set; }
    }
}
