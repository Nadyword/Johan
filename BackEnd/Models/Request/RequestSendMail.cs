using System.ComponentModel.DataAnnotations;

namespace Api_inmobiliaria.Models.Request
{
    public class RequestSendMail
    {
        [Required]
        [EmailAddress(ErrorMessage = "El formato del correo electrónico no es válido.")]
        public required string To { get; set; }
    }
}
