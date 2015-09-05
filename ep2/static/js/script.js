(function(document, window, $){

var app = {
    elems: {
        userName: $('#userName'),
        userLogin: $('#userLogin'),
        userPassword: $('#userPassword'),
	    userId: $('#userId'),
        saveBtn: $('#save'),
	    deletBtn: $('#del'),
        userTmpl: $('#userTmpl'),
        userList: $('#userList')
    },
    init:  function() {
	    var match = location.pathname.match(/^\/users\/(\d+)\/?$/);

        this.bindListeners();
	    if (match) {
		    this.getUser(match[1]);
	    }
    },
    bindListeners: function() {
        var elems = this.elems;
	    var self = this;

	    elems.deletBtn.on('click',function(e){
		    e.preventDefault();
		    var id = elems.userId.val();
		    if (id) {
			    self.deleteUser(id);
		    }
	    });
        elems.saveBtn.on('click', function(e){
	        e.preventDefault();
	        self.saveUser();
        });
    },
    getUser: function(id) {
        var self = this;

        $.get(`/api/users/${id}`)
            .done(function(res){
		        self.elems.userId.val(res.id);
                self.elems.userName.val(res.name);
                self.elems.userLogin.val(res.login);
                self.elems.userPassword.val(res.password);
            })
            .fail(function(){
                alert('Failed to get user');
            });
    },
    deleteUser: function(id) {
        $.ajax({
            url: `/api/users/${id}`,
            type: 'DELETE'
        })
        .done(function(){
	        location.replace('/');
        })
        .fail(function(){
            alert('Failed to delete file');
        })
    },
    saveUser: function() {
        var self = this;
        var elems = self.elems;
	    var data = {};

	    data.name = elems.userName.val().trim();
        data.login = elems.userLogin.val().trim();
        data.password = elems.userPassword.val();

        $.post('/api/users/', JSON.stringify(data))
            .done(function(res){
                alert('User saved');
		        self.elems.userId(res.id);
            })
            .fail(function(){
                alert('Failed to save user');
            });
    }
};

app.init();

})(document, window, jQuery);
