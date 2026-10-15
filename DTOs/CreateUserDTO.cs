namespace TG.DTOs;

public class CreateUserDTO
{
    public required string Name { get; set; }
    public int Age { get; set; }
    public bool IsActive { get; set; }
}
