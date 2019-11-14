using System;
using System.Collections.Generic;
using System.Text;

namespace SimplePhoneBook.Core.Entities
{
    public class PhoneBook
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int EntriesCount => PhoneBookEntries.Count;
        public virtual IList<PhoneBookEntry> PhoneBookEntries { get; set; } = new List<PhoneBookEntry>();
        
    }
}
