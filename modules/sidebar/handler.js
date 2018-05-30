function sidebarHandler(response) {
    var dataJson = response;
    var side = "";

    $.each(dataJson.data, function (index, value) {
        var idParent = value.name.replace(/\s/g, '');
        if (value.child.length != '0') {
            side += '<li id="' + idParent + '" class="parent treeview"><a href="javascript:;"><i class="' + value.icon + '"></i><span>' + value.name + ' </span><span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span></a><ul class="treeview-menu">';
            $.each(value.child, function (index, value) {
                var idChild = value.name.replace(/\s/g, '');
                side += '<li id="' + idChild + '" class="child"><a href="#" onClick="handleAction(\'' + value.link + '\',\'' + value.id + '\',\'' + value.name + '\')"><i class="fa fa-circle-o"></i>' + value.name + '</a></li>';
            });
            side += '</ul></li>';
        } else {							// else dont have a child (parent only)
            side += '<li id="' + idParent + '" class="parent"><a href="javascript:;" onClick="handleAction(\'' + value.link + '\',\'' + value.id + '\',\'' + value.name + '\')"><i class="' + value.icon + '"></i><span> ' + value.name + '</a></li>';
        }
    });
    $("#sidebarnav").append(side); // append var side that have already arranged to class 
}