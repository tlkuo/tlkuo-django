(function () {
    require(['jquery', 'handlebars'], function () {
        var requirejs = require.config({
            baseUrl: '/static/sharecam/js/',
            paths: {
                'jquery.mobile': '//code.jquery.com/mobile/1.4.0/jquery.mobile-1.4.0.min'
            }
        });

        $(window).on('hashchange', function () {
            var hash = window.location.hash;
            switch (hash) {
                case '#client':
                    requirejs(['client.r'], function (Client) {
                        var client = new Client($('body'));
                    });
                    break;
                default:
                    requirejs(['index.r'], function (Index) {

                    });
                    break;
            }
        });

        $(window).trigger('hashchange');
    });
})();
