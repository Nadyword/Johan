using System.ComponentModel.DataAnnotations;

namespace Api_inmobiliaria.Models.Request
{
    public class RequestRegister
    {
        [Required]
        public required string Name { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "El formato del correo electrónico no es válido.")]
        public required string Email { get; set; }

        [Required]
        [RegularExpression(@"^.{6,}$", ErrorMessage = "La contraseña debe tener al menos 6 dígitos")]
        public required string Password { get; set; }

        [Required]
        [Compare("Password", ErrorMessage = "Las contraseñas no coinciden.")]
        public required string ConfirmPassword { get; set; }

        [Required]
        [RegularExpression(@"^\d{10,}$", ErrorMessage = "Numero invalido.")]
        public required string Telefono { get; set; }

        [Required]
        [CustomValidation(typeof(RequestRegister), nameof(ValidateFechaNacimiento), ErrorMessage = "Debe ser mayor de edad.")]
        public required string FechaNacimiento { get; set; }

        public static ValidationResult? ValidateFechaNacimiento(string fechaNacimiento)
        {
            DateTime nacimiento = DateTime.Parse(fechaNacimiento);
            DateTime today = DateTime.Today;
            int age = today.Year - nacimiento.Year;
            if (nacimiento > today.AddYears(-age)) age--;
            return age >= 18 ? ValidationResult.Success : new ValidationResult("Debe ser mayor de edad.");
        }
    }
}
