using Microsoft.EntityFrameworkCore;
using PaymentAPI.Models;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<PaymentDetailContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DevConnection"))
    // options.(builder.Configuration.GetConnectionString("DevConnection")

    );

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors(
    options => options.WithOrigins("http://localhost:4200")
    .AllowAnyHeader()
    .AllowAnyMethod());

app.MapControllers();

app.Run();
