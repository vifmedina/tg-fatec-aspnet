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
        .ToListAsync();
    }

    public async Task<User?> GetUserById(int id)
    {
        return await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == id);
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
        var createdUser = _dbContext.Users.Add(newUser);
        await _dbContext.SaveChangesAsync();

        return createdUser.Entity;
    }

    public async Task UpdateUser(User user)
    {
        var existingUser = await GetUserById(user.Id);
        if (existingUser != null)
        {
            existingUser.Name = user.Name;
            existingUser.Age = user.Age;
            existingUser.IsActive = user.IsActive;
            await _dbContext.SaveChangesAsync();
        }
    }

    public async Task DeleteUser(int id)
    {
        var userToRemove = await GetUserById(id);
        if (userToRemove != null)
        {
            _dbContext.Users.Remove(userToRemove);
            await _dbContext.SaveChangesAsync();
        }
    }
}