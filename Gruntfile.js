module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({

        cssBuildFile: 'static/style/build.css',
        sassBootstrapFile: 'static/style/main.scss',
        jsBuildFile: 'static/js/main.js',

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
                        from: '-STYLE',
                        to: '<%= grunt.file.read(cssBuildFile) %>'
                    },
                    {
                        from: '-JAVASCRIPT',
                        to: '<%= grunt.file.read(jsBuildFile) %>'
                    }
                ]
            }
        },

        watch: {
            sass: {
                files: 'static/style/**/*.scss',
                tasks: ['sass:dev', 'replace']
            },
            html: {
                files: 'index.prebuild.html',
                tasks: ['replace']
            },
            js: {
                files: 'static/js/**/*.js',
                tasks: ['replace']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('dev', ['sass:dev', 'replace', 'watch']);
    grunt.registerTask('prod', ['sass:prod', 'replace'])

};