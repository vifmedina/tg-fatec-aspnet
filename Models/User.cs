using System.ComponentModel.DataAnnotations;

namespace TG.Models;

public class User
{
    public int Id { get; set; }
    [MaxLength(255)]
    public required string Name { get; set; }
    public int Age { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
}
