function manejarClickBorrarPaso(paso)
{
    modalEditarTareaBootstrap.hide();
    confirmarAccion({
        callBackAceptar: () => {
            borrarPaso(paso);
            modalEditarTareaBootstrap.show();
        },
        callBackCancelar: () => {
            modalEditarTareaBootstrap.show();
        },
        titulo: `¿Desea borrar este paso?`
    })

}