namespace Api_inmobiliaria.Models.Response
{
    public class ResponseTicketsByUser
    {
        public required string TituloSorteo { get; set; }
        public required string CodigoTicket { get; set; }
        public DateTime FechaCompra { get; set; }
        public DateTime? FechaFinalizacion { get; set; } 
        public bool? SorteoActivo { get; set; }         
        public required string EstadoPago { get; set; }
        public required string IdSorteo { get; set; }
        public required string IdUsuario { get; set; }
        public required string ImagenSorteo { get; set; }
    }
}