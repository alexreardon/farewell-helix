module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({

        cssBuildFile: 'static/style/build.css',
        sassBootstrapFile: 'static/style/main.scss',

        sass: {
            dev: {
                options: {
                    style: 'nested',
                    sourcemap: true

                },
                files: {
                    'static/style/build.css': 'static/style/main.scss'
                }
            },
            prod: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'static/style/build.css': 'static/style/main.scss'
                }
            }
        },

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
                        to: 'console.log("success");'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-text-replace');

    grunt.registerTask('default', ['sass:dev', 'replace']);
    grunt.registerTask('prod', ['sass:prod', 'replace'])

};