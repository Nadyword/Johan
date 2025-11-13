using Api_inmobiliaria.Services.SendMails;
using Api_inmobiliaria.Models.Response;
using Api_inmobiliaria.Models.Request;
using Api_inmobiliaria.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Api_inmobiliaria.DataBase;

namespace Api_inmobiliaria.Controllers;

[Route("Sorteo/api/[controller]")]
[ApiController]
public class Tickets(SendMail sendMail) : ControllerBase
{
    private readonly SendMail _sendMail = sendMail;
    private readonly QueriesDB _QueriesDB = new();

    [HttpGet("Metricas")]
    public async Task<MetricasTickets> MetricasTickets()
    {
        return await _QueriesDB.MetricasTickets();
    }

    [HttpPost("Rechazado")]
    public async Task<ResponseMessage> SendMailR([FromBody] RequestManarTicket requestManarTicket)
    {
        return await _sendMail.SendAsyncRecoveryRechazado(requestManarTicket.IdCompra, requestManarTicket.Motivo, requestManarTicket.Tokken);
    }


    [HttpPost("Aprobado")]
    public async Task<ResponseMessage> SendMailA([FromBody] RequestManarTicket requestManarTicket)
    {
        return await _sendMail.SendAsyncRecoveryAprobado(requestManarTicket.IdCompra, requestManarTicket.Motivo, requestManarTicket.Tokken);
    }
}