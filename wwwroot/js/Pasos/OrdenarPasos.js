async function actualizarOrdenPasos() {
    const ids = obtenerIdsPasos();
    await enviarIdsPasosAlBackend(ids);

    const arregloOrganizado = tareaEditarViewModel.pasos.sort(function (a, b) {
        return ids.indexOf(a.id().toString()) - ids.indexOf(b.id().toString());
    })

    tareaEditarViewModel.pasos(arregloOrganizado);
}

function obtenerIdsPasos() {
    const ids = $("[name=chbPaso]").map(function () {
        return $(this).attr('data-id');
    }).get();
    return ids;
}

async function enviarIdsPasosAlBackend(ids) {
    var data = JSON.stringify(ids);
    const respuesta =await fetch(`${urlPasos}/ordenar/${tareaEditarViewModel.id}`, {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!respuesta.ok) {
        manejarErrorApi(respuesta);
        return;
    }
}


$(function () {
    $("#reordenable-pasos").sortable({
        axis: "y",
        stop: async function () {
            await actualizarOrdenPasos();
        }
    })
})