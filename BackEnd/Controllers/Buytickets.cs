using Api_inmobiliaria.Models.Response;
using Api_inmobiliaria.Models.Request;
using Api_inmobiliaria.DataBase;
using Microsoft.AspNetCore.Mvc;

namespace Api_inmobiliaria.Controllers;

[Route("Sorteo/api/[controller]")]
[ApiController]
public class Buytickets : ControllerBase
{
    private readonly FuncionesDB _funcionesDB = new();
    private readonly QueriesDB _queriesDB = new();

    [HttpPost]
    async public Task<ResponseMessage> BuyTicket([FromBody] RequestBuyTicket request)
    {
        return await _funcionesDB.BuyTicket(request);
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