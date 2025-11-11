using System.ComponentModel.DataAnnotations;

namespace Api_inmobiliaria.Models.Request;

public class RequestBuyTicket
{
    [Required(ErrorMessage = "Se requiere el campo ID de sorteo")]
    public required string RaffleId { get; set; }

    [Required(ErrorMessage = "Se requiere el campo ID del usuario")]
    public required int UserId { get; set; }

    [Required(ErrorMessage = "Se requiere el campo valor del boleto")]
    public required decimal PricevoTicket { get; set; }

    [Required(ErrorMessage = "Se requiere el campo Metodo de pago")]
    public required string ModePay { get; set; }

    [Required(ErrorMessage = "Se requiere el campo cantidad de entradas")]
    public required int TicketQuantity { get; set; }

    public string Status { get; set; } = "pendiente";

    [Required(ErrorMessage = "Se requiere el campo Imagen")]
    public required string Image { get; set; }

    public string Note { get; set; } = "pendiente";

    [Required(ErrorMessage = "Se requiere el campo Imagen del sorte")]
    public required string ImagenSorteo { get; set; }
}
