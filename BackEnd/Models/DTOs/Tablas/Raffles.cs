namespace Api_inmobiliaria.Models.DTOs.Tablas;

public class Raffles
{
    public required string Id { get; set; } 
    public required string Title { get; set; }
    public required string Description { get; set; }
    public required string? Image { get; set; }
    public required decimal Price { get; set; }
    public required decimal TicketPrice { get; set; }
    public required int Stock { get; set; }
    public required int TotalTickets { get; set; }
    public required int SoldTickets { get; set; }
    public required DateTime EndsAt { get; set; }
    public required bool Status { get; set; }
    public required DateTime CreatedAt { get; set; }
    public required DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public required string? Winner { get; set; }
}
