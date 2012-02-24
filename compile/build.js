/**
 * Node.JS and Java should be installed to run.
*/

var util = require('util'),
exec = require('child_process').exec,
path = require('path'),
rootDir = path.join(__dirname, '..'),
command = 'java -jar compiler.jar %s --js_output_file %s --charset UTF-8', //--compilation_level ADVANCED_OPTIMIZATIONS
outputFile = rootDir + 'kt.min.js',
outputAllFile = path.join(rootDir, 'kt-all.min.js'),
child, execCommand, jsFilesArgs = '';

var jsFiles = ['lib/jquery-1.7.1.js','lib/underscore.js', 'src/kt.js'];

jsFiles.forEach(function(i) {
	jsFilesArgs += ' --js ' + path.join( rootDir, i);
});

execCommand = util.format( command, jsFilesArgs, outputAllFile );

//console.log(execCommand);

child = exec(execCommand, function(error, stdout, stderr) {

	util.print(stdout);
	if (error !== null) {
		console.log('exec error:' + error);
	}

});