var tableRoute;
var routeMethod;

function loadMasterRouteHandler() {
    initRouteHandler();
}

function initRouteHandler() {
    $('.content').html(routeTemplate());

    loadTable('tableRoute', 'table-route', dataTablesRouteSetting());
    addNumberToTable('tableRoute');
}

function showRouteModal(){
    showModal('routeMethod', 'form-route', 'modal-route', 'Add Route');
}

function saveRoute() {
    save('routeMethod', 'form-route', 'modal-route', 'route', 'tableRoute');
}

function editRoute(id_route) {
    edit('routeMethod', 'form-route', 'modal-route', 'Edit Route', 'route', id_route, 'editRouteProperties');
}
function hapusRoute(id_route) {
    hapus('route', id_route, 'tableRoute');
}

function dataTablesRouteSetting() {
    return {
        "ajax": methodGetData('route'),
        "initComplete": function (settings, json) {
            saveToken(json.token);
            deactivateLoader();
            checkAction();		//melakukan pemberian action sesuai dengan DB
        },
        "columns": [
            {"data": "id"},
            {"data": "name"},
            {"data": "description"},
            {"data": null, "render": function (data, type, row) {
                    return "<center><button class='btn btn-sm btn-primary b-edit' title='Edit' onclick='editRoute(" + data.id + ")'><i class='fa fa-pencil'></i> Ubah</button>\n\
                        <button class='btn btn-sm btn-danger b-delete' title='Delete' onclick='hapusRoute(" + data.id + ")'><i class='fa fa-eraser'></i> Hapus</button></center>";
                }}
        ],
        "columnDefs": [
            {
                "searchable": false,
                "orderable": false,
                "targets": 0
            }
        ],
        "order": [[0, 'asc']]
    };
}

function editRouteProperties(response) {
    $('[name="id"]').val(response.data.id);
    $('[name="name"]').val(response.data.name);
    $('[name="description"]').val(response.data.description);
}

function reloadRouteTable(){
    reloadTable('tableRoute');
}