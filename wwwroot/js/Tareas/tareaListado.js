const urlTareas = "/api/tareas";

const modalEditarTarea = document.getElementById('modal-editar-tarea');
const modalEditarTareaBootstrap = new bootstrap.Modal(modalEditarTarea);

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
    pasos: ko.observableArray([]),
}
function pasoViewModel({ id, descripcion, realizado, modoEdicion }) {
    var self = this;
    self.id = ko.observable(id || 0);
    self.descripcion = ko.observable(descripcion || '');
    self.realizado = ko.observable(realizado);
    self.modoEdicion = ko.observable(modoEdicion);

    self.esNuevo = ko.computed(() => {
        return self.id() === 0;
    });

}

const tareaListadoViewModel = new tareaListadoViewModelFn();

obtenerTareas();

ko.applyBindings(tareaListadoViewModel, document.getElementById('contenedor-listado-tareas'));
ko.applyBindings(tareaEditarViewModel, document.getElementById('modal-editar-tarea'));

