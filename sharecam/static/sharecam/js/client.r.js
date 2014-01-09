define(['require', 'jquery.mobile'], function (require) {

    function loadCss(url) {
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = url;
        document.getElementsByTagName('head')[0].appendChild(link);
    }

    loadCss(require.toUrl('jquery.mobile.css'));

    var func = function ($el) {
        var thisObj = this,
            hbsPath = window.location.pathname == '/' ? './client.hbs.html' : require.toUrl('../client.hbs.html');

        thisObj.id = null;
        thisObj.password = null;
        thisObj.$el = $el;
        thisObj.$body = $('body');

        $.get(hbsPath, function (data) {
            var template = Handlebars.compile($.trim(data));
            thisObj.$el.append(template());
            thisObj.$body.pagecontainer('change', '#page_client', { changeHash: false });
            thisObj.initial();
        });
    };

    func.prototype = {
        initial: function () {
            var thisObj = this;

            thisObj.$client = thisObj.$el.find('#page_client');
            thisObj.$login = thisObj.$el.find('#dialog_login');
            thisObj.$snapshot = thisObj.$el.find('#dialog_snapshot');

            thisObj.$body.on('pagecontainertransition', function (e, ui) {
                if (ui.toPage.attr('id') == 'page_client') {
                    if (thisObj.id !== null && thisObj.password !== null) {
                        thisObj.$client.find('#btn_login').button('disable');
                        thisObj.$client.find('[feature]').button('enable');
                    }
                }
            });

            thisObj.$client.on('click', '#btn_login', function (e) {
                thisObj.$body.pagecontainer('change', '#dialog_login', { changeHash: false });
            });

            thisObj.$client.on('click', '#btn_snapshot', function (e) {
                thisObj.$body.pagecontainer('change', '#dialog_snapshot', { changeHash: false });
            });

            thisObj.$login.on('change keyup', '#input_id, #input_password', function (e) {
                var validity_id = thisObj.$login.find('#input_id').get(0).validity,
                    validity_password = thisObj.$login.find('#input_password').get(0).validity;

                thisObj.$login.find('#btn_ok').button(validity_id.valid && validity_password.valid ? "enable" : "disable");
            });

            thisObj.$login.on('click', '#btn_ok', function (e) {
                var id = thisObj.$login.find('#input_id').val();
                var password = thisObj.$login.find('#input_password').val();

                $.ajax({
                    method: 'post',
                    url: 'http://' + location.hostname + ':3001/client/authorize?' + $.param({ id: id }),
                    data: { username: 'admin', password: password },
                    xhrFields: { withCredentials: true },
                    crossDomain: true,
                    success: function (d) {
                        thisObj.id = id;
                        thisObj.password = password;
                        thisObj.$body.pagecontainer('change', '#page_client', { changeHash: false });
                    },
                    error: function () {
                    }
                });
            });

            thisObj.$login.on('click', '#btn_cancel', function (e) {
                thisObj.$body.pagecontainer('change', '#page_client', { changeHash: false });
            });

            thisObj.$snapshot.on('click', '#btn_refresh', function (e) {
                thisObj.snapshot();
            });

            thisObj.$snapshot.on('click', '#btn_close', function (e) {
                thisObj.$body.pagecontainer('change', '#page_client', { changeHash: false });
            });

            thisObj.$snapshot.on('create', function () { thisObj.snapshot(); });
        },
        snapshot: function () {
            var thisObj = this,
                timestamp = (new Date()).getTime();

            thisObj.$snapshot.find('#div_snapshot').html(
                $('<img/>', {
                    src: 'http://' + location.hostname + ':3001/client/snapshot?' + $.param({ id: thisObj.id, timestamp: timestamp })
                })
            );
        }
    };

    return func;
});
