using SimplePhoneBook.Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SimplePhoneBook.Core.Interfaces.Services
{
    public interface IPhoneBookEntryService
    {
        Task<PhoneBookEntry> AddPhoneBookEntryAsync(string name, string phoneNumber, int phoneBookId);
        Task EditPhoneBookEntryAsync(PhoneBookEntry phoneBookEntry);
        Task<IList<PhoneBookEntry>> GetPhoneBookEntriesAsync(int phoneBookId);
        Task<PhoneBookEntry> GetPhoneBookEntryAsync(int id);
        Task DeletePhoneBookEntryAsync(int phoneBookId, int id);
        Task<PhoneBookEntry> GetPhoneBookEntryByNumberAsync(string phoneNumber);
    }
}
