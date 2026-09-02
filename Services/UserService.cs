using TG.Conf;
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
        return _dbContext.Users.ToList();
    }

    public User GetUserById(int id)
    {
        return _dbContext.Users.FirstOrDefault(u => u.Id == id);
    }

    public void AddUser(User user)
    {
        user.Id = _dbContext.Users.Max(u => u.Id) + 1;
        user.CreatedAt = DateTime.Now;
        _dbContext.Users.Add(user);
        _dbContext.SaveChanges();
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