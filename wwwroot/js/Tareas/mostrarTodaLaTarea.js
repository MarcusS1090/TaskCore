async function manejarClickTarea(tarea) {
    if (tarea.esNuevo()) {
        return;
    }
    const respuesta = await fetch(`${urlTareas}/${tarea.id()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (!respuesta.ok) {
        manejarErrorApi(respuesta);
        return;
    }

    const json = await respuesta.json();
    
    tareaEditarViewModel.id = json.id;
    tareaEditarViewModel.titulo(json.titulo);
    tareaEditarViewModel.descripcion(json.descripcion);

    tareaEditarViewModel.pasos([]);

    json.pasos.forEach(paso => {
        tareaEditarViewModel.pasos.push(new pasoViewModel({
            ...paso,
            modoEdicion: false
        }));
    })

    tareaEditarViewModel.archivosAdjuntos([]);


    preprararArchivosAdjuntos(json.archivosAdjuntos);

    modalEditarTareaBootstrap.show();
}
