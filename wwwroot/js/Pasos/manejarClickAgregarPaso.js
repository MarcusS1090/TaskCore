function manejarClickAgregarPaso() {

    const indice = tareaEditarViewModel.pasos().findIndex(p => p.esNuevo());

    if (indice !== -1) {
        return; // Ya hay un paso en modo edición, no se puede agregar otro.
    }

    tareaEditarViewModel.pasos.push(new pasoViewModel({
        modoEdicion: true,
        realizado: false,
    }));
    $("[name=txtPasoDescripcion]:visible").focus();
}

