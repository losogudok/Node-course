(function(document, window, $){

var app = {
    elems: {
        fileContents: $('#fileContents'),
        fileName: $('#fileName'),
        filesList: $('#filesList'),
        saveFileBtn: $('#saveFile'),
        listItemTmpl: $('#listItemTmpl'),
        dialog: $('#dialog')
    }
};

var appProto = {
    init:  function() {
        this.bindListeners();
        this.updateFileList();
    },
    bindListeners: function() {
        var elems = this.elems;

        elems.filesList.on('click', 'a', this.getFile.bind(this));
        elems.filesList.on('click', '.jsDeleteFile', this.deleteFile.bind(this));
        elems.saveFileBtn.on('click', this.saveFile.bind(this));
    },
    getFile: function(e) {
        var self = this;
        var filelink = e.target.href;
        var fileName = e.target.textContent;

        e.preventDefault();
        $.get(filelink)
            .done(function(response){
                self.elems.fileName.val(fileName);
                self.elems.fileContents.text(response);
            })
            .fail(function(){
                alert('Failed to get file');
            });
    },
    deleteFile: function(e) {
        var self = this;
        var link = $(e.target).siblings('a').attr('href');

        $.ajax({
            url: link,
            type: 'DELETE'
        })
        .done(function(){
            self.updateFileList();
        })
        .fail(function(){
            alert('Failed to delete file');
        })
    },
    saveFile: function(e) {
        e.preventDefault();

        var self = this;
        var elems = self.elems;
        var name = elems.fileName.val().trim();
        var data = elems.fileContents.val();

        $.post('/files/' + name, data)
            .done(function(){
                self.updateFileList();
                alert('File saved');
            })
            .fail(function(){
                alert('Failed to save file');
            });
    },
    updateFileList: function() {
        var list = this.elems.filesList;
        var listItemTmpl = this.elems.listItemTmpl[0].content.cloneNode(true);

        $.get('/files')
            .done(function(response){
                list.empty();
                response.data.forEach(function(item, index){
                    var $a = $(listItemTmpl.querySelector('a'));

                    $a.text(item).attr('href', '/files/' + item);
                    list.append(listItemTmpl.cloneNode(true));
                });
            })
            .fail(function(){
                alert('Failed to get list of files');
            });
    }
};

Object.setPrototypeOf(app, appProto);
app.init();

})(document, window, jQuery);
