'use strict';

module.exports = (grunt) ->
	require("time-grunt") grunt
	require("load-grunt-tasks") grunt
	grunt.initConfig
		pkg: grunt.file.readJSON("package.json")

		files:
			js: ["**/*.js"]

		jshint:
			options:
				jshintrc: ".jshintrc"
				ignores: ["node_modules/**"]

			uses_defaults: "<%= files.js %>"

		jscs:
			uses_defaults: "<%= files.js %>"

		nodeunit:
			all: ["tests/test-*.js"]

	grunt.registerTask "default", ["jshint", "jscs", "nodeunit"]