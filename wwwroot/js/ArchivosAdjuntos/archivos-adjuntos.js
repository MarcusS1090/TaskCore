const urlArchivos = "/api/archivos";

let inputArchivoTarea = document.getElementById('archivoAtarea');

function manejarClickAgregarArchivoAdjunto() {
    inputArchivoTarea.click();
}

async function manejarSeleccionArchivoTarea(event) {
    const archivos = event.target.files;
    const archivosArreglo = Array.from(archivos);

    const idTarea = tareaEditarViewModel.id;
    const formData = new FormData();

    for (let i = 0; i < archivosArreglo.length; i++) {
        formData.append('archivos', archivosArreglo[i]);
    }

    const respuesta = await fetch(`${urlArchivos}/${idTarea}`, {
        method: 'POST',
        body: formData
    });

    if (!respuesta.ok) {
        manejarErrorApi(respuesta);
        return;
    }
    const json = await respuesta.json();
    preprararArchivosAdjuntos(json);
}

function archivoAdjuntoViewModel(id, titulo, publicado, modoEdicion, orden, url) {
    let self = this;
    self.id = id;
    self.titulo = ko.observable(titulo || '');
    self.publicado = ko.observable(publicado);
    self.modoEdicion = ko.observable(modoEdicion);
    self.orden = ko.observable(orden);
    self.url = url;

}
function preprararArchivosAdjuntos(archivosAdjuntos) {
    archivosAdjuntos.forEach(archivoAdjunto => {
        let fechaCreacion = archivoAdjunto.fechaCreacion;

        if (archivoAdjunto.fechaCreacion.indexOf('z') == -1) {
            fechaCreacion += 'Z';
        }

        const fechaCreacionDT = new Date(fechaCreacion);
        archivoAdjunto.publicado = fechaCreacionDT.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });

        tareaEditarViewModel.archivosAdjuntos
            .push(new archivoAdjuntoViewModel(
                archivoAdjunto.id,
                archivoAdjunto.titulo,
                archivoAdjunto.publicado,
                false, archivoAdjunto.orden, archivoAdjunto.url));
    });
}

let tituloArchivoAdjuntoAnterior;

function manejarClickTituloArchivoAdjunto(archivoAdjunto) {
    archivoAdjunto.modoEdicion(true);
    tituloArchivoAdjuntoAnterior = archivoAdjunto.titulo();

    $("[name='txtArchivoAdjuntoTitulo']:visible").focus();
}

async function manejarFocusoutTitutloArchivoAdjunto(archivoAdjunto) {
    archivoAdjunto.modoEdicion(false);

    const idTarea = archivoAdjunto.id;
    
    if (!archivoAdjunto.titulo() || archivoAdjunto.titulo().trim() === '') {
        archivoAdjunto.titulo(tituloArchivoAdjuntoAnterior);
        return;
    }

    if (archivoAdjunto.titulo() === tituloArchivoAdjuntoAnterior) {
        return;
    }

    const data = JSON.stringify(archivoAdjunto.titulo());

    const respuesta = await fetch(`${urlArchivos}/${idTarea}`, {
        body: data,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!respuesta.ok) {
        manejarErrorApi(respuesta);
        archivoAdjunto.titulo(tituloArchivoAdjuntoAnterior);
    }
        return;

}