namespace Api_inmobiliaria.Models.Request
{
    public class RequestUpdatePass
    {
        public required string Codigo { get; set; }
        public required string NewPass { get; set; }
    }
}