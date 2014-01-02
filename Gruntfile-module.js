// A module defines a function which takes in the grunt object 
// and module name and returns a configuration object.
module.exports = function(grunt, moduleName) {
  var config = {},
      pkg = grunt.config.get('pkg'),
      static_module = ['.', moduleName, 'static'].join('/');

  if (grunt.file.isDir(static_module)) {
    config.htmlmin = {
      // https://github.com/gruntjs/grunt-contrib-htmlmin
      options: {
        removeComments: true,
        removeCommentsFromCDATA: true,
        removeCDATASectionsFromCDATA: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true,
        removeEmptyElements: false // experimental
      },
      expand: true,
      cwd: static_module,
      src: ['**/*.html'],
      dest: '<%= path.static_root %>'
    };

    config.compass = {
      // https://github.com/gruntjs/grunt-contrib-compass
      options: {
        config: [static_module, moduleName, 'config.rb'].join('/'),
        basePath: [static_module, moduleName].join('/')
      }
    };

    config.requirejs = {
      // https://github.com/gruntjs/grunt-contrib-requirejs
      options: {
        name: moduleName + '.r',
        context: null,
        optimize: 'uglify2',
        baseUrl: [static_module, moduleName, 'js'].join('/'),
        paths: pkg.jam ? pkg.jam.dependencies : {},
        findNestedDependencies: true,
        mainConfigFile: [static_module, moduleName, 'js', moduleName + '.r.js' ].join('/'),
        out: ['<%= path.static_root %>', moduleName, 'js', moduleName + '.r.js'].join('/')
      }
    };

    config.requirejs$css = {
      options: {
        optimizeCss: 'standard',
        cssIn: [static_module, moduleName, 'css', moduleName + '.css'].join('/'),
        out: ['<%= path.static_root %>', moduleName, 'css', moduleName + '.css'].join('/')
      }
    };

    config.requirejs$ie_css = {
      options: {
        optimizeCss: 'standard',
        cssIn: [static_module, moduleName, 'css', 'ie.css'].join('/'),
        out: ['<%= path.static_root %>', moduleName, 'css', 'ie.css'].join('/')
      }
    };

    config.requirejs$print_css = {
      options: {
        optimizeCss: 'standard',
        cssIn: [static_module, moduleName, 'css', 'print.css'].join('/'),
        out: ['<%= path.static_root %>', moduleName, 'css', 'print.css'].join('/')
      }
    };

    config.requirejs$screen_css = {
      options: {
        optimizeCss: 'standard',
        cssIn: [static_module, moduleName, 'css', 'screen.css'].join('/'),
        out: ['<%= path.static_root %>', moduleName, 'css', 'screen.css'].join('/')
      }
    };

    config.imagemin = {
      // https://github.com/gruntjs/grunt-contrib-imagemin
      options: {
        optimizationLevel: 7,
        progressive: true,
        interlaced: true,
        pngquant: false
      },
      files: [{
        expand: true,
        cwd: [static_module, moduleName, 'images'].join('/'),
        src: ['**/*.{png,jpg,gif}'],
        dest: ['<%= path.static_root %>', moduleName, 'images'].join('/')
      }]
    };

    for (var path in config.requirejs.options.paths)
        config.requirejs.options.paths[path] = "empty:"

    if (!grunt.file.isFile(config.requirejs.options.mainConfigFile))
        delete config.requirejs;

    if (!grunt.file.isFile(config.requirejs$css.options.cssIn))
        delete config.requirejs$css;

    if (!grunt.file.isFile(config.requirejs$ie_css.options.cssIn))
        delete config.requirejs$ie_css;

    if (!grunt.file.isFile(config.requirejs$print_css.options.cssIn))
        delete config.requirejs$print_css;

    if (!grunt.file.isFile(config.requirejs$screen_css.options.cssIn))
        delete config.requirejs$screen_css;
  }

  return config;
};
