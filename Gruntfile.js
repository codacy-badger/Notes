module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Merge Files To "dist" folder
    concat: {
      css: {
        src: ['src/css/**/*.css'],
        dest: 'dist/css/Styles.css',
      },
      js: {
        src: ['src/js/**/*.js'],
        dest: 'dist/js/Scripts.js',
      },
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 version', '> 2%']
      },
      single_file: {
        src: 'dist/css/Styles.css',
        dest: 'dist/css/Main.css'
      },
    },

    // Convert PUG Files to HTML
    pug: {
      compile: {
        options: {
          data: {
            debug: false
          }
        },
        files: {
          'dist/index.html': ['src/index.pug']
        }
      }
    },

    // Watch File Changes and Call Concat Task
    watch: {
      configFiles: {
        files: [ 'gruntfile.js' ],
        options: {
          reload: true
        }
      },
      convert: {
        files: ['src/css/**/*.css','src/js/**/*.js','src/**/*.pug'],
        tasks: ['concat:css','concat:js','pug','autoprefixer']
      }
    },

    // Reload Browser On "dist" Folder Changes
    browserSync: {
      bsFiles: {
        src: ['dist/css/*.css', 'dist/js/*.js', 'dist/*.html']
      },
      options: {
        server: {
          watchTask: true,
          baseDir: './dist/'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-autoprefixer');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('deploy',['concat:css','concat:js','pug','autoprefixer']);
};
