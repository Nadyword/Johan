using Api_inmobiliaria.Models.Request;
using Microsoft.AspNetCore.Mvc;
using Api_inmobiliaria.DataBase;

namespace Api_inmobiliaria.Controllers;

[Route("Inmo/api/[controller]")]
[ApiController]
public class Register : ControllerBase
{
    private readonly FuncionesDB _funcionesDB = new();

    [HttpPost]
    public int Post([FromBody] RequestRegister request)
    {
       return _funcionesDB.Register(request.Name, request.Email.ToLower(), request.Password, request.Telefono, request.FechaNacimiento);
    }
}
