var c = function(f) {
	return 'web-client/' + f;
}

var client = {
	html: [
		c('index.mustache'),
	],
	css: [
		c('*.css'),
		'node_modules/milligram/dist/milligram.css',
		'node_modules/normalize.css/normalize.css',
	],
	js: [
		c('*.js'),
	],
	settings: c('settings.json'),
	dist:     c('dist')
};

var gulp = require('gulp');
var mustache = require('gulp-mustache');
var rename = require('gulp-rename');

gulp.task('default', ['watch']);
gulp.task('watch', function() {
	gulp.watch([
		c('*.mustache'),
		c('*.css'),
		c('*.js'),
	], ['build-client']);
});
gulp.task('build-client', function() {
	gulp.src(client.html)
		.pipe(mustache(client.settings))
		.pipe(rename(function(path) { path.extname = '.html'; }))
		.pipe(gulp.dest(client.dist));
	gulp.src(client.css)
		.pipe(gulp.dest(client.dist));
	gulp.src(client.js)
		.pipe(gulp.dest(client.dist));
});
