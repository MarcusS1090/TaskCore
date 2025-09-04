async function manejarErrorApi(respuesta) {
    let mensajeError = "";

    if (respuesta.status == 400) {
        mensajeError = await respuesta.text();
    } else if (respuesta.status == 404) {
        mensajeError = recursoNoEncontrado;
    } else {
        mensajeError = errorInesperado;
    }
    mostrarMensajeError(mensajeError);

}


function mostrarMensajeError(mensaje) {
    Swal.fire({
        icon: "error",
        title: "Error...",
        text: mensaje,
    });
}

function confirmarAccion({ callBackAceptar, callBackCancelar, titulo }) {
    Swal.fire({
        title: titulo || '¿Estas seguro de esta acción? No se podra rehacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#005CFF',
        cancelButtonColor: '#FF0000',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        focusConfirm: true,
    }).then((resultado) => {
        if (resultado.isConfirmed) {
            callBackAceptar();
        } else if (callBackCancelar) {
            callBackCancelar();
        }
    });
}

function descargarArchivo(url, nombre) {

    var link = document.createElement("a");
    link.download = nombre;
    link.target = "_blank";
    link.href = url;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    delete link;
}