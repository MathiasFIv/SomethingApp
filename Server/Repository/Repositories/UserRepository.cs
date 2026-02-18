using Microsoft.EntityFrameworkCore;
using Repository.DbContext;
using Repository.Entities;
using Repository.Repositories.Interfaces;

namespace Repository.Repositories;

public class UserRepository : Repository<User>, IUserRepository
{
    public UserRepository(AppDbContext context) : base(context)
    {
    }

    public Task<User?> GetByEmailAsync(string email)
    {
        return _dbSet.FirstOrDefaultAsync(u => u.Email == email);
    }
}