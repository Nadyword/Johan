using Api_inmobiliaria.Models.DTOs.Tablas;
using Microsoft.AspNetCore.Mvc;
using Api_inmobiliaria.DataBase;

namespace Api_inmobiliaria.Controllers;

[Route("Sorteo/api/[controller]")]
[ApiController]
public class Usuario() : ControllerBase
{
    private readonly QueriesDB _queriesDB = new();

    [HttpGet]
    async public Task<Usuarios[]> GetUsu()
    {
        Usuarios[] usuarios = await _queriesDB.InfoUsuarios();
        return usuarios;
    }
}