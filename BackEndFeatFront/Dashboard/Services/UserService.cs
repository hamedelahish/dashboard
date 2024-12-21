using Dashboard.DTOs;
using Dashboard.Helpers;
using Dashboard.Models;
using Dashboard.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dashboard.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
			_userRepository = userRepository;
        }

        public async Task<bool> RemoveUser(int userId)
        {
            return await _userRepository.RemoveUser(userId);
        }

        public async Task<bool> UpdateUserAndCustomer(UserCustomerDto userCustomerDto)
        {
            return await _userRepository.UpdateUserAndCustomer(userCustomerDto);
        }
        public async Task<bool> AddUserWithCustomer(UserCustomerDto dto)
        {
            return await _userRepository.InsertUserAndCustomer(dto);
        }

        public async Task<PagedResult<UserDto>> GetAllUsers(string fullName,int pageNumber, int pageSize)
		{
			return await _userRepository.GetAllUsers(fullName,pageNumber, pageSize);
		}

        public async Task<bool> ChangePassword(string userName, string currentPassword, string newPassword)
        {
            var passwordData = await _userRepository.GetPasswordData(userName);
            if (passwordData == null)
            {
                throw new Exception("کاربر یافت نشد");

            }

            var isCurrentPasswordValid = PasswordHelper.VerifyPasswordHash(currentPassword, passwordData.PasswordHash, passwordData.PasswordSalt);
            if (!isCurrentPasswordValid)
            {

            }

            PasswordHelper.CreatePasswordHash(newPassword, out var newPasswordHash, out var newPasswordSalt);
            return await _userRepository.UpdatePassword(userName, newPasswordHash, newPasswordSalt);

        }
	}

}
