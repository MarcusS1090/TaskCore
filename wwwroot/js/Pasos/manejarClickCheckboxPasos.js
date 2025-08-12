function manejarClickCheckboxPasos(paso)
{
    if (paso.esNuevo()) {
        return true;
    }

    const data = obtenerCuerpoPetcionPaso(paso);
    actualizarPaso(data, paso.id());

    const tarea = obtenerTareaEnEdicion();
    let pasosRealizadosActual = tarea.pasosRealizados() || 0;

    if (paso.realizado()) {
        pasosRealizadosActual++;
    } else {
        pasosRealizadosActual--;
    }

    tarea.pasosRealizados(pasosRealizadosActual);

    return true;
}