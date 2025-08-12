async function manejarClickSalvarPaso(paso) {
    paso.modoEdicion(false);
    const esNuevo = paso.esNuevo();
    const idTarea = tareaEditarViewModel.id;
    const data = obtenerCuerpoPetcionPaso(paso);

    const descripcion = paso.descripcion();

    if (!descripcion) {
        paso.descripcion(paso.descripcionAnterior);

        if (esNuevo) {
            tareaEditarViewModel.pasos.pop();
        }
        return;
    }

    if (esNuevo) {
        await insertarPaso(paso, data, idTarea);
    } else {
        const id = paso.id();
        await actualizarPaso(data, id);
    }
}

