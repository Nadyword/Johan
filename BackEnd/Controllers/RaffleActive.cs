using Api_inmobiliaria.Models.DTOs.Tablas;
using Microsoft.AspNetCore.Mvc;
using Api_inmobiliaria.DataBase;

namespace Api_inmobiliaria.Controllers;

[Route("Sorteo/api/[controller]")]
[ApiController]
public class RaffleActive : ControllerBase
{
    private readonly QueriesDB _Queries = new();

    [HttpGet]
    async public Task<Raffles[]> ConsulRaffle()
    {
        Raffles[] resul = await _Queries.QueriesRafflesActive();
        return resul;
    }
}