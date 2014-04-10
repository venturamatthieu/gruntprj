module.exports = function(grunt) {
    
    //Init    
    grunt.loadNpmTasks('grunt-contrib-watch'); //Active des scripts si fichier change save/delete/etc
    
    //grunt.loadNpmTasks('grunt-contrib-jshint'); //Verifie la syntaxe de ton code js
    
    //grunt.loadNpmTasks('grunt-contrib-yuidoc'); //Generer une doc pour le javascript
    
    grunt.loadNpmTasks('grunt-contrib-uglify'); //Compress le code js
    
    grunt.loadNpmTasks('grunt-contrib-compass'); //Lib css3
    
    grunt.loadNpmTasks('grunt-contrib-concat'); //Combine des fichiers css ou js entre eux
    
    grunt.loadNpmTasks('grunt-contrib-imagemin'); // Optimise le poid des images PNG/JPG
    
    //grunt.loadNpmTasks('grunt-contrib-qunit'); //Test unitaire en javascript 
    
    // Configuration.
    grunt.initConfig({
  
        pkg: grunt.file.readJSON('package.json'),
        dirs: {
            src: 'src/files',
            dest: 'dist/<%= pkg.name %>/<%= pkg.version %>'
  	},
        watch: {
            css: {
                files: ['css/sass/*.scss'],
                tasks: ['compass:dev'],
                options: {
                    livereload: true
                }
            }, 
            js: {
                files: ['**/*.js'],
                tasks: ['jshint'],
                options: {
                  spawn: false
                }
            }
        },
        uglify: {
            test: {
                // uglify task "test" target options and files go here.
            },
            options: {
        	banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
        	src: 'src/<%= pkg.name %>.js',
        	dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        concat: {
            basic: {
      		src: ['<%= dirs.src %>/main.js'],
      		dest: '<%= dirs.dest %>/basic.js'
            },
            test: {
                src: ['<%= dirs.src %>/main.js', '<%= dirs.src %>/extras.js'],
                dest: '<%= dirs.dest %>/with_extras.js'
            }
        },
        compass: {                  // Task
            prod: {                   // Target
                options: {              // Target options
                    httpPath : '/',
                    cssDir: 'css',
                    sassDir: 'css/sass',
                    relativeAssets : true,
                    environment: 'production', 
                    outputStyle : 'compressed', 
                    force: true
                }
            },
            dev: {                    // Another target
                options: {
                    httpPath : '/',
                    cssDir: 'css', 
                    sassDir: 'css/sass',
                    relativeAssets : true,
                    environment : 'development',
                    outputStyle : 'expanded', 
                    force: true
                }
            }
	},
	imagemin: {                          // Task
            dist: {                            // Target
                options: {                       // Target options
                    optimizationLevel: 3
                },
                files: {                         // Dictionary of files
                    'dist/img.png': 'src/img.png', // 'destination': 'source'
                    'dist/img.jpg': 'src/img.jpg'
                }
            },
            dev: {                             // Another target
                options: {                       // Target options
                    optimizationLevel: 0
                },
                files: {
                    'dev/img.png': 'src/img.png',
                    'dev/img.jpg': 'src/img.jpg'
                }
            }
	}
    });

    // Default task(s).
    grunt.registerTask('basic', ['uglify', 'jshint' , 'qunit']);
  
  
    // Test task(s)
    grunt.registerTask('test', 'A sample task that logs stuff.',function (arg1, arg2){
  	
  	grunt.log.writeln('Currently running the "test" task.');
  	
  	if (arguments.length === 0) {
            grunt.log.writeln(this.name + ", no args");
  	} else {
            grunt.log.writeln(this.name + ", " + arg1 + " " + arg2);
  	}
  	// Enqueue "basic" and "basic" tasks, to run after "foo" finishes, in-order.
  	grunt.task.requires('basic');
  	
  	if (failureOfSomeKind) {
            grunt.log.error('This is an error message.');
  	}
  	
  	// Fail by returning false if this task had errors
  	if (ifErrors) { return false; }
  	
  	grunt.task.run(['basic', 'basic']);
  	
  	
    });

};