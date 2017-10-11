var c = function(f) {
	return 'web-client/' + f;
}

var client = {
	html:     [c('index.mustache')],
	css:      [c('*.css')],
	js:       [c('*.js')],
	settings: c('settings.json'),
	dist:     c('dist')
};

var gulp = require('gulp');
var mustache = require('gulp-mustache');

gulp.task('default', ['build-client']);
gulp.task('build-client', function() {
	gulp.src(client.html)
		.pipe(mustache(client.settings))
		.pipe(gulp.dest(client.dist));
	gulp.src(client.css)
		.pipe(gulp.dest(client.dist));
	gulp.src(client.js)
		.pipe(gulp.dest(client.dist));
});
