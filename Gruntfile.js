module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({

        cssBuildFile: './static/style/build.css',

        replace: {
            html: {
                src: ['index.prebuild.html'],
                dest: 'index.html',
                replacements: [
                    {
                        from: '$STYLE',
                        to: '<%= grunt.file.read(cssBuildFile) %>'
                    },
                    {
                        from: '$JAVASCRIPT',
                        to: 'JAVASCRIPT GOES HERE'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-text-replace');

    grunt.registerTask('default', ['replace']);

};