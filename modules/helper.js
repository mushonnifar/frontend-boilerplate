/*
 * fungsi untuk load table
 * 
 * @param {string} table => nama variable table
 * @param {string} idTable => id table
 * @param {object} settingTable => datatable properties
 * 
 */
function loadTable(table, idTable, settingTable) {
    window[table] = $('#' + idTable).DataTable(settingTable);
}

/*
 * fungsi untuk reload table
 * 
 * @param {string} table => nama variable table
 * 
 */
function reloadTable(table) {
    window[table].ajax.reload(function (response) {
        localStorage.setItem(appName + 'Token', response.token);
        deactivateLoader();
    });
}

/*
 * menambahkan nomor urut ke table
 */
function addNumberToTable(table) {
    window[table].on('order.dt search.dt', function () {
        window[table].column(0, {search: 'applied', order: 'applied'}).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();
}

/*
 * fungsi untuk setingan get data via ajax
 * @param {string} url => link / url API
 * 
 */
function methodGetData(url) {
    return  {
        "url": urlAPI + '/' + url,
        "type": "GET",
        "beforeSend": function (request) {
            activateLoader();
            request.setRequestHeader("x-access-token", getToken());
        }
    };
}

/*
 * fungsi untuk setingan post data via ajax
 * @param {string} url => link / url API
 * @param {string} idForm => id form penambahan data
 * 
 */
function methodPostData(url, idForm) {
    return  {
        "url": urlAPI + '/' + url,
        "type": "POST",
        "data": $('#' + idForm).serialize(),
        "dataType": "JSON",
        "beforeSend": function (request) {
            activateLoader();
            request.setRequestHeader("x-access-token", getToken());
        }
    };
}

/*
 * fungsi untuk setingan put data via ajax
 * @param {string} url => link / url API
 * @param {string} idForm => id form penambahan data
 * @param {string} id => id data yang akan di update
 * 
 */
function methodPutData(url, idForm, id) {
    return  {
        "url": urlAPI + '/' + url + '/' + id,
        "type": "PUT",
        "data": $('#' + idForm).serialize(),
        "dataType": "JSON",
        "beforeSend": function (request) {
            activateLoader();
            request.setRequestHeader("x-access-token", getToken());
        }
    };
}

/*
 * fungsi untuk setingan delete data via ajax
 * @param {string} url => link / url API
 * @param {string} id => id data yang akan di hapus
 * 
 */
function methodDeleteData(url, id) {
    return  {
        "url": urlAPI + '/' + url + '/' + id,
        "type": "DELETE",
        "beforeSend": function (request) {
            activateLoader();
            request.setRequestHeader("x-access-token", getToken());
        }
    };
}

function activateLoader() {
    $('.loader').addClass('is-active');
}
function deactivateLoader() {
    $('.loader').removeClass('is-active');
}

function checkAction() {
    var id_menu = localStorage.getItem(appName + 'MenuID');

    $.ajax(methodGetData('rolemenuaction/menu/' + id_menu))
            .done(function (response) {
                saveToken(response.token);
                deactivateLoader();
                setAction(response);
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert('Error get data from ajax');
                deactivateLoader();
            });
}

function setAction(action) {
    $('.b-add').hide();
    $('.b-edit').hide();
    $('.b-delete').hide();
    $.each(action.data, function (index, value) {
        if (value.nama_action === 'create') {
            $('.b-add').show();
        }
        if (value.nama_action === 'update') {
            $('.b-edit').show();
        }
        if (value.nama_action === 'delete') {
            $('.b-delete').show();
        }
    });
}

function showModal(method, formID, modalID, modalTitle) {
//    var method = menu + 'Method';
    window[method] = 'add';
    $('#' + formID)[0].reset();
    $('.form-group').removeClass('has-error');
    $('.help-block').empty();
    $('#' + modalID).modal('show');
    $('.modal-title').text(modalTitle);
}

function save(method, formID, modalID, link, tableName) {
    var option;
    event.preventDefault();
    if (window[method] === 'add') {
        option = methodPostData(link, formID);
    } else {
        var id = $('[name="id"]').val();
        option = methodPutData(link, formID, id);
    }
    $.ajax(option)
            .done(function (data) {
                saveToken(data.token);
                if (data.status) {
                    $('#' + modalID).modal('hide');
                    reloadTable(tableName);
                }
                deactivateLoader();
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                $.each(jqXHR.responseJSON.message, function (index, value) {
                    $('#group-' + index).addClass('has-error');
                    $('[name="' + index + '"]').next('.help-block').html(value);
                });
                deactivateLoader();
            });
}

function edit(method, formID, modalID, modalTitle, link, id_user, properties) {
    window[method] = 'update';
    $('#' + formID)[0].reset();
    $('.form-group').removeClass('has-error');
    $('.help-block').empty();
    $.ajax(methodGetData(link + '/' + id_user))
            .done(function (response) {
                saveToken(response.token);
                window[properties](response);
                deactivateLoader();
                $('#' + modalID).modal('show');
                $('.modal-title').text(modalTitle);
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert('Error get data from ajax');
                deactivateLoader();
            });
}

function hapus(link, id_user, tableName) {
    if (confirm('Are you sure delete this data?')) {
        $.ajax(methodDeleteData(link, id_user))
                .done(function (data) {
                    saveToken(data.token);
                    reloadTable(tableName);
                    deactivateLoader();
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    alert('error deleting data');
                    deactivateLoader();
                });
    }
}