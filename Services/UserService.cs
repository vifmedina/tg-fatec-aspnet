using TG.Conf;
using TG.DTOs;
using TG.Models;
namespace TG.Services;

public class UserService
{
    private readonly AppDbContext _dbContext;

    public UserService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public IEnumerable<User> GetAllUsers()
    {
        return _dbContext.Users.Skip(0).Take(500).ToList();
    }

    public User? GetUserById(int id)
    {
        return _dbContext.Users.FirstOrDefault(u => u.Id == id);
    }

    public User AddUser(CreateUserDTO user)
    {
        var newUser = new User
        {
            Name = user.Name,
            Age = user.Age,
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };
        var createdUser = _dbContext.Users.Add(newUser);
        _dbContext.SaveChanges();

        return createdUser.Entity;
    }

    public void UpdateUser(User user)
    {
        var existingUser = GetUserById(user.Id);
        if (existingUser != null)
        {
            existingUser.Name = user.Name;
            existingUser.Age = user.Age;
            existingUser.IsActive = user.IsActive;
            _dbContext.SaveChanges();
        }
    }

    public void DeleteUser(int id)
    {
        var userToRemove = GetUserById(id);
        if (userToRemove != null)
        {
            _dbContext.Users.Remove(userToRemove);
            _dbContext.SaveChanges();
        }
    }
}