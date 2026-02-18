using Contracts.Models;
using Contracts.Models.UserModels;

namespace Service.Interfaces;

public interface IUserService : IService<UserDto, CreateUserDto, UpdateUserDto>
{
    Task<AuthResponseDto?> LoginAsync(LoginDto request);
}