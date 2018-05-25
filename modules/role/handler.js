var tableRole;
var roleMethod;

function loadMasterRoleHandler() {
    initRoleHandler();
}

function initRoleHandler() {
    $('.content').html(roleTemplate());

    loadTable('tableRole', 'table-role', dataTablesRoleSetting());
    addNumberToTable('tableRole');
}

function showRoleModal(){
    showModal('roleMethod', 'form-role', 'modal-role', 'Add Role');
}

function saveRole() {
    save('roleMethod', 'form-role', 'modal-role', 'role', 'tableRole');
}

function editRole(id_role) {
    edit('roleMethod', 'form-role', 'modal-role', 'Edit Role', 'role', id_role, 'editRoleProperties');
}
function hapusRole(id_role) {
    hapus('role', id_role, 'tableRole');
}

function dataTablesRoleSetting() {
    return {
        "ajax": methodGetData('role'),
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
                    return "<center><button class='btn btn-sm btn-primary b-edit' title='Edit' onclick='editRole(" + data.id + ")'><i class='fa fa-pencil'></i> Ubah</button>\n\
                        <button class='btn btn-sm btn-danger b-delete' title='Delete' onclick='hapusRole(" + data.id + ")'><i class='fa fa-eraser'></i> Hapus</button></center>";
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

function editRoleProperties(response) {
    $('[name="id"]').val(response.data.id);
    $('[name="name"]').val(response.data.name);
    $('[name="description"]').val(response.data.description);
}