async function manejarCambioEditarTarea() {
    const obj = {
        id: tareaEditarViewModel.id,
        titulo: tareaEditarViewModel.titulo(),
        descripcion: tareaEditarViewModel.descripcion()
    }

    if (!obj.titulo) {
        return;
    }

    await editarTareaCompleta(obj);


    const index = tareaListadoViewModel.tareas().findIndex(t => t.id() === obj.id);
    const tarea = tareaListadoViewModel.tareas()[index];
    tarea.titulo(obj.titulo);
    tarea.descripcion(obj.descripcion);
}

async function editarTareaCompleta(tarea) {
    const data = JSON.stringify(tarea);
    const respuesta = await fetch(`${urlTareas}/${tarea.id}`, {
        method: 'PUT',
        body: data,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!respuesta.ok) {
        manejarErrorApi(respuesta);
        throw "Error";
    }
}