namespace TG.Models;

public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Age { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
}