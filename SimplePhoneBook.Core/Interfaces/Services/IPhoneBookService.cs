using SimplePhoneBook.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SimplePhoneBook.Core.Interfaces.Services
{
    public interface IPhoneBookService
    {
        Task<PhoneBook> AddPhoneBookAsync(string name);
        Task EditPhoneBookAsync(PhoneBook phoneBook);
        Task<IList<PhoneBook>> GetPhoneBooksAsync();
        Task<PhoneBook> GetPhoneBookByIdAsync(int id);
        Task DeletePhoneBookAsync(int id);
    }
}
