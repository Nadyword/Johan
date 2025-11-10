using Api_inmobiliaria.Models.DTOs.Tablas;
using Microsoft.AspNetCore.Mvc;
using Api_inmobiliaria.DataBase;
using Api_inmobiliaria.Models.Response;

namespace Api_inmobiliaria.Controllers;

[Route("Sorteo/api/[controller]")]
[ApiController]
public class Register : ControllerBase
{
    private readonly FuncionesDB _funcionesDB = new();

    [HttpPost]
    async public Task<ResponseRegister> Post([FromBody] Usuarios request)
    {
       return await _funcionesDB.Register(request.Identifi, request.Nombre, request.Apellido, request.Email, request.Clave, request.Telefono, request.Genero, request.Pais, request.Fec_naci);
    }
}
