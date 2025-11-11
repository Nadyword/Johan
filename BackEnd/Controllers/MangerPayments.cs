using Api_inmobiliaria.Models.Response;
using Microsoft.AspNetCore.Mvc;
using Api_inmobiliaria.DataBase;

namespace Api_inmobiliaria.Controllers;

[Route("Sorteo/api/[controller]")]
[ApiController]
public class MangerPayments : ControllerBase
{
    private readonly QueriesDB _queriesDB = new();

    [HttpGet("{Tokken}")]
    async public Task<ResponsePaymentHistory[]> BuyTicket(string Tokken)
    {
        if (Tokken == "753951")
        { 
            return await _queriesDB.PaymentHistory();
        }

        return [];
    }
}