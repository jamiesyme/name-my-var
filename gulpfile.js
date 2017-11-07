class Client {
	constructor(srcDir, distDir, settingsFile) {
		this.srcDir = srcDir;
		this.distDir = distDir;
		this.settingsFile = settingsFile;
		this.templateFiles = [];
		this.rawFiles = [];
	}

	addPage(baseName) {
		this.templateFiles = this.templateFiles.concat([
			this.srcDir + '/' + baseName + '.mst.html',
			this.srcDir + '/' + baseName + '.mst.css',
			this.srcDir + '/' + baseName + '.mst.js',
		]);
		this.rawFiles = this.rawFiles.concat([
			this.srcDir + '/' + baseName + '.html',
			this.srcDir + '/' + baseName + '.css',
			this.srcDir + '/' + baseName + '.js',
		]);
	}

	addComponent(baseName) {
		this.templateFiles = this.templateFiles.concat([
			this.srcDir + '/' + baseName + '.mst.css',
			this.srcDir + '/' + baseName + '.mst.js',
		]);
		this.rawFiles = this.rawFiles.concat([
			this.srcDir + '/' + baseName + '.html',
			this.srcDir + '/' + baseName + '.css',
			this.srcDir + '/' + baseName + '.js',
		]);
	}
};

var srcDir       = 'web-client';
var distDir      = 'web-client/dist';
var settingsFile = 'web-client/settings.json';
var client       = new Client(srcDir, distDir, settingsFile);
client.addPage('faq');
client.addPage('index');
client.addComponent('common');
client.addComponent('header');
client.addComponent('nav');
client.rawFiles.push('node_modules/milligram/dist/milligram.css');
client.rawFiles.push('node_modules/normalize.css/normalize.css');

var gulp = require('gulp');
var mustache = require('gulp-mustache');
var rename = require('gulp-rename');

gulp.task('watch', function() {
	gulp.watch(client.srcDir + '/' + '*', 'build-client');
});

gulp.task('build-client', function() {
	gulp.src(client.templateFiles)
		.pipe(mustache(client.settingsFile))
		.pipe(rename(function(path) {
			path.basename = path.basename.replace('.mst', '');
		}))
		.pipe(gulp.dest(client.distDir));
	gulp.src(client.rawFiles)
		.pipe(gulp.dest(client.distDir));
});

gulp.task('default', ['build-client']);
