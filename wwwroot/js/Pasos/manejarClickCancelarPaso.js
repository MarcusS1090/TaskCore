function manejarClickCancelarPaso(paso) {
    if (paso.esNuevo()) {
        tareaEditarViewModel.pasos.pop();
    } else {

    }
}