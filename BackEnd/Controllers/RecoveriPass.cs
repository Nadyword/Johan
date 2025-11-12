using Api_inmobiliaria.Services.SendMails;
using Api_inmobiliaria.Models.Response;
using Api_inmobiliaria.Models.Request;
using Api_inmobiliaria.DataBase;
using Microsoft.AspNetCore.Mvc;

namespace Api_inmobiliaria.Controllers;

[Route("Sorteo/api/[controller]")]
[ApiController]
public class RecoveryPass(SendMail sendMail) : ControllerBase
{
    private readonly SendMail _sendMail = sendMail;
    private readonly FuncionesDB _funcionesDB = new();

    [HttpPost]
    public async Task<ResponseMessage> SendMail([FromBody] RequestSendMail requestSendMail)
    {
       return await _sendMail.SendAsyncRecoveryPass(requestSendMail.To);
    }

    [HttpPut]
    public async Task<ResponseMessage> RestorePass([FromBody] RequestUpdatePass requestUpdatePass)
    {
        return await _funcionesDB.UpdatePass(requestUpdatePass.Codigo, requestUpdatePass.NewPass);
    }
}