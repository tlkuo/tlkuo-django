/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    path: {
      static_root: './static',
      static_about: './about/static'
    },
    // Task configuration.
    htmlmin: {
      // https://github.com/gruntjs/grunt-contrib-htmlmin
      dist: {
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
        cwd: '<%= path.static_root %>',
        src: ['**/*.html'],
        dest: '<%= path.static_root %>'
      }
    },
    requirejs: {
      // https://github.com/gruntjs/grunt-contrib-requirejs
      compile: {
        options: {
          name: 'about.r',
          context: null,
          optimize: 'uglify2',
          baseUrl: '<%= path.static_about %>' + '/about/js',
          mainConfigFile: '<%= path.static_about %>' + '/about/js/about.r.js',
          out: '<%= path.static_root %>' + '/about/js/about.r.js'
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // Default task.
  grunt.registerTask('default', []);
  grunt.registerTask('production', ['htmlmin', 'requirejs']);

};
