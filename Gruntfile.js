module.exports = function(grunt) {

	grunt.initConfig({

		date: grunt.template.today("mmm dd yyyy"),
		pkg: grunt.file.readJSON("package.json"),

		banner: "/**\n" +
			" * <%= pkg.name %> v<%= pkg.version %> build <%= date %>\n" +
			" * <%= pkg.homepage %>\n" +
			" * Copyright <%= date.slice(-4) %> <%= pkg.author.name %>, <%= pkg.license %>\n" + 
			" */\n",

		jshint: {
			options: {
				jshintrc: true
			},
			files: ["Gruntfile.js", "src/**/*.js", "test/**/*.js"]
		},

		rollup: {
			options: {
				format: "umd",
				moduleName: "OCTREE",
				banner: "<%= banner %>",
				globals: {
					three: "THREE"
				},
				external: ["three"],
				plugins: [
					require("rollup-plugin-node-resolve")({
						main: false,
						jsnext: true
					})
				]
			},
			dist: {
				src: "src/index.js",
				dest: "build/<%= pkg.name %>.js"
			}
		},

		uglify: {
			options: {
				banner: "<%= banner %>"
			},
			dist: {
				files: {
					"build/<%= pkg.name %>.min.js": ["build/<%= pkg.name %>.js"]
				}
			}
		},

		nodeunit: {
			options: {
				reporter: "default"
			},
			src: ["test/**/*.js"]
		},

		copy: {
			bundle: {
				expand: false,
				src: ["build/<%= pkg.name %>.js"],
				dest: "public/<%= pkg.name %>.js",
				filter: "isFile"
			}
		},

		yuidoc: {
			compile: {
				name: "<%= pkg.name %>",
				description: "<%= pkg.description %>",
				version: "<%= pkg.version %>",
				url: "<%= pkg.homepage %>",
				options: {
					paths: "src",
					outdir: "docs"
				}
			}
		}

	});

	grunt.loadNpmTasks("grunt-contrib-nodeunit");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-yuidoc");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-rollup");

	grunt.registerTask("default", ["build", "nodeunit"]);
	grunt.registerTask("build", ["jshint", "rollup", "copy"]);
	grunt.registerTask("test", ["jshint", "nodeunit"]);

};
