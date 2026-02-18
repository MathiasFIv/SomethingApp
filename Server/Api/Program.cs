using Api.StartupDI;
using StateleSSE.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddStartupServices(builder.Configuration);
builder.Services.AddInMemorySseBackplane();
builder.Services.AddEfRealtime();

var app = builder.Build();

app.UseOpenApi();
app.UseSwaggerUi();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
