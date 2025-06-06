using Microsoft.EntityFrameworkCore;

namespace TaskCore.Entidades
{
    public class ArchivoAdjunto
    {
        public Guid Id { get; set; }
        public int TareaId { get; set; }
        public Tarea Tarea { get; set; }
        [Unicode(false)]
        public string Url { get; set; }
        public string Titutlo { get; set; }
        public int Orden { get; set; }
        public DateTime FechaCreacion { get; set; }
    }
}
