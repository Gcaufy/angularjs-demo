var extend = require('util')._extend;
var config = extend(
    require('./config/config').APPCONFIG,
    require('./config/config-local').APPCONFIG);

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
    spritesmith = require('gulp.spritesmith'),
    mergeStream = require('merge-stream'),
    gulpSequence = require("gulp-sequence"),
    plumber = require("gulp-plumber"),
    uglify = require('gulp-uglify');
	//ver = require('gulp-ver'),
	//rimraf = require('gulp-rimraf'),
	//changed = require('gulp-changed'),
    //symlink = require('gulp-symlink'),
	//gulpFilter = require('gulp-filter'),



var map = require('map-stream');

var lang = 'en_us';
var hash = '';

var currentDate = new Date();
var versionTag = '' + currentDate.getFullYear() + pad(currentDate.getMonth() + 1, 2) + pad(currentDate.getDate(), 2) + '-'
                + pad(currentDate.getHours(), 2) + pad(currentDate.getMinutes(), 2) + pad(currentDate.getSeconds(), 2);

var flagJs = false, flagCss = false, flagHtml = false, flagImg = false;


var options = {
    root: './app',
    index: 'index.html',
    js: {
        src: [
            '!app/vendor/**/*.js',
            '!app/assets/js/all.*.js',
            'app/web/index.js',
            'config/config.js',
            'config/config-local.js',
            'app/_source/common/**/*.js',
            'app/_source/i18n/**/*.js',
            'config/**/*.js',
            'app/web/**/*.js'
        ]
    },
    css: {
        compile: 'app/_source/sass/style.scss',
        include: ['app/_source/sass/'],
        watch: ['app/_source/sass/*.scss', 'app/_source/sass/**/*.scss', '!app/_source/sass/sprite.scss']
    },
    img: {
        spriteImageName: 'sprite.' + hash + '.png',
        spriteCssName: 'sprite.scss'
    },
    vendor: this.root + '/vendor',
    hooks: 'hooks/*',
    html: {}
};


options.js.dest = options.root + '/assets/js';
options.js.clean = options.root + '/assets/js/all.*.js';
options.js.name = 'all.' + hash + '.js';
options.css.dest = options.root + '/assets/css';
options.css.clean = options.root + '/assets/css/all.*.css';
options.css.name = 'all.' + hash + '.css';
options.vendor = options.root + '/vendor';
options.html.index = options.root + '/index.html';
options.html.watch = ['app/web/modules/**/*.html'];

options.img.src = options.root + '/_source/img/*.{png,jpg,ico}';
options.img.imgDest = options.root + '/assets/img/';
options.img.cssDest = options.root + '/_source/sass';
options.img.clean = options.root + '/assets/img/sprite.*.png';

function errorReporter () {
    return map(function (file, cb) {
        if (!file.jshint.success) {
            //process.exit(1);
            return false;
        }
        cb(null, file);
    });
};
function pad(num, n) {
    return (Array(n).join(0) + num).slice(-n); 
}
function getHash() {
    var random = (new Date()).toISOString().slice(0, 10).replace(/-/g, "") + (new Date()).toISOString().slice(11, 16).replace(/:/g, "") + Math.random().toString().substr(0,8);
    var hasher = crypto.createHash('sha1');
    hasher.update(random);
    return hasher.digest('hex').substr(0, 7);
}

function updateHash() {
    hash = getHash();
    options.js.name = 'all.' + hash + '.js';
    options.css.name = 'all.' + hash + '.css';
    options.img.spriteImageName = 'sprite.' + hash + '.png';
    return hash;
}

updateHash();

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


gulp.task('css', ['img_build'], function () {
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
        .pipe(plumber())
        .pipe(concat(options.js.name));
    del(options.js.clean);
  	return stream.pipe(gulp.dest(options.js.dest));
});

gulp.task('img_build', function(cb) {
    if (flagImg === true) {
        flagImg = false;
        var spriteData =
            gulp.src(options.img.src) // source path of the sprite images
                .pipe(spritesmith({
                    imgName: options.img.spriteImageName,
                    cssName: options.img.spriteCssName,
                    cssTemplate: '.scss.template.handlebars'
            }));
        del(options.img.clean);
        spriteData.img.pipe(gulp.dest(options.img.imgDest)); // output path for the sprite
        spriteData.css.pipe(gulp.dest(options.img.cssDest)); // output path for the CSS
        return mergeStream(spriteData.img, spriteData.css);
    }
    cb();
});

gulp.task('html', function () {
    flagHtml = true;
});
gulp.task('img', function () {
    flagImg = true;
    gulp.run('img_build');
});


gulp.task('gen', function(){
    var stream = gulp.src(options.html.index);

    if (flagJs) {
        stream = stream.pipe(replace(/all\..*\.js/g, 'all' + '.' + hash + '.js'));
        flagJs = false;
    }
    if (flagCss) {
        stream = stream.pipe(replace(/all\..*\.css/g, 'all' + '.' + hash + '.css'));
        flagCss = false;
    }
    if (flagHtml) {
        stream = stream.pipe(replace(/\r?\n\s*<script.*version=\".*/, ''));
        if (config.SHOW_VERSION) {
            stream = stream.pipe(replace(/\<!--\sSHOW\sVERSION\s-->/, '<!-- SHOW VERSION -->\n        <script src="assets/js/versionmark.js" version="' + versionTag + '"></script>'));
        }
        stream = stream.pipe(replace(/window\.BUILD_HTML_HASH\s\=\s\'.*'/g, "window.BUILD_HTML_HASH = '" + hash + "'"));
        flagHtml = false;
    }
    return stream.pipe(gulp.dest(options.root)).pipe(connect.reload());
});

// Not used for now
gulp.task('minify', function () {
   gulp.src('app.js')
      .pipe(uglify())
      .pipe(gulp.dest(options.js.dest))
});


gulp.task('default',function(cb) {
    gulpSequence('img','css','js','html','gen')(cb)
});

var fileChange = function (e) {
    updateHash();
    console.log(e.path + ' was ' + e.type + ', running task...');
}
gulp.task('onlyChangeJS',function(cb) {
    gulpSequence('js', 'gen')(cb)
});

gulp.task('onlyChangeCSS',function(cb) {
    gulpSequence('css', 'gen')(cb)
});
gulp.task('onlyChangeHTML',function(cb) {
    gulpSequence('html', 'gen')(cb)
});
gulp.task('onlyChangeIMG',function(cb) {
    gulpSequence('img','css', 'gen')(cb)
});


gulp.task('watch', function (cb) {
    gulp.watch(options.js.src, ['onlyChangeJS']).on('change', fileChange);
    gulp.watch(options.css.watch, ['onlyChangeCSS']).on('change', fileChange);
    gulp.watch(options.html.watch, ['onlyChangeHTML']).on('change', fileChange);
    gulp.watch(options.img.src, ['onlyChangeIMG']).on('change', fileChange);
    gulp.watch('gulpfile.js', ['onlyChangeJS']).on('change', fileChange);
    cb();
});


gulp.task('connect', function(cb) {
    connect.server({
        port: 80,
        root: options.root,
        livereload: true
    });
    cb();
});
gulp.task('live', ['connect', 'watch']);
