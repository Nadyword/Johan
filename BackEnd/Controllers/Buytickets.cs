using Api_inmobiliaria.Models.DTOs.Tablas;
using Api_inmobiliaria.Services.SendMails;
using Api_inmobiliaria.Models.Response;
using Api_inmobiliaria.Models.Request;
using Api_inmobiliaria.DataBase;
using Microsoft.AspNetCore.Mvc;

namespace Api_inmobiliaria.Controllers;

[Route("Sorteo/api/[controller]")]
[ApiController]
public class Buytickets(IConfiguration configuration) : ControllerBase
{
    private readonly FuncionesDB _funcionesDB = new();
    private readonly QueriesDB _queriesDB = new();
    private readonly SendMail sendMail = new(configuration);

    [HttpPost]
    async public Task<ResponseMessage> BuyTicket([FromBody] RequestBuyTicket request)
    {
        Usuarios usuarios = await _queriesDB.InfoUsuarios(request.UserId.ToString());
        _ = sendMail.SendAsyncCompra(usuarios);
        return await _funcionesDB.BuyTicket(request, usuarios);
    }

    [HttpPost("753951")]
    async public Task<ResponseMessage> BuyTicketGenerado([FromBody] RequestBuyTicket request)
    {
        Usuarios usuarios = await _queriesDB.InfoUsuarios(request.UserId.ToString());
        ResponseTicketsByUser ticket = await _queriesDB.QueriesViewTicketsByUserLastPurchase(request.UserId.ToString());
        _ = sendMail.SendAsyncRecoveryAprobado(ticket.IdTicket.ToString(), "", "753951");
        return await _funcionesDB.BuyTicket(request, usuarios);
    }

    [HttpGet("User/{userId}")]
    async public Task<ResponseTicketsByUser[]> GetTicksByUser(string userId)
    {
        return  await _queriesDB.QueriesViewTicketsByUser(userId);
    }

    [HttpGet("Ticks/{ticks}")]
    async public Task<ResponseTicketsByUser[]> GetTicksByCodigo(string ticks)
    {
        return await _queriesDB.QueriesViewTicketsByCodigo(ticks);
    }
}