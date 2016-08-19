var gulp = require('gulp');
var exec = require('child_process').exec;
var Server = require('karma').Server;
//var mkdirs = require('mkdirs');
var runSequence = require('run-sequence');
var nodemon = require('gulp-nodemon');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var git = require('gulp-git');
var path = require('path');
var watch = require('gulp-watch');

var dbPath = "./data"
var commitComment;

var runCommand = function(command) {
  exec(command, function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    if (err !== null) {
      console.log('exec error: ' + err);
    }
  });
};

gulp.task("mongo-start", function() {
  //var command = "mongod --fork --dbpath "+paths.dbDir+"/ --logpath "+paths.dbLogs+"/mongo.log";
  var command = "mongod --dbpath " + dbPath
  //mkdirs(dbPath);
  //mkdirs(paths.dbLogs);
  runCommand(command);
});

gulp.task("mongo-stop", function() {
  var command = 'mongo admin --eval "db.shutdownServer();"'
  runCommand(command);
});

gulp.task('watch-src', function(){
	//gulp.watch(['./**', '!public/dist/*.js'], ['clean', 'copyLibs', 'copyFiles', 'compress']);	
	watch(['src', '!public/dist/*.js'], function() {
		gulp.start('build');
	});	
});

// gulp.task('watch', function () {
   // gulp.watch('src/*.tmpl.html', ['build']);
// });

gulp.task('play', function () {	
    nodemon({
		script: 'server.js',
		ext: 'js',
		env: {
		  'NODE_ENV': 'development'
		}
	})
	.on('start', ['watch-src'])
    .on('restart', function () {
      console.log('restarted!');
    });
});

gulp.task('clean', function () {
	return gulp.src('dist', {read: false}).pipe(clean());
});

gulp.task('copyLibs', function (done) {
  var libsToCopy = [
        "node_modules/bootbox/bootbox.js",
        "node_modules/ng-csv/build/ng-csv.js",
        "node_modules/underscore/underscore.js"
    ];
  return gulp.src(libsToCopy).pipe(gulp.dest('./dist/lib'));
});

gulp.task('copyFiles', function (done) {
  var filesToCopy = [
    'src/**/*.*',
    'src/index.html',
    '!/**/*.js'
  ];
  return gulp.src(filesToCopy, { base: 'src' }).pipe(gulp.dest('./dist'));
});

gulp.task('compress', function() {
  return gulp.src([
	  'src/js/main.js',
	  'src/**/*.js*'
	])
    .pipe(concat('main.min.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('./dist/js/'))
});

gulp.task('karma', function() {
    Server.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, function(karmaExitStatus) {
           if (karmaExitStatus) {
               process.exit(1);
           }
    });
});

gulp.task('set-dev-node-env', function() {
    return process.env.NODE_ENV = 'development';
});

gulp.task('set-prod-node-env', function() {
    return process.env.NODE_ENV = 'production';
});

gulp.task('gitadd', function(){
  return gulp.src('.').pipe(git.add());
});

gulp.task('gitcommit', function(){
  return gulp.src('.').pipe(git.commit(commitComment));
});

gulp.task('gitpush', function(){
  git.push('origin', 'master', function (err) {
    if (err) throw err;
  });
});

gulp.task('build', function(done) {
	return runSequence('clean', 'copyLibs', 'copyFiles', 'compress', function(){
		console.log('done building');
        done();
	});
});

gulp.task('prod', function(done) {	
    console.log('starting prod ....')
    runSequence('set-prod-node-env', 'build');
});

gulp.task('push', function(done) {
	
	//gulp push --"test 123"
	commitComment = process.argv.slice(-1)[0] 
	commitComment = commitComment.split("--").join("");
	
	if (!commitComment) {
		var currentDate = new Date();
		commitComment = "CheckIn " + currentDate;
	}
	
    console.log('starting push .... ' + commitComment)
    runSequence('set-prod-node-env', 'build', 'gitadd', 'gitcommit', 'gitpush');
});

gulp.task('test', function(done) {
    console.log('testing....')
    runSequence('set-dev-node-env', 'build', 'karma');
});

gulp.task('dev', function(done) {
    console.log('starting dev ....')
    runSequence('set-dev-node-env', 'build', 'mongo-start', 'play');
});

gulp.task('default', ['dev']);
