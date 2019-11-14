using Microsoft.EntityFrameworkCore;
using SimplePhoneBook.Core.Entities;
using SimplePhoneBook.Core.Interfaces.Services;
using SimplePhoneBook.Core.Repositories;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SimplePhoneBook.Core.ServiceLayer
{
    public class PhoneBookService: IPhoneBookService
    {
        private readonly IGenericRepository<PhoneBook> _phoneBookRepository;
        private readonly IGenericRepository<PhoneBookEntry> _phoneBookEntryRepository;

        public PhoneBookService( IGenericRepository<PhoneBook> phoneBookRepository, IGenericRepository<PhoneBookEntry> phoneBookEntryRepository)
        {
            _phoneBookRepository = phoneBookRepository;
            _phoneBookEntryRepository = phoneBookEntryRepository;
        }

        public async Task<PhoneBook> AddPhoneBookAsync(string name)
        {
            await IsExisting(name);

            var phoneBook = new PhoneBook {Name = name};

            await _phoneBookRepository.AddAsync(phoneBook);
            await _phoneBookRepository.SaveChangesAsync();
            return phoneBook;
        }

        public async Task DeletePhoneBookAsync(int id)
        {
            var phoneBook = await GetPhoneBookByIdAsync(id);

            if (phoneBook == null)
                throw new Exception("Phone book not found");

            //should consider setting up cascading deletes
            var entriesToDelete = phoneBook.PhoneBookEntries.Select(a => a);

            if (entriesToDelete != null)
                _phoneBookEntryRepository.DeleteMany(entriesToDelete);

            _phoneBookRepository.Delete(phoneBook);

            await _phoneBookRepository.SaveChangesAsync();
        }

        public async Task EditPhoneBookAsync(PhoneBook phoneBook)
        {
            var book = await GetPhoneBookByIdAsync(phoneBook.Id);

            if (book == null)
                throw new Exception("Phone book does not exist");

            book.Name = phoneBook.Name;

            _phoneBookRepository.Update(book);
            await _phoneBookRepository.SaveChangesAsync();
        }

        public async Task<PhoneBook> GetPhoneBookByIdAsync(int id)
        {
            var phoneBook = await _phoneBookRepository.FindByIdAsync(id);

            return phoneBook;
        }

        public async Task<IList<PhoneBook>> GetPhoneBooksAsync()
        {
            return await _phoneBookRepository.Entities.Include(a => a.PhoneBookEntries).OrderBy(b => b.Name).ToListAsync();
        }

        private async Task IsExisting(string name)
        {
            var exists = await _phoneBookRepository.Entities.AnyAsync(p => p.Name.ToLower() == name.ToLower());

            if (exists)
                throw new Exception($"Phone book {name} already exists");
        }
    }
}
