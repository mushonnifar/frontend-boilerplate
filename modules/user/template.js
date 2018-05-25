function userTemplate(){
    return `
    <div class="row">
    <div class="col-md-12">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">Data User</h3>
            </div>
            <div class="box-body">
                <table id="table-user" class="table table-striped table-bordered table-hover table-responsive" cellspacing="0" width="100%">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>NAMA</th>
                            <th>USERNAME</th>
                            <th>EMAIL</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                </table> 
            </div>
            <div class="box-footer">
                <button class="btn btn-success b-add" onclick="showUserModal()"><i class="fa fa-plus"></i> Tambah </button>
                <button class="btn btn-default" onclick="reloadUserTable()"><i class="fa fa-refresh"></i> Reload</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="modal-user" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h3 class="modal-title"></h3>
            </div>
            <div class="modal-body FormElement">
                <form action="#" id="form-user" class="form-horizontal" onsubmit="saveUser()">
                    <div class="form-body">
                        <div class="form-group" id="group-name">
                            <label class="control-label col-md-3">NAMA*</label>
                            <div class="col-md-9">
                                <input name="id" type="hidden" value="">
                                <input name="name" placeholder="nama" class="form-control" type="text" required>
                                <span class="help-block"></span>
                            </div>
                        </div>
                        <div class="form-group" id="group-username">
                            <label class="control-label col-md-3">USERNAME*</label>
                            <div class="col-md-9">
                                <input name="username" placeholder="username" class="form-control" type="text">
                                <span class="help-block"></span>
                            </div>
                        </div>
                        <div class="form-group" id="group-password">
                            <label class="control-label col-md-3">PASSWORD*</label>
                            <div class="col-md-9">
                                <input name="password" placeholder="password" class="form-control" type="password">
                                <span class="help-block"></span>
                            </div>
                        </div>
                        <div class="form-group" id="group-email">
                            <label class="control-label col-md-3">EMAIL*</label>
                            <div class="col-md-9">
                                <input name="email" placeholder="email" class="form-control" type="email">
                                <span class="help-block"></span>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-primary"><i class="fa fa-floppy-o"></i> <span id="btnSave">Simpan</span></button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-undo"></i> Cancel</button>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    </div>
</div>
`
}