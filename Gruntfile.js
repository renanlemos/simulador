/** ADMIN **/
module.exports = function(grunt) {
    
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'), 
      uglify: {
        options:{
          report: 'min',
          mangle: false
        },
        my_target: {
          files: {
            'public/builds/js/app.js': [
              "public/assets/js/01-bibliotecas/01-jquery/01.jquery.min.js"
            ]
          }
        }
      },
      cssmin: {
        options: {
          shorthandCompacting: false,
          roundingPrecision: -1
        },
        target: {
          files: {
            'public/builds/css/app.css': 
              [
                'public/assets/css/bibliotecas/jquery/*.css', 

              ]
          }
        }
      }
    });
    
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['uglify','cssmin']); // Default grunt tasks maps to grunt

};
