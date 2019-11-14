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
    [Route("api/phonebooks")]
    [ApiController]
    public class PhoneBookController : ControllerBase
    {
        private readonly IPhoneBookService phoneBookService;

        public PhoneBookController(IPhoneBookService phoneBookService)
        {
            this.phoneBookService = phoneBookService; 
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var phoneBooks = await phoneBookService.GetPhoneBooksAsync();
                return new OkObjectResult(phoneBooks);

            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }

        }

        [HttpGet("{id}", Name = "PhoneBookGet")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var phoneBook = await phoneBookService.GetPhoneBookByIdAsync(id);

                if (phoneBook == null)
                    return new NotFoundResult();

                return new OkObjectResult(phoneBook);
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(PhoneBook phoneBookModel)
        {
            //Should use post-model and align data
            try
            {
                var phoneBook = await phoneBookService.AddPhoneBookAsync(phoneBookModel.Name);
                return CreatedAtRoute(
                     routeName: "PhoneBookGet",
                     routeValues: new { id = phoneBook.Id },
                     value: new { Name = phoneBook.Name });
            }
            //should define custom exceptions
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(PhoneBook phoneBookModel)
        {
            try
            {
                await phoneBookService.EditPhoneBookAsync(phoneBookModel);
                return new OkResult();
            }
            //should define custom exception
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await phoneBookService.DeletePhoneBookAsync(id);
                return new OkResult();
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
        }

    }
}
