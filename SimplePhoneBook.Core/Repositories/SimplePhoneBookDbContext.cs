using Microsoft.EntityFrameworkCore;
using SimplePhoneBook.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SimplePhoneBook.Core.Repositories
{
    public class SimplePhoneBookDbContext: DbContext
    {
        public DbSet<PhoneBook> PhoneBooks { get; set; }
        public DbSet<PhoneBookEntry> PhoneBookEntries { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //TODO: Move to config
            optionsBuilder.UseSqlite("Data Source=bin\\SimplePhoneBook.db");
            optionsBuilder.UseLazyLoadingProxies();
        }
    }
}
