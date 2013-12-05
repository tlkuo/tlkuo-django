/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    path: {
      static_root: './static'
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
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  // Default task.
  grunt.registerTask('default', []);
  grunt.registerTask('production', ['htmlmin']);

};
