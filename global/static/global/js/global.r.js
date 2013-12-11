(function () {
    require(['jquery', 'handlebars'], function () {
        var path = $('#global\\.hbs\\.html').text();

        $.get(path, function (data) {
            var template = Handlebars.compile($.trim(data));
            $('body').append(template());
        });
    });
})();
