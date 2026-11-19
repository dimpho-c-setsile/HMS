using Hospital_management_system.Models;
using Supabase;
using Serilog;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
//Add swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Host.UseSerilog(
    (context, configuration)=> configuration.ReadFrom.Configuration(context.Configuration));
//initialize supabase
var url = builder.Configuration["Supabase:Url"];
var key = builder.Configuration["Supabase:ServiceRoleKey"];

if (string.IsNullOrWhiteSpace(url))
{
    throw new Exception("Supabase URL is missing.");
}

if (string.IsNullOrWhiteSpace(key))
{
    throw new Exception("Supabase key is missing.");
}

var options = new SupabaseOptions
{   AutoRefreshToken =true,
    AutoConnectRealtime = true
};


var supabase = new Client(url, key, options);
await supabase.InitializeAsync();
Console.WriteLine("✅ Supabase initialized!");
builder.Services.AddSingleton(provider => new Supabase.Client(url,key,options));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    // Enable Swagger
    app.UseSwagger();
    app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "Hospital_management_system API v1"); });

}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
