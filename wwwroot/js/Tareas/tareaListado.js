const urlTareas = "/api/tareas";

function tareaListadoViewModelFn() {
    var self = this;
    self.tareas = ko.observableArray([]);
    self.cargando = ko.observable(true);

    self.noHayTareas = ko.pureComputed(function () {
        if (self.cargando()) {
            return false;
        }

        return self.tareas().length === 0;
    });
}

function tareaElementoListadoViewModel({ id, titulo }) {
    var self = this;
    self.id = ko.observable(id);
    self.titulo = ko.observable(titulo);

    self.esNuevo = ko.pureComputed(function () {
        return self.id() == 0;
    });
}

const tareaEditarViewModel = {
    id: 0,
    titulo: ko.observable(''),
    descripcion: ko.observable(''),
}

const tareaListadoViewModel = new tareaListadoViewModelFn();

obtenerTareas();

ko.applyBindings(tareaListadoViewModel, document.getElementById('contenedor-listado-tareas'));

