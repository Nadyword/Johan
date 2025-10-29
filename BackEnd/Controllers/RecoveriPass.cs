using Api_inmobiliaria.Services.SendMails;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;


namespace Api_inmobiliaria.Controllers;

[Route("Inmo/api/[controller]")]
[ApiController]
public class RecoveriPass(SendMail sendMail) : ControllerBase
{
    private readonly SendMail _sendMail = sendMail;

    [HttpPost]
    public async Task<bool> SendMail()
    {
       return await _sendMail.SendAsync("solotrading915@gmail.com","pruebas", "hola", false);
    }
}
