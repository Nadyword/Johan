namespace Api_inmobiliaria.Models
{
    public class RequestJwt<T>
    {
        public required string Token { get; set; }
        public required T Data { get; set; }
    }
}
