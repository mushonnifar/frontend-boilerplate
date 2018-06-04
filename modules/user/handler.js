var tableUser;
var userMethod;

function loadMasterUserHandler() {
    initUserHandler();
}

function initUserHandler() {
    $('.content').html(userTemplate());

    loadTable('tableUser', 'table-user', dataTablesUserSetting());
    addNumberToTable('tableUser');
}

function showUserModal(){
    showModal('userMethod', 'form-user', 'modal-user', 'Add User');
    loadRole();
}

function saveUser() {
    save('userMethod', 'form-user', 'modal-user', 'user', 'tableUser');
}

function editUser(id_user) {
    loadRole();
    edit('userMethod', 'form-user', 'modal-user', 'Edit User', 'user', id_user, 'editUserProperties');
}
function hapusUser(id_user) {
    hapus('user', id_user, 'tableUser');
}

function dataTablesUserSetting() {
    return {
        "ajax": methodGetData('user'),
        "initComplete": function (settings, json) {
            saveToken(json.token);
            deactivateLoader();
            checkAction();		//melakukan pemberian action sesuai dengan DB
        },
        "columns": [
            {"data": "id"},
            {"data": "name"},
            {"data": "username"},
            {"data": "email"},
            {"data": "role"},
            {"data": null, "render": function (data, type, row) {
                    return "<center><button class='btn btn-sm btn-primary b-edit' title='Edit' onclick='editUser(" + data.id + ")'><i class='fa fa-pencil'></i> Ubah</button>\n\
                        <button class='btn btn-sm btn-danger b-delete' title='Delete' onclick='hapusUser(" + data.id + ")'><i class='fa fa-eraser'></i> Hapus</button></center>";
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

function editUserProperties(response) {
    $('[name="id"]').val(response.data.id);
    $('[name="name"]').val(response.data.name);
    $('[name="username"]').val(response.data.username);
    $('[name="password"]').attr("placeholder", "*leave empy if you don't want to change password");
    $('[name="email"]').val(response.data.email);
    $('#select-role').val(response.data.role_id);
}

function reloadUserTable(){
    reloadTable('tableUser');
}

function loadRole() {
    $.ajax(methodGetData('role'))
            .done(function (response) {
                saveToken(response.token);
                var option = '<option value="0">-- pilih role --</option>';
                $.each(response.data, function (key, value) {
                    option += '<option value="' + value.id + '">' + value.name + '</option>';
                });
                $('#select-role').html(option);
                deactivateLoader();
//                console.log(response);
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert('Error get data from ajax');
                deactivateLoader();
            });
}