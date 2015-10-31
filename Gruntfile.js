// Gruntfile.js
module.exports = function(grunt) {
  grunt.initConfig({
    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

    // configure jshint to validate js files -----------------------------------
    jshint: {
      options: {
        reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
      },
      // when this task is run, lint the Gruntfile and all js files in src
      build: ['Grunfile.js', 'static/**/*.js']
    },
    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          //concats and minify's
          'jeff/static/dist/js/main.min.js': ['jeff/static/js/main.js']
        }
      }
    },
    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'jeff/static/dist/css/styles.min.css': ['jeff/static/css/styles.css']
        }
      }
    },
    watch: {
      files: ['jeff/static/css/*.css', 'jeff/static/js/*.js'],
      tasks: ['default']
    },
    pagespeed: {
      options: {
        nokey: true,
        url: "https://developers.google.com/speed/docs/insights/v1/getting_started"
      },
      desktop: {
        options: {
          // url: "https://developers.google.com/speed/docs/insights/v1/getting_started",
          locale: "en_GB",
          strategy: "desktop",
          threshold: 80
        }
      },
      mobile: {
        options: {
          // paths: "https://developers.google.com/speed/docs/insights/v1/getting_started",
          locale: "en_GB",
          strategy: "mobile",
          threshold: 80
        }
      }
}


  });

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-pagespeed');

  grunt.registerTask('default', ['jshint', 'uglify', 'cssmin']);
};