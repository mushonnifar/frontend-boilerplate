var urlAPI = 'http://sonif.me/cqs-example/api/public';
//var urlAPI = 'https://36.67.149.236:8415/cqs/api/public';
var baseURL = 'http://sonif.me/cqs-example/ui-dev/public_html/';
var appName = 'Dev';

// MAIN FLOW START

App = {
    init: function () {
        startApp();
//        modalClick();
    }
};

// MAIN FLOW END

function startApp() {
    console.log('Checkhing authorization...');

    if (!localStorage.getItem(appName + 'Token')) {
        console.log('No Token Detected');
        loadLoginContent();
    } else {
        console.log('Token Detected');
        loadBodyContent();
//        getSidebar();
        var activeRoute = localStorage.getItem(appName + 'routeMenu');
        var activeMenuID = localStorage.getItem(appName + 'MenuID');
        var activeMenu = localStorage.getItem(appName + 'ActiveMenu');

        if (activeRoute) {
            handleAction(activeRoute, activeMenuID, activeMenu);
        }
    }

}

function loadLoginContent() {
    window['loginHandler']();
}

function loadBodyContent() {
    document.body.innerHTML = `<div class="wrapper" id="page-container">`;
//    var loader = loadSpinner();
    var header = headerTemplate();
    var sidebar = sidebarTemplate();

    var content = `
	<div class="content-wrapper">
            <!-- Content Header (Page header) -->
            <section class="content-header">
                <h1 id="page-title">Dashboard</h1>
                <div class="loader loader-default "></div>
            </section>

            <!-- Main content -->
            <section class="content">

            </section>
            <!-- /.content -->
        </div>
        <!-- /.content-wrapper -->`;

//    $("#page-container").html(loader + header + sidebar + content);
    $("#page-container").html(header + sidebar + content);
    $('.preloader')
            .delay(1000)
            .queue(function (next) {
                $(this).css('display', 'none');
                next();
            });
    getSidebar();
}

function handleAction(menuRoute, idMenu, menuName) {

    if (menuRoute) {
        var target = menuRoute;
        var hTarget = target.replace('route', '');
        var hTarget = 'load' + hTarget + 'Handler';
    }
    console.log(hTarget);
    setActivePage(menuRoute, idMenu, menuName);
    switch (target) {
        case 'login':
            loginHandler();
            break;
        case 'logout':
            logoutHandler();
            break;
        default:
            try {
                var lastAction = localStorage.getItem(appName + 'CurrentAction');
                localStorage.setItem(appName + 'LastAction', lastAction);
                localStorage.setItem(appName + 'CurrentAction', hTarget);
                window[hTarget]();
                $('#page-title').html(menuName);
            } catch (err) {
                console.log('Function ' + hTarget + ' is not exist yet or ' + err);
            }
            break;
    }
}

function setActivePage(menuRoute, idMenu, menuName) {
    localStorage.setItem(appName + 'routeMenu', menuRoute);
    localStorage.setItem(appName + 'MenuID', idMenu);
    localStorage.setItem(appName + 'ActiveMenu', menuName);
    $('.parent').removeClass('active');
    $('.child').removeClass('active');
    var idList = menuName.replace(/\s/g, '');
    $('#' + idList).closest(".parent").addClass("active");
    $('#' + idList).addClass('active');    
}

function getActivePage() {
    return localStorage.getItem(appName + 'routeMenu');
    return localStorage.getItem(appName + 'MenuID');
    return localStorage.getItem(appName + 'ActiveMenu');
}

function getSidebar() {
    var token = getToken();
    var settings = {
        "async": false,
        "crossDomain": true,
        "url": urlAPI + '/menu/getmenu',
        "method": "GET",
        "headers": {
            "x-access-token": token
        }
    };

    $.ajax(settings)
            .done(function (response) {
//                alert('asda');
                sidebarHandler(response);
                getIdentity();
            })
            .fail(function (response) {
                localStorage.clear();
                loadLoginContent();
            });
}

function saveToken(token) {
    if (typeof token !== 'undefined') {
        localStorage.setItem(appName + 'Token', token);
//        console.log('New Token: ' + token);
    }
}

function getToken() {
    return localStorage.getItem(appName + 'Token');
}

function logoutHandler() {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": urlAPI + '/user/logout',
        "method": "POST",
        "beforeSend": function (request) {
            activateLoader();
            request.setRequestHeader("x-access-token", getToken());
        }
    };

    $.ajax(settings).done(function (response) {
        localStorage.clear();
        window.location.href = baseURL;
        deactivateLoader();
    });
}
