

function pasoViewModel({
    id,
    descripcion,
    realizado,
    modoEdicion
}) {
    var self = this;
    self.id = ko.observable(id || 0);
    self.descripcion = ko.observable(descripcion || '');
    self.descripcionAnterior = '';
    self.realizado = ko.observable(realizado);
    self.modoEdicion = ko.observable(modoEdicion);

    self.esNuevo = ko.pureComputed(function () {
        return self.id() == 0;
    });
}


function obtenerCuerpoPetcionPaso(paso) {
    return JSON.stringify({
        descripcion: paso.descripcion(),
        realizado: paso.realizado(),
    });
}

async function insertarPaso(paso, data, idTarea) {
    const respuesta = await fetch(`${urlPasos}/${idTarea}`, {
        body: data,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (respuesta.ok) {
        const json = await respuesta.json();
        paso.id(json.id);

        const tarea = obtenerTareaEnEdicion();

        if (tarea && typeof tarea.pasosTotal === 'function') {
            tarea.pasosTotal(tarea.pasosTotal() + 1);
        }

        if (paso.realizado() && tarea && typeof tarea.pasosRealizados === 'function') {
            tarea.pasosRealizados(tarea.pasosRealizados() + 1);
        }
    } else {
        manejarErrorApi(respuesta);
    }
}

async function borrarPaso(paso) {
    const respuesta = await fetch(`${urlPasos}/${paso.id()}`, {
        method: 'DELETE',
    });

    if (!respuesta.ok) {
        manejarErrorApi(respuesta);
        return;
    }


    tareaEditarViewModel.pasos.remove(function (item) { return item.id() == paso.id() });
    const tarea = obtenerTareaEnEdicion();

    tarea.pasosTotal(tarea.pasosTotal() - 1);

    if (paso.realizado()) {
        tarea.pasosRealizados(tarea.pasosRealizados() - 1);
    }
}