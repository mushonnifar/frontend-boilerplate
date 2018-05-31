var tableMenu;
var menuMethod;

function loadMasterMenuHandler() {
    initMenuHandler();
}

function initMenuHandler() {
    $('.content').html(menuTemplate());

    loadTable('tableMenu', 'table-menu', dataTablesMenuSetting());
    addNumberToTable('tableMenu');
}

function showMenuModal() {
    showModal('menuMethod', 'form-menu', 'modal-menu', 'Add Menu');
    getParent();
}

function saveMenu() {
    save('menuMethod', 'form-menu', 'modal-menu', 'menu', 'tableMenu');
}

function editMenu(id_menu) {
    getParent();
    edit('menuMethod', 'form-menu', 'modal-menu', 'Edit Menu', 'menu/id', id_menu, 'editMenuProperties');
}
function hapusMenu(id_menu) {
    hapus('menu', id_menu, 'tableMenu');
}

function dataTablesMenuSetting() {
    return {
        "ajax": methodGetData('menu'),
        "initComplete": function (settings, json) {
            saveToken(json.token);
            deactivateLoader();
            checkAction();		//melakukan pemberian action sesuai dengan DB
        },
        "columns": [
            {"data": "id"},
            {"data": "parent_name"},
            {"data": "name"},
            {"data": "description"},
            {"data": "link"},
            {"data": "icon"},
            {"data": "order"},
            {"data": null, "render": function (data, type, row) {
                    return "<center><button class='btn btn-sm btn-primary b-edit' title='Edit' onclick='editMenu(" + data.id + ")'><i class='fa fa-pencil'></i> Ubah</button>\n\
                        <button class='btn btn-sm btn-danger b-delete' title='Delete' onclick='hapusMenu(" + data.id + ")'><i class='fa fa-eraser'></i> Hapus</button></center>";
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

function editMenuProperties(response) {
    $('[name="id"]').val(response.data.id);
    $('[name="name"]').val(response.data.name);
    $('[name="description"]').val(response.data.description);
    $('[name="link"]').val(response.data.link);
    $('[name="icon"]').val(response.data.icon);
    $('[name="order"]').val(response.data.order);
    $('#select-parent').val(response.data.parent);
}

function reloadMenuTable() {
    reloadTable('tableMenu');
}

function getParent() {
    $.ajax(methodGetData('menu/parent'))
            .done(function (response) {
                saveToken(response.token);
                var option = '<option value="0">-- pilih parent --</option>';
                $.each(response.data, function (key, value) {
                    option += '<option value="' + value.id + '">' + value.name + '</option>';
                });
                $('#select-parent').html(option);
                deactivateLoader();
//                console.log(response);
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert('Error get data from ajax');
                deactivateLoader();
            });
}