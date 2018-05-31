function menuTemplate(){
return `
    <div class="row">
    <div class="col-md-12">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">Data Menu</h3>
            </div>
            <div class="box-body">
                <table id="table-menu" class="table table-striped table-bordered table-hover table-responsive" cellspacing="0" width="100%">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>PARENT</th>
                            <th>NAMA</th>
                            <th>DESKRIPSI</th>
                            <th>LINK</th>
                            <th>ICON</th>
                            <th>ORDER</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                </table> 
            </div>
            <div class="box-footer">
                <button class="btn btn-success b-add" onclick="showMenuModal()"><i class="fa fa-plus"></i> Tambah </button>
                <button class="btn btn-default" onclick="reloadMenuTable()"><i class="fa fa-refresh"></i> Reload</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="modal-menu" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h3 class="modal-title"></h3>
            </div>
            <div class="modal-body FormElement">
                <form action="#" id="form-menu" class="form-horizontal" onsubmit="saveMenu()">
                    <div class="form-body">
                        <div class="form-group" id="group-name">
                            <label class="control-label col-md-3">PARENT</label>
                            <div class="col-md-9">
                                <select class="form-control" name="parent" id="select-parent">
                                    
                                </select>
                                <span class="help-block"></span>
                            </div>
                        </div>
                        <div class="form-group" id="group-name">
                            <label class="control-label col-md-3">NAMA*</label>
                            <div class="col-md-9">
                                <input name="id" type="hidden" value="">
                                <input name="name" placeholder="nama" class="form-control" type="text" required>
                                <span class="help-block"></span>
                            </div>
                        </div>
                        <div class="form-group" id="group-description">
                            <label class="control-label col-md-3">DESKRIPSI</label>
                            <div class="col-md-9">
                                <input name="description" placeholder="deskripsi" class="form-control" type="text">
                                <span class="help-block"></span>
                            </div>
                        </div>
                        <div class="form-group" id="group-link">
                            <label class="control-label col-md-3">LINK</label>
                            <div class="col-md-9">
                                <input name="link" placeholder="link" class="form-control" type="text">
                                <span class="help-block"></span>
                            </div>
                        </div>
                        <div class="form-group" id="group-icon">
                            <label class="control-label col-md-3">ICON</label>
                            <div class="col-md-9">
                                <input name="icon" placeholder="icon" class="form-control" type="text">
                                <span class="help-block"></span>
                            </div>
                        </div>
                        <div class="form-group" id="group-order">
                            <label class="control-label col-md-3">ORDER</label>
                            <div class="col-md-9">
                                <input name="order" placeholder="order" class="form-control" type="number">
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