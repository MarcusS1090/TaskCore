async function actualizarOrdenTareas() {
    const ids = obtenerIdsTareas();
    await enviarIdsTareasAlBackend(ids);

    const arregloOrdenado = tareaListadoViewModel.tareas().sort(function (a, b) {
        return ids.indexOf(a.id().toString()) - ids.indexOf(b.id().toString());
    });

    tareaListadoViewModel.tareas([]);
    tareaListadoViewModel.tareas(arregloOrdenado);
}

function obtenerIdsTareas() {
    const ids = $("[name=titulo-tarea]").map(function () {
        return $(this).attr("data-id");
    }).get();

    return ids;
}


async function enviarIdsTareasAlBackend(ids) {
    var data = JSON.stringify(ids);
    await fetch(`${urlTareas}/ordenar`, {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

$(function () {
    $("#reordenable").sortable({
        axis: "y",
        stop: async function () {
            await actualizarOrdenTareas();
        }
    })
})
