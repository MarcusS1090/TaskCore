using System.ComponentModel.DataAnnotations;

namespace TaskCore.Models
{
    public class RegistroViewModel
    {
        [Required(ErrorMessage = "El campo Correo es requerido")]
        [EmailAddress(ErrorMessage = "El campo debe ser un correo electronico válido.")]
        public string Email { get; set; }
        [Required(ErrorMessage = "El campo Contraseña es requerido")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
