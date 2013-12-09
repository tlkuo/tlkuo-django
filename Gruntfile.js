/*global module:false*/
var gruntModules = require('grunt-modules');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    path: {
      static_root: './static',
      static_jam: './jam/static'
    },
    // Task configuration.
    jam: {
      // https://github.com/shama/grunt-jam
      dist: {
        dest: '<%= path.static_root %>' + '/jam/require.js',
        options: {
          packageDir: '<%= path.static_jam %>' + '/jam',
          verbose: true,
          nominify: false,
          wrap: false
        }
      }
    }
  });

  gruntModules(grunt, {
    about: require('./Gruntfile-module.js')
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-jam');

  // Default task.
  grunt.registerTask('default', []);
  grunt.registerTask('production', ['htmlmin', 'requirejs', 'jam']);

};
