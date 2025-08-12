async function manejarClickSalvarPaso(paso) {
    paso.modoEdicion(false);
    const esNuevo = paso.esNuevo();
    const idTarea = tareaEditarViewModel.id;
    const data = obtenerCuerpoPetcionPaso(paso);

    if (esNuevo) {
        await insertarPaso(paso, data, idTarea);
    } else {
    }
}