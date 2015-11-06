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
          locale: "en_GB",
          strategy: "desktop",
          threshold: 80
        }
      },
      mobile: {
        options: {
          locale: "en_GB",
          strategy: "mobile",
          threshold: 80
        }
      }
  },
      responsive_images: {
      dev: {
        options: {
          engine: 'im',
          sizes: [{
            width: 1200,
            suffix: '_large',
          
          },{
            width: 640,
            suffix: '_small',
          }]
        },

        /*
        You don't need to change this part if you don't change
        the directory structure.
        */
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png,webp}'],
          cwd: 'jeff/static/images/',
          dest: 'jeff/static/images/images_build/'
        }]
      }
    },

    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ['jeff/static/images/images_build'],
      },
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['jeff/static/images/images_build']
        },
      },
    },
    imagemin: {
      dev: {
        options: {
          progressive: true
        },
        files: [{
          expand: true,
          src: ['*.{jpg,webp,png,svg}'],
          cwd: 'jeff/static/images/images_build',
          dest: 'jeff/static/images/images_build'
        }]
      }
    }


  });

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these

  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-imagemin')
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-pagespeed');

  grunt.registerTask('default', ['jshint', 'uglify', 'cssmin']);
  grunt.registerTask('img', ['clean','mkdir','responsive_images']);
  grunt.registerTask('min', ['imagemin']);
};