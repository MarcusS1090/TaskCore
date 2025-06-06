using System.ComponentModel.DataAnnotations;

namespace TaskCore.Models
{
    public class LoginViewModel
    {
        [Required(ErrorMessage ="El campo correo es requerido")]
        [EmailAddress(ErrorMessage = "El campo debe ser un correo electrónico válido.")]
        public string Email { get; set; }
        [Required(ErrorMessage = "El campo contraseña es requerido")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [Display(Name = "Recuérdame")]
        public bool Recuerdame { get; set; }
    }
}
