var gulp = require('gulp');
	crypto = require('crypto');
	jshint = require('gulp-jshint'),
	concat = require('gulp-concat'),
    del = require('del'),
    chmod = require('gulp-chmod'),
    replace = require('gulp-replace'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect'),
    bower = require('gulp-bower'),
    colors = require('colors'),
    uglify = require('gulp-uglify');
	//ver = require('gulp-ver'),
	//rimraf = require('gulp-rimraf'),
	//changed = require('gulp-changed'),
    //symlink = require('gulp-symlink'),
	//gulpFilter = require('gulp-filter'),
    //browserSync = require('browser-sync').create(),
    //livereload = require('gulp-livereload'),

var map = require('map-stream');

var lang = 'en_us';
var hash = getHash();

var flagJs = false, flagCss = false, flagHtml = false;


var options = {
    root: './app',
    index: 'index.html',
    js: {
        src: [
            '!app/vendor/**/*.js',
            '!app/assets/js/all.*.js',
            'app/web/index.js',
            'config/*.js',
            'app/web/**/*.js'
        ]
    },
    css: {
        compile: 'app/_sass/style.scss',
        include: ['app/_sass/'],
        watch: ['app/_sass/*.scss', 'app/_sass/**/*.scss']
    },
    vendor: this.root + '/vendor',
    hooks: 'hooks/*',
    html: {}
};

options.js.dest = options.root + '/assets/js';
options.js.clean = options.root + '/assets/css/all.*.js';
options.js.name = 'all.' + hash + '.js';
options.css.dest = options.root + '/assets/css';
options.css.clean = options.root + '/assets/css/all.*.css';
options.css.name = 'all.' + hash + '.css';
options.vendor = options.root + '/vendor';
options.html.index = options.root + '/index.html';
options.html.watch = [options.html.index, 'app/web/modules/**/*.html'];


function errorReporter () {
    return map(function (file, cb) {
        if (!file.jshint.success) {
            //process.exit(1);
            return false;
        }
        cb(null, file);
    });
};

function getHash() {
    var random = (new Date()).toISOString().slice(0, 10).replace(/-/g, "") + (new Date()).toISOString().slice(11, 16).replace(/:/g, "") + Math.random().toString().substr(0,8);
    var hasher = crypto.createHash('sha1');
    hasher.update(random);
    return hasher.digest('hex').substr(0, 7);
}

gulp.task('bower', function() {
    return bower(options.vendor).pipe(gulp.dest(options.vendor));
});
gulp.task('githooks', function () {
    return gulp.src(options.hooks).pipe(chmod(755)).pipe(gulp.dest('.git/hooks/')); 
});
gulp.task('jshint', function() {
  	return gulp.src(options.js.src)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(map(function (file, cb) {
                if (!file.jshint.success) {
                    console.log('Please fix those errors before commit!!!'.inverse.red);
                    process.exit(1);
                }
                cb(null, file);
            })
        );
});


gulp.task('css', function () {
    flagCss = true;

    var stream = gulp.src(options.css.compile)
    .pipe(sass({includePaths: options.css.include}).on('error', sass.logError))
    .pipe(rename(options.css.name));
    del(options.css.clean);
    return stream.pipe(gulp.dest(options.css.dest));
});

gulp.task('js', function () {
    flagJs = true;
  	var stream = gulp.src(options.js.src)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(errorReporter())
        .pipe(concat(options.js.name));
    del(options.js.clean);
  	stream.pipe(gulp.dest(options.js.dest));
});

gulp.task('html', function () {
    flagHtml = true;
});


gulp.task('gen', function(){
    var stream = gulp.src(options.html.index);
    if (flagJs) {
        stream = stream.pipe(replace(/all\.[a-z0-9]{7}\.js/g, 'all' + '.' + hash + '.js'));
        flagJs = false;
    }
    if (flagCss) {
        stream = stream.pipe(replace(/all\.[a-z0-9]{7}\.css/g, 'all' + '.' + hash + '.css'));
        flagJs = false;
    }
    if (flagHtml) {
        stream = stream.pipe(replace(/window\.BUILD_HTML_HASH\s\=\s\'[a-z0-9]{7}'/g, "window.BUILD_HTML_HASH = '" + hash + "'"));
        flagHtml = false;
    }
    stream.pipe(gulp.dest(options.root)).pipe(connect.reload());
});


// Not used for now
gulp.task('minify', function () {
   gulp.src('app.js')
      .pipe(uglify())
      .pipe(gulp.dest(options.js.dest))
});


gulp.task('default', ['js', 'css', 'html', 'gen']);
gulp.task('watch', function () {
    //livereload.listen();
    gulp.watch(options.js.src, ['js','gen']);
    gulp.watch(options.css.watch, ['css','gen']);
    gulp.watch(options.html.watch, ['html','gen']);
    gulp.watch('gulpfile.js', ['default']);
});


gulp.task('connect', function() {
    connect.server({
        port: 80,
        root: options.root,
        livereload: true
    });
});
gulp.task('live', ['connect', 'watch']);
