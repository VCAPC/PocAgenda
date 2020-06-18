namespace PocAgenda.Entities.Models
{
    public class ContactPhones
    {
        public int Id { get; set; }
        public int ContactId { get; set; }
        public int PhoneTypeId { get; set; }
        public string PhoneNumber { get; set; }
        public string Code { get; set; }
        public string Address { get; set; }
        public string ZipCode { get; set; }
        public virtual Contacts Contact { get; set; }
    }
}
