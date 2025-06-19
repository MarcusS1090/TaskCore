using AutoMapper;
using TaskCore.Entidades;
using TaskCore.Models;

namespace TaskCore.Servicios
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Tarea, TareaDTO>();
        }
    }
}
