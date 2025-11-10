using Api_inmobiliaria.DataBase;
using Microsoft.AspNetCore.Mvc;
using Api_inmobiliaria.Models.Request;
using Api_inmobiliaria.Models.Response;

namespace Api_inmobiliaria.Controllers;

[Route("Sorteo/api/[controller]")]
[ApiController]
public class Login : ControllerBase
{
    private readonly FuncionesDB _funcionesDB = new();

    [HttpPost]
    async public Task<ResponseLogin> Logeo([FromBody] RequestLogin request)
    {
        ResponseLogin resul = await _funcionesDB.Login(request.Email.ToLower(), request.Password);
        return resul;
    }
}