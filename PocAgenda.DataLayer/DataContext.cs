using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PocAgenda.Entities.Models;
using System.Security.Cryptography.X509Certificates;

namespace PocAgenda.DataLayer
{
    public class DataContext : IdentityDbContext
    {
        public DbSet<Contacts> Contacts { get; set; }

        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Contacts>()
                .ToTable("Contacts", "dbo")
                .HasKey(x => x.Id);
            builder.Entity<Contacts>()
                .Property(x => x.FirstName)
                .HasMaxLength(64)
                .IsRequired();
            builder.Entity<Contacts>()
                .Property(x => x.MiddleName)
                .HasMaxLength(64);
            builder.Entity<Contacts>()
                .Property(x => x.LastName)
                .HasMaxLength(128)
                .IsRequired();
            builder.Entity<Contacts>()
                .Property(x => x.UserId)
                .HasMaxLength(450)
                .IsRequired();

            builder.Entity<ContactPhones>()
                .ToTable("ContactPhones", "dbo")
                .HasKey(x => x.Id);
            builder.Entity<ContactPhones>()
                .HasOne(c => c.Contact)
                .WithMany(x => x.Phones)
                .HasForeignKey(c => c.ContactId);


            base.OnModelCreating(builder);
        }
    }
}
