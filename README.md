# angularjs-demo

Demo application using angularjs and gulp.

### Install

Run `fe` in root directory

```bash
./fe
```

### Frontend building tool

fe is a shell script to manage the developing and auto building. No need to understand how does gulp/bower/npm works.
run `./fe --help` to get more information.

```bash
usage: ./fe [<command>] [<args>]

The most commonly used fe commands are:
   init       Generate the project with newest config
   package    Export project as an tar file
   watch      Doing gulp watch
   live       Start a web server and doing gulp watch to automatical refresh your browers
   update     Usable options 'npm/bower/template/hooks'
   server     Using http-server to start a web server
   jshint     Use jshint to check your code
   compile    Build project
```

### Directory specification
```bash
app/			                         	--- Main code directory
	_sass/									--- Sass files, directory started with '_' will be ignored when release a package.
		modules/							---	Sass modules
		utils/								--- Sass utilities files
		style.scss 							--- Sass main file
	_common/								--- Application common libs and utilities
	_i18n/									--- I18n directory
		en_us/
		zh_cn/
	assets/									--- Static resources
		css/
		font/
		images/
		js/
	vendor/									--- Third-party libs, managed by bower
	web/									--- Application code directory
		modules/							---	Application modules
			mod_a/							--- Module A
				00-config.js 				--- Config of module A, started with 00 so that make sure it always goes to the top, becuase all the controllers are depened on it
				index.html 					--- Module A index page
				index.js 					--- Module A index controller
			mod_b/ 							--- Same with module A
				00-config.js
				index.html
				index.js
		index.html 							--- Application layouts, like menu/sidebar/login etc. are goes this level
		index.js 							--- Application default controller
	index.hml 								--- Application index page
config/			                         	--- Application config, there will be a config-local.js generated.
	config.js 								--- Basic configuration of the application
	config-local.js 						--- Personal configuration fo the application, it will overwrite the config in config.js. If not found, please run ./fe to generate it
hooks/			                         	--- Will push to .git/hooks/ to handle the commit and pull
	pre-commit								--- Run jshint before you do a git commit. If jshint failed, then can not commit
	psot-merge								--- Automaticlly build after you pull the newest code
.bowerrc   		                         	--- Bower config
.gitignore                               	--- Git ignore file
.jshintrc  		                         	--- Jshint configuration
README.md 		                         	--- README
bower.json 		                         	--- Bower package
fe				                         	--- Frontend development and building tool, run './fe --help' to get more help
gulpfile.js 	                         	--- Gulp configuration file
index.template                           	--- Template for your index.html, gulp use this to generate index.html
package.json 	                         	--- Npm packages
```
