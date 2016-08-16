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

gulp.task('play', function () {	
    nodemon({
		script: 'server.js',
		ext: 'js',
		env: {
		  'NODE_ENV': 'development'
		}
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

// gulp.task('karma', function(done) {
    // Server.start({
        // configFile: __dirname + '/karma.conf.js',
        // singleRun: true
    // }, function() {
        // done();
    // });
// });

// gulp.task('karma', function (done) {
  // new Server({
    // configFile: __dirname + '/karma.conf.js',
    // singleRun: true
  // }, done).start();
// });

gulp.task('set-dev-node-env', function() {
    return process.env.NODE_ENV = 'development';
});

gulp.task('set-prod-node-env', function() {
    return process.env.NODE_ENV = 'production';
});

gulp.task('add', function(){
  return gulp.src('.').pipe(git.add());
});

gulp.task('commit', function(){
  return gulp.src('.').pipe(git.commit(commitComment));
});

gulp.task('gitpush', function(){
  git.push('origin', 'master', function (err) {
    if (err) throw err;
  });
});

// gulp.task('build', function(done) {
    // runSequence('clean', 'copyFiles', 'compress');
// });

gulp.task('prod', function(done) {	
    console.log('starting prod ....')
    runSequence('set-prod-node-env', 'clean', 'copyLibs', 'copyFiles', 'compress');
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
    runSequence('set-prod-node-env', 'clean', 'copyLibs', 'copyFiles', 'compress', 'add', 'commit', 'gitpush');
});

gulp.task('test', function(done) {
    console.log('testing....')
    runSequence('set-dev-node-env', 'clean', 'copyLibs', 'copyFiles', 'compress', 'karma');
});

gulp.task('dev', function(done) {
    console.log('starting dev ....')
    runSequence('set-dev-node-env', 'clean', 'copyLibs', 'copyFiles', 'compress', 'mongo-start', 'play');
});

gulp.task('default', ['dev']);
