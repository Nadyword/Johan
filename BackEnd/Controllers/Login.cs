using Api_inmobiliaria.Models.Request;
using Microsoft.AspNetCore.Mvc;
using Api_inmobiliaria.DataBase;

namespace Api_inmobiliaria.Controllers;

[Route("Inmo/api/[controller]")]
[ApiController]
public class Login : ControllerBase
{
    private readonly FuncionesDB _funcionesDB = new();

    [HttpPost]
    public int Logeo([FromBody] RequestLogin request)
    {
        return _funcionesDB.Login( request.Email.ToLower(), request.Password);
    }
}