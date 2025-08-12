async function actualizarPaso(data, id) {
    const respuesta = await fetch(`${urlPasos}/${id}`, {
        body: data,
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (respuesta.ok) {
        manejarErrorApi(respuesta);
    } 

    return respuesta.ok;
}