using System.ComponentModel.DataAnnotations;

namespace Api_inmobiliaria.Models.DTOs.Tablas
{
    public class Usuarios
    {
        public int? Id { get; set; }

        [Required(ErrorMessage = "El campo Identidad es obligatorio.")]
        public required string Identifi { get; set; }

        [Required(ErrorMessage = "El campo Nombre es obligatorio.")]
        public required string Nombre { get; set; }

        [Required(ErrorMessage = "El campo Apellido es obligatorio.")]
        public required string Apellido { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "El formato del correo electrónico no es válido.")]
        public required string Email { get; set; }

        public required string Genero { get; set; }

        public required string Pais { get; set; }

        [Required]
        [RegularExpression(@"^.{6,}$", ErrorMessage = "La contraseña debe tener al menos 6 dígitos")]
        public required string Clave { get; set; }

        [Required]
        [Compare("Clave", ErrorMessage = "Las contraseñas no coinciden.")]
        public required string ConfirmClave { get; set; }

        [Required]
        public required string Telefono { get; set; }

        [Required]
        [CustomValidation(typeof(Usuarios), nameof(ValidateFechaNacimiento), ErrorMessage = "Debe ser mayor de edad.")]
        public required string Fec_naci { get; set; }

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
