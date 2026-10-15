using TG.Conf;
using TG.DTOs;
using TG.Models;
using Microsoft.EntityFrameworkCore;
namespace TG.Services;

public class UserService
{
    private readonly AppDbContext _dbContext;

    public UserService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<User>> GetAllUsers()
    {
        return await _dbContext.Users
        .AsNoTracking()
        .Take(1000)
        .ToListAsync();
    }

    public async Task<User?> GetUserById(int id)
    {
        return await _dbContext.Users
        .AsNoTracking()
        .FirstOrDefaultAsync(u => u.Id == id);
    }

    public async Task<User> AddUser(CreateUserDTO user)
    {
        var newUser = new User
        {
            Name = user.Name,
            Age = user.Age,
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };
        _dbContext.Users.Add(newUser);
        await _dbContext.SaveChangesAsync();

        return newUser;
    }

    // Single UPDATE statement; fields left out of the body keep their current value.
    // Returns false when no row matches the id
    public async Task<bool> UpdateUser(int id, UpdateUserDTO user)
    {
        var affected = await _dbContext.Users
        .Where(u => u.Id == id)
        .ExecuteUpdateAsync(s => s
            .SetProperty(u => u.Name, u => user.Name ?? u.Name)
            .SetProperty(u => u.Age, u => user.Age ?? u.Age)
            .SetProperty(u => u.IsActive, u => user.IsActive ?? u.IsActive));

        return affected > 0;
    }

    // Single DELETE statement; returns false when no row matches the id
    public async Task<bool> DeleteUser(int id)
    {
        var affected = await _dbContext.Users
        .Where(u => u.Id == id)
        .ExecuteDeleteAsync();

        return affected > 0;
    }
}
