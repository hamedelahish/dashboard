using Dashboard.DTOs;
using Dashboard.Models;
using Microsoft.AspNetCore.Mvc;

namespace Dashboard.Services
{
    public interface IUserService
    {
        Task<bool> ChangePassword(string userName, string currentPassword, string newPassword);
        Task<bool> RemoveUser(int userId);
        Task<bool> UpdateUserAndCustomer(UserCustomerDto userCustomerDto);
        Task<bool> AddUserWithCustomer(UserCustomerDto dto);
        Task<PagedResult<UserDto>> GetAllUsers(string fullName,int pageNumber, int pageSize);
    }

}
