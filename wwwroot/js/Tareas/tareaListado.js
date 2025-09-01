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

function tareaElementoListadoViewModel({ id, titulo, pasosTotal, pasosRealizados }) {
    var self = this;
    self.id = ko.observable(id);
    self.titulo = ko.observable(titulo);

    self.pasosTotal = ko.observable(pasosTotal);
    self.pasosRealizados = ko.observable(pasosRealizados);


    self.esNuevo = ko.pureComputed(function () {
        return self.id() == 0;
    });

    self.porcentajeCompletado = ko.pureComputed(function () {
        const calculo = Math.round(self.pasosRealizados() * 1.0 / self.pasosTotal() * 100);

        return `(${calculo} %)`;
    });
}

const tareaEditarViewModel = {
    id: 0,
    titulo: ko.observable(''),
    descripcion: ko.observable(''), 
    pasos: ko.observableArray([]),
    archivosAdjuntos: ko.observableArray([]),
}
const tareaListadoViewModel = new tareaListadoViewModelFn();

obtenerTareas();

ko.applyBindings(tareaListadoViewModel, document.getElementById('contenedor-listado-tareas'));
ko.applyBindings(tareaEditarViewModel, document.getElementById('modal-editar-tarea'));

