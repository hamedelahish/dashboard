using Dashboard.DTOs;
using Dashboard.Models;

namespace Dashboard.Repositories
{
    public interface IUserRepository
    {

        Task<bool> RemoveUser(int userId);
        Task<bool> UpdateUserAndCustomer(UserCustomerDto userCustomerDto);
        Task<bool> InsertUserAndCustomer(UserCustomerDto userCustomerDto);
        Task<PagedResult<UserDto>> GetAllUsers(string fullName,int pageNumber, int pageSize);
        Task<UserPasswordDto> GetPasswordData(string userName);
        Task<bool> UpdatePassword(string userName, string newPasswordHash, string newPasswordSalt);
    }

}
