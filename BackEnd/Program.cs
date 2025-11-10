using Api_inmobiliaria.Services.SendMails;
using Api_inmobiliaria.DataBase;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});
builder.Services.AddTransient<SendMail>();

ConnectionDB.Initialize(builder.Configuration);
builder.Services.AddControllers();
builder.WebHost.UseUrls("http://localhost:" + builder.Configuration["Port"]);

var app = builder.Build();

app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();
app.Run();