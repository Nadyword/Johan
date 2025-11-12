using System.ComponentModel.DataAnnotations;

namespace Api_inmobiliaria.Models.Request;

public class RequestManarTicket
{
    [Required(ErrorMessage = "Se requiere el campo ID de compra")]
    public required string IdCompra { get; set; }

    [Required(ErrorMessage = "Se requiere el campo Motivo")]
    public required string Motivo { get; set; }

    [Required(ErrorMessage = "Se requiere el campo Tokken")]
    public required string Tokken { get; set; }
}
