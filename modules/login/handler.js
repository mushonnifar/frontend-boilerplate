function loginHandler() {
    document.body.innerHTML = loginTemplate();
}

function loginProceedHandler() {
    event.preventDefault();

    var data = $('#login-form').serializeArray();

    var settings = {
        "async": true,
        "dataType": "JSON",
        "crossDomain": true,
        "url": urlAPI + '/user/login',
        "type": "POST",
        "headers": {},
        "mimeType": "multipart/form-data",
        "data": data,
        "beforeSend": function (request) {
            activateLoader();
        }
    };

    $.ajax(settings)
            .done(function (response) {
                saveToken(response.token);
                deactivateLoader();
                toastr.info(response.message, response.status, {
                    timeOut: 1000,
                    "closeButton": true,
                    "debug": false,
                    "newestOnTop": true,
                    "progressBar": true,
                    "positionClass": "toast-top-right",
                    "preventDuplicates": true,
                    "onclick": null,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut",
                    "tapToDismiss": false
                });
                setTimeout(function () {
                    getSidebar();
                    loadBodyContent();
                    handleAction('routeDashboard', '26', 'Dashboard');
                }, 1100);

            })
            .fail(function (response) {
                deactivateLoader();
                toastr.error(response.responseJSON.message, response.responseJSON.status, {
                    timeOut: 3000,
                    "closeButton": true,
                    "debug": false,
                    "newestOnTop": true,
                    "progressBar": true,
                    "positionClass": "toast-top-right",
                    "preventDuplicates": true,
                    "onclick": null,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut",
                    "tapToDismiss": false
                });
            });

}
