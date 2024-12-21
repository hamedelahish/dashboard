using Dashboard.DTOs;
using Dashboard.Services;
using Microsoft.AspNetCore.Mvc;

namespace Dashboard.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }


        [HttpPost("ChangePassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var result = await _userService.ChangePassword(dto.Username, dto.CurrentPassword, dto.NewPassword);
                if (result)
                {
                    return Ok(new { message = "رمز عبور با موفقیت تغییر یافت." });
                }

                return StatusCode(500, "خطا در تغییر رمز عبور.");
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("RemoveUser")]
        public async Task<IActionResult> RemoveUser([FromQuery] int userId)
        {
            if (userId <= 0)
            {
                return BadRequest(new { message = "ایدی نامعتبر" });
            }

            var result = await _userService.RemoveUser(userId);

            if (result)
            {
                return Ok(new { message = "کاربر با موفقیت حذف شد" });
            }
            else
            {
                return StatusCode(500, "خطا حذف کاربر");
            }
        }


        [HttpPut("UpdateUserAndCustomer")]
        public async Task<IActionResult> UpdateUserAndCustomer([FromBody] UserCustomerDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _userService.UpdateUserAndCustomer(dto);

            if (result)
            {
                return Ok(new { message = "ویرایش با موفقیت انجام شد" });
            }
            else
            {
                return StatusCode(500, "خطا در ویرایش کاربر");
            }
        }

        [HttpPost("InsertUserAndCustomer")]
        public async Task<IActionResult> InsertUserAndCustomer([FromBody] UserCustomerDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _userService.AddUserWithCustomer(dto);

            if (result)
            {
                return Ok(new { message = "کاربر با موفقیت ایجاد شد" });
            }
            else
            {
                return StatusCode(500, "خطا در ایجاد کاربر جدید");
            }
        }

        [HttpGet("GetAllUsers")]
        public async Task<IActionResult> GetAllUsers(string fullName,int pageNumber = 1, int pageSize = 10)
        {
            var users = await _userService.GetAllUsers(fullName,pageNumber, pageSize);
            return Ok(users);
        }

    }

}

