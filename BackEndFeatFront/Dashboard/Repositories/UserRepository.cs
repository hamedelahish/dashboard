using Dapper;
using Dashboard.Data;
using Dashboard.DTOs;
using Dashboard.Helpers;
using System.Data;
using System.Security.Cryptography;
using System.Text;
using System.Transactions;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Dashboard.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DapperContext _context;

        public UserRepository(DapperContext context)
        {
            _context = context;
        }

        public async Task<UserPasswordDto> GetPasswordData(string userName)
        {

            var query = "SELECT PasswordHash, PasswordSalt FROM Users WHERE UserName = @UserName";
            using (var connection = _context.CreateConnection())
            {
                var result = await connection.QueryFirstOrDefaultAsync<UserPasswordDto>(query, new { UserName = userName });
                return result;
            }
        }

        public async Task<bool> UpdatePassword(string userName, string newPasswordHash, string newPasswordSalt)
        {
            var query = "UPDATE Users SET PasswordHash=@PasswordHash,PasswordSalt=@PasswordSalt where Username=@Username;";
            var parameter = new
            {
                UserName = userName,
                PasswordHash = newPasswordHash,
                PasswordSalt = newPasswordSalt
            };

            using (var connection = _context.CreateConnection())
            {
                var result = await connection.ExecuteAsync(query, parameter);
                return result > 0;
            }
        }

        public async Task<bool> RemoveUser(int userId)
        {
            var query = "RemoveUser";
            var parameters = new DynamicParameters();
            parameters.Add("UserId", userId, DbType.Int32);

            using (var connection = _context.CreateConnection())
            {
                using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
                {
                    try
                    {
                        var result = await connection.ExecuteAsync(query, parameters, commandType: CommandType.StoredProcedure);

                        if (result > 0)
                        {
                            transaction.Complete();
                            return true;
                        }

                        return false;
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Error: {ex.Message}");
                        return false;
                    }
                }
            }
        }

        public async Task<bool> UpdateUserAndCustomer(UserCustomerDto dto)
        {
            var query = "UpdateUserAndCustomer";
            var parameters = new DynamicParameters();

            parameters.Add("UserId", dto.UserId, DbType.Int32);
            parameters.Add("FullName", dto.FullName, DbType.String);
            parameters.Add("Email", dto.Email, DbType.String);
            parameters.Add("Phone", dto.Phone, DbType.String);
            parameters.Add("Address", dto.Address, DbType.String);
            parameters.Add("RoleId", dto.RoleId, DbType.Int32);

            using (var connection = _context.CreateConnection())
            {
                using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
                {
                    try
                    {
                        var result = await connection.ExecuteAsync(query, parameters, commandType: CommandType.StoredProcedure);

                        if (result > 0)
                        {
                            transaction.Complete();
                            return true;
                        }

                        return false;
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Error: {ex.Message}");
                        return false;
                    }
                }
            }
        }

        public async Task<bool> InsertUserAndCustomer(UserCustomerDto userCustomerDto)
        {
            var query = "InsertUserAndCustomer";
            var parameters = new DynamicParameters();
            PasswordHelper.CreatePasswordHash(userCustomerDto.Password, out string passwordHash, out string passwordSalt);


            parameters.Add("UserName", userCustomerDto.UserName, DbType.String);
            parameters.Add("FullName", userCustomerDto.FullName, DbType.String);
            parameters.Add("Email", userCustomerDto.Email, DbType.String);
            parameters.Add("Phone", userCustomerDto.Phone, DbType.String);
            parameters.Add("Address", userCustomerDto.Address, DbType.String);
            parameters.Add("PasswordHash", passwordHash, DbType.String);
            parameters.Add("PasswordSalt", passwordSalt, DbType.String);
            parameters.Add("RoleId", userCustomerDto.RoleId, DbType.Int32);

            using (var connection = _context.CreateConnection())
            {
                using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
                {
                    try
                    {
                        var result = await connection.ExecuteAsync(query, parameters, commandType: CommandType.StoredProcedure);

                        if (result > 0)
                        {
                            transaction.Complete();
                            return true;
                        }

                        return false;
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Error: {ex.Message}");
                        return false;
                    }
                }
            }
        }

        public async Task<PagedResult<UserDto>> GetAllUsers(string fullName, int pageNumber, int pageSize)
        {

            using (var connection = _context.CreateConnection())
            {
                var query = "GetAllUser";
                var parameters = new DynamicParameters();
                parameters.Add("@FullName", fullName);
                parameters.Add("@PageNumber", pageNumber);
                parameters.Add("@PageSize", pageSize);

                using (var multi = await connection.QueryMultipleAsync(query, parameters, commandType: CommandType.StoredProcedure))
                {
                    var pagedResult = new PagedResult<UserDto>
                    {
                        PageNumber = pageNumber,
                        PageSize = pageSize,
                        Total = multi.ReadSingle<int>(),
                        Items = multi.Read<UserDto>().ToList(),
                    };

                    return pagedResult;
                }
            }
        }



    }

}
