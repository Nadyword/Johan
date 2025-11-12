namespace Api_inmobiliaria.Models.DTOs;

public class InfoTickets
{
    public string Nombre { get; set; } = null!;
    public string Apellidos { get; set; } = null!;
    public string CodigoTicket { get; set; } = null!;
    public int CantidadTickets { get; set; }
    public decimal MontoTotal { get; set; }
    public string MetodoPago { get; set; } = null!;
    public DateTime FechaCompra { get; set; }
    public required string Email { get; set; }
}
