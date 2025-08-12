
async function borrarTarea(tarea) {
    const idTarea = tarea.id;

    const respuesta = await fetch(`${urlTareas}/${idTarea}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (respuesta.ok) {
        const indice = obtenerIndiceTareaEdicion();
        tareaListadoViewModel.tareas.splice(indice, 1);
    }
}


function intentarBorrarTarea(tarea) {
    modalEditarTareaBootstrap.hide();

    confirmarAccion({
        callBackAceptar: () => {
            borrarTarea(tarea);
        },
        callBackCancelar: () => {
            modalEditarTareaBootstrap.show();
        },
        titulo:[`¿Desea borrar la tarea ${tarea.titulo()}?`]
    });
}