module.exports = function(grunt) {

  grunt.initConfig({
    bower: {
      dist: {
        dest: 'assets/vendor',
        options: {
          checkExistence: true,
          debugging: true,
          env: 'production'
        }
      }
    },
    copy: {
      main: {
        expand: true,
        cwd: 'bower_components/font-awesome/fonts',
        src: '**',
        dest: 'assets/fonts',
        flatten: true,
        filter: 'isFile',
      },
    },
    clean: {
      vendor: ['assets/vendor'],
      release: ["path/to/another/dir/one", "path/to/another/dir/two"]
    }
  });

  grunt.loadNpmTasks('main-bower-files');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['clean:vendor', 'bower', 'copy']);
};
