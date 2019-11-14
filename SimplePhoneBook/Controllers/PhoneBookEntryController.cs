using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SimplePhoneBook.Core.Entities;
using SimplePhoneBook.Core.Interfaces.Services;

namespace SimplePhoneBook.Controllers
{
    [Route("api/phonebookEntries")]
    [ApiController]
    public class PhoneBookEntryController : ControllerBase
    {
        private readonly IPhoneBookEntryService phoneBookEntryService;

        #region Constructor
        public PhoneBookEntryController(IPhoneBookEntryService phoneBookEntryService)
        {
            this.phoneBookEntryService = phoneBookEntryService;
        }

        #endregion

        #region Get

        [HttpGet]
        [Route("getBookEntries/{phoneBookId}", Order = 1)]
        public async Task<IActionResult> GetBookEntries(int phoneBookId)
        {
            try
            {
                var phoneBookEntries = await phoneBookEntryService.GetPhoneBookEntriesAsync(phoneBookId);
                return new OkObjectResult(phoneBookEntries);

            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
        }

        [HttpGet]
        [Route("getByPhoneNumber/", Order = 1)]
        public async Task<IActionResult> GetByPhoneNumber(string phoneNumber)
        {
            try
            {
                var phoneEntry = await phoneBookEntryService.GetPhoneBookEntryByNumberAsync(phoneNumber);

                if (phoneEntry == null)
                    return NotFound();
                
                return new OkObjectResult(phoneEntry);
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }

        }

        #endregion

        #region Add/Edit

        [HttpPost("{phoneBookId}")]
        public async Task<IActionResult> Post(int phoneBookId, PhoneBookEntry phoneBookEntryModel)
        {//should use post-model
            try
            {
                await phoneBookEntryService.AddPhoneBookEntryAsync(phoneBookEntryModel.Name, phoneBookEntryModel.PhoneNumber, phoneBookId);

                //Should return created response with the url of the created object
                return new OkResult();
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(PhoneBookEntry phoneBookEntryModel)
        {//should use view-edit-models
            try
            {
                await phoneBookEntryService.EditPhoneBookEntryAsync(phoneBookEntryModel);
                return new OkResult();
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
        }

        #endregion

        #region Delete

        [HttpDelete("{phoneBookId}/{id}")]
        public async Task<IActionResult> Delete(int phoneBookId, int id)
        {
            try
            {
                await phoneBookEntryService.DeletePhoneBookEntryAsync(phoneBookId, id);
                return new OkResult();
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
        }

        #endregion
    }

}
