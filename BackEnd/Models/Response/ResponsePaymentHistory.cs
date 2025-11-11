namespace Api_inmobiliaria.Models.Response
{
    public class ResponsePaymentHistory
    {
        public required string IdSorteo { get; set; }
        public required string IdUsuario { get; set; }
        public required string IdTicket { get; set; }
        public required string Title { get; set; }
        public required string EstadoPago { get; set; }
        public required decimal MontoTotal { get; set; }
        public required string MetodoPago { get; set; }
        public required DateTime FechaCompra { get; set; }
        public required string Comprobante { get; set; }
    }
}