using Microsoft.EntityFrameworkCore;
using TG.Conf;
using TG.DTOs;
using TG.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContextPool<AppDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        new MySqlServerVersion(new Version(8, 0))
    ));
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<CreateUserDTO>();

var app = builder.Build();

// Apply pending migrations so a fresh database volume gets the schema on startup
using (var scope = app.Services.CreateScope())
{
    scope.ServiceProvider.GetRequiredService<AppDbContext>().Database.Migrate();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
