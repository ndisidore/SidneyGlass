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
    sass: {
      dist: {
        files: {
          'assets/css/main.css': 'assets/css/main.scss'
        }
      }
    },
    curl: {
      'assets/fonts/raleway-regular.woff': 'https://github.com/yougov/raleway-webfont/raw/master/font/raleway-regular.woff'
    },
    clean: {
      vendor: ['assets/vendor'],
      fonts: ['assets/fonts']
    }
  });

  grunt.loadNpmTasks('main-bower-files');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-curl');

  grunt.registerTask('default', ['clean', 'bower', 'sass', 'curl', 'copy']);
};
