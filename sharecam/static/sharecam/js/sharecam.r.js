(function () {
    require(['jquery', 'handlebars'], function () {
        var path = $('#sharecam\\.hbs\\.html').text();

        $.get(path, function (data) {
            var template = Handlebars.compile($.trim(data));
            $('body').append(template());
        });
    });
})();
