/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json')
    // Task configuration.
  });

  // These plugins provide necessary tasks.
  // grunt.loadNpmTasks('');

  // Default task.
  grunt.registerTask('default', []);
  grunt.registerTask('production', []);

};
