using System.ComponentModel.DataAnnotations;

namespace Api_inmobiliaria.Models.Request
{
    public class RequestLogin
    {
        [Required]
        [EmailAddress(ErrorMessage = "El formato del correo electrónico no es válido.")]
        public required string Email { get; set; }

        [Required]
        [RegularExpression(@"^(?=.*.{6,})(?!.*['\-]).*$", ErrorMessage = "La contraseña debe tener al menos 6 caracteres y no puede contener los signos ' o -.")]
        public required string Password { get; set; }
    }
}
