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
    js: [
        'app/app.js',
        'config/config.js',
        'config/config-local.js',
        'app/**/*.js'
    ]
};

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
    return bower().pipe(gulp.dest('vendor/'));
});
gulp.task('githooks', function () {
    return gulp.src('hooks/*').pipe(chmod(755)).pipe(gulp.dest('.git/hooks/')); 
});
gulp.task('jshint', function() {
  	return gulp.src(options.js)
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
    
    var stream = gulp.src('app/assets/sass/style.scss')
    .pipe(sass(sass({ includePaths : ['app/assets/sass/'] })).on('error', sass.logError))
    .pipe(rename('all.' + hash + '.css'));
    del(['app/assets/css/all.*.css']);
    return stream.pipe(gulp.dest('app/assets/css/'));
});

gulp.task('js', function () {
    flagJs = true;
  	var stream = gulp.src(options.js)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(errorReporter())
        .pipe(concat('all' + '.' + hash + '.js'));
    del(['dist/all.*.js']);
  	stream.pipe(gulp.dest('dist'));
});

gulp.task('html', function () {
    flagHtml = true;
});


gulp.task('gen', function(){
    var stream = gulp.src(['index.html']);
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
    stream.pipe(gulp.dest('')).pipe(connect.reload());
});


// Not used for now
gulp.task('minify', function () {
   gulp.src('app.js')
      .pipe(uglify())
      .pipe(gulp.dest('dist'))
});


gulp.task('default', ['js', 'css', 'html', 'gen']);
gulp.task('watch', function () {
    //livereload.listen();
    gulp.watch(options.js, ['js','gen']);
    gulp.watch(['app/assets/sass/*.scss', 'app/assets/sass/**/*.scss'], ['css','gen']);
    gulp.watch(['index.html','app/modules/**/*.html'], ['html','gen']);
    gulp.watch('gulpfile.js', ['default']);
});


gulp.task('connect', function() {
    connect.server({
        port: 80,
        livereload: true
    });
});
gulp.task('live', ['connect', 'watch']);
